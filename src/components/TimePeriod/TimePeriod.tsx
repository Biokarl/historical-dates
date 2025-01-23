import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap"; // Импортируем GSAP
import styles from "./TimePeriod.module.scss";
import { initialDate } from "../../initialDate";

interface TimePeriodProps {
  currentIndex: number;
}

export const TimePeriod: React.FC<TimePeriodProps> = ({ currentIndex }) => {
  const [rangeStart, setRangeStart] = useState<number>(
    parseInt(initialDate[currentIndex].rangeStart)
  );
  const [rangeEnd, setRangeEnd] = useState<number>(parseInt(initialDate[currentIndex].rangeEnd));

  useEffect(() => {
    const targetStart: number = parseInt(initialDate[currentIndex].rangeStart);
    const targetEnd: number = parseInt(initialDate[currentIndex].rangeEnd);

    const animatedValueStart = { value: rangeStart };
    const animatedValueEnd = { value: rangeEnd };

    // Анимация с использованием GSAP для rangeStart
    gsap.to(animatedValueStart, {
      value: targetStart,
      duration: 1, // Длительность анимации в секундах
      onUpdate: () => setRangeStart(Math.round(animatedValueStart.value)), // Обновляем состояние
    });

    // Анимация с использованием GSAP для rangeEnd
    gsap.to(animatedValueEnd, {
      value: targetEnd,
      duration: 1,
      onUpdate: () => setRangeEnd(Math.round(animatedValueEnd.value)),
    });
  }, [currentIndex]);

  return (
    <div className={styles.root}>
      <span>{rangeStart}</span>
      <span className={clsx(styles.last)}>{rangeEnd}</span>
    </div>
  );
};
