import clsx from "clsx";
import React from "react";
import styles from "./TimePeriod.module.scss";

export const TimePeriod = () => {
  return (
    <div className={styles.root}>
      201<span className={styles.letterSpacing}>5</span> <span className={styles.last}>2022</span>
    </div>
  );
};
