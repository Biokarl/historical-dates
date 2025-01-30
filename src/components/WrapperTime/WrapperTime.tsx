import React, { useEffect, useRef, useState } from "react";
import { Time } from "../Time/Time";
import styles from "./WrapperTime.module.scss";
import gsap from "gsap";

interface WrapperTimeProps {
  currentIndex: number;
}

export const WrapperTime: React.FC<WrapperTimeProps> = ({ currentIndex }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const leftArrowRef = useRef<HTMLButtonElement | null>(null);
  const rightArrowRef = useRef<HTMLButtonElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [showArrows, setShowArrows] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setShowArrows(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateArrowsVisibility = () => {
    if (wrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;
      const hasLeft = scrollLeft > 0;
      const hasRight = scrollLeft + clientWidth < scrollWidth;

      if (leftArrowRef.current && rightArrowRef.current) {
        gsap.to(leftArrowRef.current, { opacity: hasLeft ? 1 : 0, scale: hasLeft ? 1 : 0.8, duration: 0.3, pointerEvents: hasLeft ? "auto" : "none" });
        gsap.to(rightArrowRef.current, { opacity: hasRight ? 1 : 0, scale: hasRight ? 1 : 0.8, duration: 0.3, pointerEvents: hasRight ? "auto" : "none" });
      }
    }
  };

  useEffect(() => {
    const currentWrapper = wrapperRef.current;
    if (!currentWrapper) return;

    currentWrapper.addEventListener("scroll", updateArrowsVisibility);
    updateArrowsVisibility();

    return () => currentWrapper.removeEventListener("scroll", updateArrowsVisibility);
  }, []);

  const handleStart = (clientX: number) => {
    isDraggingRef.current = true;
    startXRef.current = clientX;
    startTimeRef.current = Date.now();
    scrollLeftRef.current = wrapperRef.current?.scrollLeft || 0;
  };

  const handleMove = (clientX: number) => {
    if (!isDraggingRef.current || !wrapperRef.current) return;
    const walk = (clientX - startXRef.current) * 2;
    wrapperRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleEnd = (clientX: number) => {
    isDraggingRef.current = false;

    if (!wrapperRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = wrapperRef.current;
    const swipeDistance = clientX - startXRef.current;
    const swipeDuration = Date.now() - startTimeRef.current;
    const swipeSpeed = Math.abs(swipeDistance / swipeDuration);
    const swipeMultiplier = Math.min(10, Math.max(2, swipeSpeed * 10));

    let newScrollLeft = scrollLeft - swipeDistance * swipeMultiplier;
    newScrollLeft = Math.max(0, Math.min(newScrollLeft, scrollWidth - clientWidth));

    gsap.to(wrapperRef.current, { scrollLeft: newScrollLeft, duration: 0.5, ease: "power3.out" });
  };

  return (
    <div className={styles.root}>
      {showArrows && (
        <button
          ref={leftArrowRef}
          className={styles.arrow}
          onClick={() => gsap.to(wrapperRef.current, { scrollLeft: wrapperRef.current!.scrollLeft - wrapperRef.current!.clientWidth, duration: 0.5, ease: "power2.inOut" })}
        >
          &#10094;
        </button>
      )}
      <div
        className={styles.container}
        ref={wrapperRef}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={(e) => handleEnd(e.clientX)}
        onMouseLeave={() => (isDraggingRef.current = false)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
      >
        <Time currentIndex={currentIndex} />
      </div>
      {showArrows && (
        <button
          ref={rightArrowRef}
          className={styles.arrow}
          onClick={() => gsap.to(wrapperRef.current, { scrollLeft: wrapperRef.current!.scrollLeft + wrapperRef.current!.clientWidth, duration: 0.5, ease: "power2.inOut" })}
        >
          &#10095;
        </button>
      )}
    </div>
  );
};
