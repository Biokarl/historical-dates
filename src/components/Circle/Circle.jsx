import React, { useEffect, useRef } from "react";
import styles from "./Circle.module.scss";
import gsap from "gsap";

export const Circle = ({rotateForward,rotateBackward, count}) => {
  const circleRef = useRef(null);

  useEffect(() => {
    if (rotateForward) {
      gsap.to(circleRef.current, {
        rotation: '+=360', // Поворачиваем на 360 градусов
        transformOrigin: "center center", // Устанавливаем центр вращения
        duration: 2, // Длительность анимации
        ease: "power1.inOut", // Эффект замедления
      });

    }

    if (rotateBackward) {
      gsap.to(circleRef.current, {
        rotation: '-=360', // Поворачиваем на 360 градусов
        transformOrigin: "center center", // Устанавливаем центр вращения
        duration: 2, // Длительность анимации
        ease: "power1.inOut", // Эффект замедления
      });

    }
    
  }, [rotateForward,rotateBackward]);

 

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
          <circle cx="533" cy="265" r="3" fill="#42567A" />
          <circle cx="138" cy="34" r="3" fill="#42567A" />
          <circle cx="402" cy="492" r="3" fill="#42567A" />
          <circle cx="126" cy="489" r="3" fill="#42567A" />
          <circle cx="3" cy="265" r="3" fill="#42567A" />
        </svg>
        <svg
          className={styles.nav}
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="28" cy="28" r="28" transform="rotate(-180 28 28)" fill="#F4F5F9" />
          <circle
            cx="28"
            cy="28"
            r="27.5"
            transform="rotate(-180 28 28)"
            stroke="#303E58"
            strokeOpacity="0.5"
          />
        </svg>
        <span className={styles.number}>{count}</span>
        <span className={styles.tittle}>Наука</span>
      </div>
    </div>
  );
};
