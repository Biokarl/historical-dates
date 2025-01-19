import React, { useEffect, useRef } from "react";
import styles from "./Circle.module.scss";
import gsap from "gsap";

const initialDate = [
  {
    period: '1900 1905',
    idPeriod:0,
    datas:[
      {
        title: 1900,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:0
      },
      {
        title: 1901,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:1
      },
      {
        title: 1902,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:2
      },
      {
        title: 1903,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:3
      },
      {
        title: 1904,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:4
      },
      {
        title: 1905,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:5
      },
    ]
  },
  {
    period: '1910 1915',
    idPeriod:1,
    datas:[
      {
        title: 1910,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:0
      },
      {
        title: 1911,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:1
      },
      {
        title: 1912,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:2
      },
      {
        title: 1913,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:3
      },
      {
        title: 1914,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:4
      },
      {
        title: 1915,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:5
      },
    ]
  },
  {
    period: '1920 1925',
    idPeriod:2,
    datas:[
      {
        title: 1920,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:0
      },
      {
        title: 1921,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:1
      },
      {
        title: 1922,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:2
      },
      {
        title: 1923,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:3
      },
      {
        title: 1924,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:4
      },
      {
        title: 1925,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:5
      },
    ]
  },
  {
    period: '1930 1935',
    idPeriod:3,
    datas:[
      {
        title: 1930,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:0
      },
      {
        title: 1931,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:1
      },
      {
        title: 1932,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:2
      },
      {
        title: 1933,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:3
      },
      {
        title: 1934,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:4
      },
      {
        title: 1935,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:5
      },
    ]
  },
  {
    period: '1940 1945',
    idPeriod:4,
    datas:[
      {
        title: 1940,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:0
      },
      {
        title: 1941,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:1
      },
      {
        title: 1942,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:2
      },
      {
        title: 1943,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:3
      },
      {
        title: 1944,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:4
      },
      {
        title: 1945,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:5
      },
    ]
  },
  {
    period: '1950 1955',
    idPeriod:5,
    datas:[
      {
        title: 1950,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:0
      },
      {
        title: 1951,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:1
      },
      {
        title: 1952,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:2
      },
      {
        title: 1953,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:3
      },
      {
        title: 1954,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:4
      },
      {
        title: 1955,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, asperiores!',
      dataId:5
      },
    ]
  },
  
]


export const Circle = ({rotateForward,rotateBackward, count}) => {
  const circleRef = useRef(null);
  
  const totalPoints = initialDate.length;
  console.log(initialDate.length);

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
          {Array.from({ length: totalPoints }, (_, index) => (
            <circle
              key={index}
              cx={268 + 265 * Math.cos((index * 2 * Math.PI) / totalPoints)} // Расчет координат по окружности
              cy={265 + 265 * Math.sin((index * 2 * Math.PI) / totalPoints)}
              r="3"
              fill="#42567A"
            />
          ))}
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
