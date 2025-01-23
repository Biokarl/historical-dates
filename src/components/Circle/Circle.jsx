import React, { useEffect, useRef, useState } from "react";
import styles from "./Circle.module.scss";
import gsap from "gsap";
import { initialDate } from '../../initialDate';

export const Circle = ({ rotateForward, rotateBackward, currentIndex, onCircleClick }) => {
  const circleRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const totalPoints = initialDate.length;
  const anglePerIndex = 360 / totalPoints;
  const angleOffset = -anglePerIndex;

  useEffect(() => {
    if (rotateForward) {
      gsap.to(circleRef.current, {
        rotation: `-=${anglePerIndex}`, 
        transformOrigin: "center center",
        duration: 1,
        ease: "power1.inOut",
      });
    }

    if (rotateBackward) {
      gsap.to(circleRef.current, {
        rotation: `+=${anglePerIndex}`, 
        transformOrigin: "center center",
        duration: 1,
        ease: "power1.inOut",
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
                  <text
                    x={268 + 265 * Math.cos(angle)}
                    y={265 + 265 * Math.sin(angle) + 7}
                    textAnchor="middle"
                    fill="#42567A"
                    fontSize="20"
                    cursor='pointer'
                    pointerEvents="none"
                  >
                    {item.periodId} 
                  </text>
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
