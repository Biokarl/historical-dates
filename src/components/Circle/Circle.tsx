import React, { useEffect, useRef, useState } from "react";
import styles from "./Circle.module.scss";
import gsap from "gsap";
import { initialDate } from "../../initialDate";

interface CircleProps {
  rotateForward: boolean;
  rotateBackward: boolean;
  currentIndex: number;
  onCircleClick: (index: number) => void;
  isAnimating: boolean;
  setIsAnimating: (animating: boolean) => void;
  circleRefs: React.RefObject<(SVGGElement | null)[]>;
}

export const Circle: React.FC<CircleProps> = ({
  rotateForward,
  rotateBackward,
  currentIndex,
  onCircleClick,
  isAnimating,
  setIsAnimating,
  circleRefs,
}) => {
  const circleRef = useRef<SVGSVGElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const totalPoints = initialDate.length;
  const anglePerIndex = 360 / totalPoints;
  const angleOffset = -anglePerIndex;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (rotateForward || rotateBackward) {
      setIsAnimating(true);
      const rotationDirection = rotateForward ? -1 : 1;
      gsap.to(circleRef.current, {
        rotation: `+=${rotationDirection * anglePerIndex}`,
        transformOrigin: "center center",
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => setIsAnimating(false),
      });
      circleRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.to(ref, {
            rotation: `-=${rotationDirection * anglePerIndex}`,
            transformOrigin: "center center",
            duration: 1,
            ease: "power1.inOut",
          });
        }
      });
    }
  }, [rotateForward, rotateBackward, anglePerIndex, setIsAnimating]);

  return (
    <div className={styles.root}>
      <div className={styles.circle}>
        {isMobile ? (
          <svg width="86" height="6" viewBox="0 0 86 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            {[3, 19, 35, 51, 67, 83].map((cx, index) => (
              <circle
                key={index}
                opacity={index === currentIndex ? "1" : "0.4"}
                cx={cx}
                cy="3"
                r="3"
                fill="#42567A"
                onClick={() => onCircleClick(index)}
              />
            ))}
          </svg>
        ) : (
          <svg
            ref={circleRef}
            className="circle-svg"
            width="536"
            height="530"
            viewBox="0 0 536 530"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
          >
            <circle opacity="0.2" cx="268" cy="265" r="264.5" stroke="#42567A" />
            {initialDate.map((item, index) => {
              const isActive = index === currentIndex;
              const isHovered = index === hoveredIndex;
              const angle = (index * anglePerIndex + angleOffset) * (Math.PI / 180);
              return (
                <g key={item.periodId} ref={(el) => {
                  if (el) circleRefs.current[index] = el;
                }}>
                  <circle
                    className={styles.minCircle}
                    cx={268 + 265 * Math.cos(angle)}
                    cy={265 + 265 * Math.sin(angle)}
                    r={isActive ? "28" : "3"}
                    fill={isActive ? "#fff" : "#42567A"}
                    stroke="#42567A"
                    strokeWidth="2px"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => onCircleClick(index)}
                  />
                  <text
                    x={268 + 265 * Math.cos(angle)}
                    y={265 + 265 * Math.sin(angle) + 7}
                    textAnchor="middle"
                    fill="#42567A"
                    fontSize="20"
                    cursor="pointer"
                    pointerEvents="none"
                  >
                    {isHovered || isActive ? item.periodId : ""}
                  </text>
                  {isActive && !isAnimating && (
                    <text
                      x={268 + 265 * Math.cos(angle) + 50}
                      y={265 + 265 * Math.sin(angle) + 7}
                      textAnchor="start"
                      fill="#42567A"
                      fontSize="16"
                      fontWeight="700"
                      cursor="pointer"
                      pointerEvents="none"
                    >
                      {item.periodName}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
};
