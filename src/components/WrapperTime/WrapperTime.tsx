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
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [showArrows, setShowArrows] = useState<boolean>(window.innerWidth > 768);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setShowArrows(window.innerWidth > 768);
    };

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (wrapperRef.current?.offsetLeft || 0));
    setScrollLeft(wrapperRef.current?.scrollLeft || 0);
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (wrapperRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (wrapperRef.current) {
      wrapperRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setScrollLeft(wrapperRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const walk = (x - startX) * 2;
    if (wrapperRef.current) {
      wrapperRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const scrollToLeft = () => {
    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        scrollLeft: wrapperRef.current.scrollLeft - wrapperRef.current.clientWidth,
        duration: 0.5,
        ease: "power1.inOut",
        onUpdate: updateArrowsVisibility, 
      });
    }
  };

  const scrollToRight = () => {
    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        scrollLeft: wrapperRef.current.scrollLeft + wrapperRef.current.clientWidth,
        duration: 0.5,
        ease: "power1.inOut",
        onUpdate: updateArrowsVisibility,
      });
    }
  };

  return (
    <div className={styles.root}>
      {showArrows && showLeftArrow && (
        <button className={styles.arrow} onClick={scrollToLeft}>
          &#10094;
        </button>
      )}
      <div
        className={styles.container}
        ref={wrapperRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Time currentIndex={currentIndex} />
      </div>
      {showArrows && showRightArrow && (
        <button className={styles.arrow} onClick={scrollToRight}>
          &#10095;
        </button>
      )}
    </div>
  );
};
