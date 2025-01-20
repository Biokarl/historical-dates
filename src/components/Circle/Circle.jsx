import React, { useEffect, useRef, useState } from "react";
import styles from "./Circle.module.scss";
import gsap from "gsap";
import { initialDate } from '../../initialDate';

export const Circle = ({ rotateForward, rotateBackward, currentIndex }) => {
  const circleRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const totalPoints = initialDate.length;
  const anglePerIndex = 360 / totalPoints;

  useEffect(() => {
    if (rotateForward) {
      gsap.to(circleRef.current, {
        rotation: `+=${anglePerIndex * currentIndex}`, // Поворачиваем до текущего индекса
        transformOrigin: "center center",
        duration: 1,
        ease: "power1.inOut",
      });
    }

    if (rotateBackward) {
      gsap.to(circleRef.current, {
        rotation: `-=${anglePerIndex * currentIndex}`, // Поворачиваем до текущего индекса
        transformOrigin: "center center",
        duration: 1,
        ease: "power1.inOut",
      });
    }
  }, [rotateForward, rotateBackward, currentIndex]);

  return (
    <div className={styles.root}>
      <div className={styles.circle}>
        <svg
          ref={circleRef}
          width="536"
          height="530"
          viewBox="0 0 536 530"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle opacity="0.2" cx="268" cy="265" r="264.5" stroke="#42567A" />
          {initialDate.map((item, index) => (
            <circle
              className={styles.minCircle}
              key={index}
              id={item.periodId}
              cx={268 + 265 * Math.cos((index * 2 * Math.PI) / totalPoints)}
              cy={265 + 265 * Math.sin((index * 2 * Math.PI) / totalPoints)}
              r="3"
              fill="#42567A"
              stroke="#42567a"
              strokeWidth='2px'
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}

          {hoveredIndex !== null && (
            <text
              x={268 + 265 * Math.cos((hoveredIndex * 2 * Math.PI) / totalPoints)}
              y={265 + 265 * Math.sin((hoveredIndex * 2 * Math.PI) / totalPoints) + 7}
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