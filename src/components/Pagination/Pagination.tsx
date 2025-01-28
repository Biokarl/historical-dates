import React from "react";
import styles from "./Pagination.module.scss";
import { initialDate } from "../../initialDate";

interface PaginationProps {
  handleNextRotate: () => void;
  handlePrevRotate: () => void;
  isAnimating: boolean;
  currentIndex: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  handleNextRotate,
  handlePrevRotate,
  isAnimating,
  currentIndex,
}) => {
  return (
    <div className={styles.root}>
      <span className={styles.number}>
        {currentIndex + 1}/{initialDate.length}
      </span>
      <div className={styles.pagination}>
        <a
          style={{ pointerEvents: isAnimating ? "none" : "auto", opacity: isAnimating ? 0.5 : 1 }}
          href="#"
          className={styles.prev}
          onClick={handlePrevRotate}
        >
          &#10094;
        </a>
        <a
          style={{ pointerEvents: isAnimating ? "none" : "auto", opacity: isAnimating ? 0.5 : 1 }}
          href="#"
          className={styles.next}
          onClick={handleNextRotate}
        >
          &#10095;
        </a>
      </div>
    </div>
  );
};
