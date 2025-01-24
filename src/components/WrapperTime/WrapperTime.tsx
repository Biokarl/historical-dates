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
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (wrapperRef.current?.offsetLeft || 0));
    setScrollLeft(wrapperRef.current?.scrollLeft || 0);
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (wrapperRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (wrapperRef.current) {
      wrapperRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current || {};
    if (scrollLeft !== undefined && scrollWidth !== undefined && clientWidth !== undefined) {
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollToLeft = () => {
    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        scrollLeft: wrapperRef.current.scrollLeft - wrapperRef.current.clientWidth,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
  };

  const scrollToRight = () => {
    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        scrollLeft: wrapperRef.current.scrollLeft + wrapperRef.current.clientWidth,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
  };

  useEffect(() => {
    handleScroll();
    const currentWrapper = wrapperRef.current;
    const handleScrollEvent = () => handleScroll();
    currentWrapper?.addEventListener("scroll", handleScrollEvent);

    return () => {
      currentWrapper?.removeEventListener("scroll", handleScrollEvent);
    };
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
        <Time currentIndex={currentIndex} />
      </div>
      {showRightArrow && (
        <button className={styles.arrow} onClick={scrollToRight}>
          &#10095;
        </button>
      )}
    </div>
  );
};
