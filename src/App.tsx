import React, { useState, useEffect, useRef } from "react";
import { TimePeriod } from "./components/TimePeriod/TimePeriod";
import { Header } from "./components/Header/Header";
import { WrapperTime } from "./components/WrapperTime/WrapperTime";
import { Circle } from "./components/Circle/Circle";
import { Pagination } from "./components/Pagination/Pagination";
import { initialDate } from "./initialDate";
import gsap from "gsap";

export const App = () => {
  const [rotateForward, setRotateForward] = useState(false);
  const [rotateBackward, setRotateBackward] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  const circleRefs = useRef<(SVGGElement | null)[]>(Array(initialDate.length).fill(null));

  const totalPoints = initialDate.length;
  const anglePerIndex = 360 / totalPoints;

  const handleNextRotate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setRotateForward(true);
    setRotateBackward(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPoints);
    setTimeout(() => {
      setRotateForward(false);
      setIsAnimating(false);
    }, 1000);
  };

  const handlePrevRotate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setRotateBackward(true);
    setRotateForward(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPoints) % totalPoints);
    setTimeout(() => {
      setRotateBackward(false);
      setIsAnimating(false);
    }, 1000);
  };

  const onCircleClick = (index: number) => {
    if (isAnimating) return;
  
    setIsAnimating(true);
    setCurrentIndex(index);
  
    // Вычисляем корректный угол поворота всего круга
    const targetRotation = -index * anglePerIndex;
  
    gsap.to(".circle-svg", {
      rotation: targetRotation,
      transformOrigin: "50% 50%",
      duration: 1,
      ease: "power1.inOut",
      onComplete: () => setIsAnimating(false),
    });
  
    // Поворачиваем все элементы, чтобы они сохраняли направление
    circleRefs.current.forEach((ref) => {
      if (ref) {
        gsap.to(ref, {
          rotation: -targetRotation, // Обратный поворот
          transformOrigin: "50% 50%",
          duration: 1,
          ease: "power1.inOut",
        });
      }
    });
  };

  return (
    <div>
      <Circle
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
        rotateBackward={rotateBackward}
        rotateForward={rotateForward}
        currentIndex={currentIndex}
        onCircleClick={onCircleClick}
        circleRefs={circleRefs}
      />
      <Header />
      <TimePeriod currentIndex={currentIndex} />
      <Pagination
        isAnimating={isAnimating}
        handlePrevRotate={handlePrevRotate}
        handleNextRotate={handleNextRotate}
        currentIndex={currentIndex}
      />
      <WrapperTime currentIndex={currentIndex} />
    </div>
  );
};
