import clsx from "clsx";
import React from "react";
import styles from "./TimePeriod.module.scss";
import { initialDate } from "../../initialDate";

export const TimePeriod = () => {
  return (
    <div className={styles.root}>
      <span>{initialDate[0].rangeStart}</span>
      <span className={styles.last}>{initialDate[0].rangeEnd}</span>
    </div>
  );
};
