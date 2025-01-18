import React, { useState } from "react";
import { TimePeriod } from "./components/TimePeriod/TimePeriod";
import { Header } from "./components/Header/Header";
import { WrapperTime } from "./components/WrapperTime/WrapperTime";
import { Circle } from "./components/Circle/Circle";
import { Pagination } from "./components/Pagination/Pagination";

export const App = () => {
  const [count, setCount] = useState(1);
  const [rotateForward, setRotateForward] = useState(false);
  const [rotateBackward, setRotateBackward] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextRotate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setRotateForward(true);
    setRotateBackward(false);
    setCount((prevCount) => (prevCount === 6 ? 1 : count + 1));
    setTimeout(() => {
      setRotateForward(false);
      setIsAnimating(false);
    }, 2000);
  };
  const handlePrevRotate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setRotateBackward(true);
    setRotateForward(false);
    setCount((prevCount) => (prevCount === 1 ? 6 : count - 1));
    setTimeout(() => {
      setRotateBackward(false);
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div>
      <Circle count={count} rotateBackward={rotateBackward} rotateForward={rotateForward} />
      <Header />
      <TimePeriod />
      <Pagination
        isAnimating={isAnimating}
        onPrevClick={handlePrevRotate}
        onNextClick={handleNextRotate}
      />
      <WrapperTime />
    </div>
  );
};
