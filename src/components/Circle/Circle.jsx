import React, { useEffect, useRef, useState } from "react";
import styles from "./Circle.module.scss";
import gsap from "gsap";
import { initialDate } from '../../initialDate';

export const Circle = ({ rotateForward, rotateBackward, currentIndex, onCircleClick, isAnimating, setIsAnimating }) => {
  const circleRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const totalPoints = initialDate.length;
  const anglePerIndex = 360 / totalPoints;
  const angleOffset = -anglePerIndex;

  const minCircleRefs = useRef(initialDate.map(() => React.createRef()));

  useEffect(() => {
    if (rotateForward || rotateBackward) {
      setIsAnimating(true);
      
      const rotationDirection = rotateForward ? -1 : 1;
      const otherRotationDirection = rotateForward ? 1 : -1;

      gsap.to(circleRef.current, {
        rotation: `+=${rotationDirection * anglePerIndex}`,
        transformOrigin: "center center",
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => setIsAnimating(false),
      });

      minCircleRefs.current.forEach(ref => {
        gsap.to(ref.current, {
          rotation: `+=${otherRotationDirection * anglePerIndex}`,
          transformOrigin: "center center",
          duration: 1,
          ease: "power1.inOut",
        });
      });
    }
  }, [rotateForward, rotateBackward]);

  return (
    <div className={styles.root}>
      <div className={styles.circle}>
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
            const angle = (index * anglePerIndex + angleOffset) * (Math.PI / 180);

            return (
              <g key={index}>
                <circle
                  className={styles.minCircle}
                  cx={268 + 265 * Math.cos(angle)}
                  cy={265 + 265 * Math.sin(angle)}
                  r={isActive ? "28" : "3"} 
                  fill={isActive ? "#fff" : "#42567A"} 
                  stroke="#42567A"
                  strokeWidth='2px'
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => onCircleClick(index)} 
                />
                {isActive && (
                  <>
                    <text
                      x={268 + 265 * Math.cos(angle)}
                      y={265 + 265 * Math.sin(angle) + 7}
                      ref={minCircleRefs.current[index]}
                      textAnchor="middle"
                      fill="#42567A"
                      fontSize="20"
                      cursor='pointer'
                      pointerEvents="none"
                    >
                      {item.periodId} 
                    </text>
                    {!isAnimating && ( 
                      <text
                        x={268 + 265 * Math.cos(angle) + 50} 
                        y={265 + 265 * Math.sin(angle) + 7}
                        textAnchor="start"
                        fill="#42567A"
                        fontSize="16"
                        fontWeight='700'
                        cursor='pointer'
                        pointerEvents="none"
                      >
                        {item.periodName} 
                      </text>
                    )}
                  </>
                )}
              </g>
            );
          })}

          {hoveredIndex !== null && (
            <text
              x={268 + 265 * Math.cos((hoveredIndex * anglePerIndex + angleOffset) * (Math.PI / 180))}
              y={265 + 265 * Math.sin((hoveredIndex * anglePerIndex + angleOffset) * (Math.PI / 180)) + 7}
              textAnchor="middle"
              fill="#42567A"
              fontSize="20"
              cursor='pointer'
              pointerEvents="none"
            >
              {initialDate[hoveredIndex].periodId}
            </text>
          )}
        </svg>
      </div>
    </div>
  );
};
