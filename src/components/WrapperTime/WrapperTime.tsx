// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Time } from "../Time/Time";
import styles from "./WrapperTime.module.scss";
import { Pagination } from "../Pagination/Pagination";
import gsap from "gsap";

export const WrapperTime = () => {
  const wrapperRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - wrapperRef.current.offsetLeft);
    setScrollLeft(wrapperRef.current.scrollLeft);
    wrapperRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    wrapperRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    wrapperRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - wrapperRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    wrapperRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
  };

  const scrollToLeft = () => {
    gsap.to(wrapperRef.current, {
      scrollLeft: wrapperRef.current.scrollLeft - wrapperRef.current.clientWidth,
      duration: 0.5, // Длительность анимации
      ease: "power1.inOut", // Эффект easing
    });
  };

  const scrollToRight = () => {
    gsap.to(wrapperRef.current, {
      scrollLeft: wrapperRef.current.scrollLeft + wrapperRef.current.clientWidth,
      duration: 0.5, // Длительность анимации
      ease: "power1.inOut", // Эффект easing
    });
  };

  useEffect(() => {
    handleScroll(); // Проверяем наличие стрелок при монтировании
    const handleScrollEvent = () => handleScroll();
    wrapperRef.current.addEventListener("scroll", handleScrollEvent);
  }, []);

  return (
    <div className={styles.container}>
      {showLeftArrow && (
        <button className={styles.arrow} onClick={scrollToLeft}>
          &#10094;
        </button>
      )}
      <div
        className={styles.root}
        ref={wrapperRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Time />
      </div>
      {showRightArrow && (
        <button className={styles.arrow} onClick={scrollToRight}>
          &#10095;
        </button>
      )}
    </div>
  );
};
