import React, { useEffect, useRef, useState } from "react";
import { Time } from "../Time/Time";
import styles from "./WrapperTime.module.scss";
import gsap from "gsap";

interface WrapperTimeProps {
  currentIndex: number;
}

export const WrapperTime: React.FC<WrapperTimeProps> = ({ currentIndex }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [endX, setEndX] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [showArrows, setShowArrows] = useState<boolean>(window.innerWidth > 768);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => setShowArrows(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateArrowsVisibility = () => {
    if (wrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const currentWrapper = wrapperRef.current;
    if (!currentWrapper) return;

    currentWrapper.addEventListener("scroll", updateArrowsVisibility);
    updateArrowsVisibility();

    return () => currentWrapper.removeEventListener("scroll", updateArrowsVisibility);
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartTime(Date.now());
    setScrollLeft(wrapperRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setEndX(e.touches[0].clientX);
    const x = e.touches[0].clientX;
    const walk = (x - startX) * 2;
    if (wrapperRef.current) {
      wrapperRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  
  const handleTouchEnd = () => {
    setIsDragging(false);
    const swipeDistance = endX - startX;
    const swipeDuration = Date.now() - startTime;
    const swipeSpeed = Math.abs(swipeDistance / swipeDuration); 

    if (wrapperRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = wrapperRef.current;
      const threshold = 0.5;

      if (swipeSpeed > threshold) {
        if (swipeDistance > 0) {
          gsap.to(wrapperRef.current, {
            scrollLeft: 0,
            duration: 0.7,
            ease: "power2.out",
          });
        } else {
          gsap.to(wrapperRef.current, {
            scrollLeft: scrollWidth - clientWidth,
            duration: 0.7,
            ease: "power2.out",
          });
        }
      }
    }
  };

  return (
    <div className={styles.root}>
      {showArrows && showLeftArrow && (
        <button className={styles.arrow} onClick={() => gsap.to(wrapperRef.current, { scrollLeft: wrapperRef.current!.scrollLeft - wrapperRef.current!.clientWidth, duration: 0.5, ease: "power1.inOut" })}>
          &#10094;
        </button>
      )}
      <div
        className={styles.container}
        ref={wrapperRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Time currentIndex={currentIndex} />
      </div>
      {showArrows && showRightArrow && (
        <button className={styles.arrow} onClick={() => gsap.to(wrapperRef.current, { scrollLeft: wrapperRef.current!.scrollLeft + wrapperRef.current!.clientWidth, duration: 0.5, ease: "power1.inOut" })}>
          &#10095;
        </button>
      )}
    </div>
  );
};
