import React from "react";
import styles from "./Pagination.module.scss";

export const Pagination = ({ onNextClick, onPrevClick, isAnimating }) => {
 

  return (
    <div className={styles.root}>
      <span className={styles.number}>1/6</span>
      <div className={styles.pagination}>
        <a style={{ pointerEvents: isAnimating ? 'none' : 'auto', opacity: isAnimating ? 0.5 : 1 }} href="#" className={styles.prev} onClick={onPrevClick}>
          &#10094;
        </a>
        <a style={{ pointerEvents: isAnimating ? 'none' : 'auto', opacity: isAnimating ? 0.5 : 1 }} href="#" className={styles.next} onClick={onNextClick}>
          &#10095;
        </a>
      </div>
    </div>
  );
};
