import React from "react";
import styles from "./Time.module.scss";
import clsx from "clsx";

export const Time = () => {
  return (
    <div className={clsx(styles.root)}>
      <div className={clsx(styles.tittle)}>2015</div>
      <div className={clsx(styles.description)}>
        13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды
      </div>
    </div>
  );
};
