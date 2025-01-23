import React from "react";
import styles from "./Time.module.scss";
import clsx from "clsx";
import { initialDate } from "../../initialDate";

interface TimeProps {
  currentIndex: number; // Добавляем пропс для текущего индекса
}

export const Time: React.FC<TimeProps> = ({ currentIndex }) => {
  return (
    <div className={clsx(styles.root)}>
      {initialDate[currentIndex].data.map((item) => (
        <div className={clsx(styles.wrapper)} key={item.dataId}>
          <div className={clsx(styles.title)}>{item.title}</div>
          <div className={clsx(styles.description)}>{item.description}</div>
        </div>
      ))}
    </div>
  );
};
