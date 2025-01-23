import React, { useState } from "react";
import { TimePeriod } from "./components/TimePeriod/TimePeriod";
import { Header } from "./components/Header/Header";
import { WrapperTime } from "./components/WrapperTime/WrapperTime";
import { Circle } from "./components/Circle/Circle";
import { Pagination } from "./components/Pagination/Pagination";
import { initialDate } from "./initialDate";

export const App = () => {
  const [rotateForward, setRotateForward] = useState(false);
  const [rotateBackward, setRotateBackward] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextRotate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setRotateForward(true);
    setRotateBackward(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % initialDate.length);
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
    setCurrentIndex((prevIndex) => (prevIndex - 1 + initialDate.length) % initialDate.length);
    setTimeout(() => {
      setRotateBackward(false);
      setIsAnimating(false);
    }, 1000);
  };

  const handleCircleClick = (index: number) => {
    setCurrentIndex(index); // Обновляем currentIndex при клике на круг
  };

  return (
    <div>
      <Circle
        rotateBackward={rotateBackward}
        rotateForward={rotateForward}
        currentIndex={currentIndex}
        onCircleClick={handleCircleClick} // Передаем обработчик клика
      />
      <Header />
      <TimePeriod currentIndex={currentIndex} />
      <Pagination
        isAnimating={isAnimating}
        onPrevClick={handlePrevRotate}
        onNextClick={handleNextRotate}
        currentIndex={currentIndex}
      />
      <WrapperTime currentIndex={currentIndex} />
    </div>
  );
};
