import React from "react";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.root}>
      <svg
        className={styles.line}
        width="6"
        height="120"
        viewBox="0 0 6 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 0L2.99999 120" stroke="url(#paint0_linear_1_56)" strokeWidth="5" />
        <defs>
          <linearGradient
            id="paint0_linear_1_56"
            x1="3.5"
            y1="-6"
            x2="3.49999"
            y2="102"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3877EE" />
            <stop offset="1" stopColor="#EF5DA8" />
          </linearGradient>
        </defs>
      </svg>
      <h2 className={styles.tittle}>
        Исторические
        <br /> даты
      </h2>
    </div>
  );
};
