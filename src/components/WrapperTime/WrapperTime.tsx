import React from "react";
import { Time } from "../Time/Time";
import styles from "./WrapperTime.module.scss";
import { Pagination } from "../Pagination/Pagination";

export const WrapperTime = () => {
  return (
    <div className={styles.root}>
      <Time />
      <Time />
      <Time />
    </div>
  );
};
