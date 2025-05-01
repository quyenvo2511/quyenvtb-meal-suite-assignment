import React from "react";
import styles from "./Empty.module.css";

type EmptySearchProps = {
  message?: string;
};

const EmptySearch: React.FC<EmptySearchProps> = ({
  message = "No results found",
}) => {
  return (
    <div className={styles["container"]}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48px"
        viewBox="0 -960 960 960"
        width="48px"
        fill="var(--ds-text-not-found, #d9d9d9)"
        style={{ marginBottom: "1rem" }}
      >
        <path d="M220-220h240v-180H220v180Zm0-220h240v-300H220v300Zm280 220h240v-300H500v300Zm0-340h240v-180H500v180ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v60h60v60h-60v150h60v60h-60v150h60v60h-60v60q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z" />
      </svg>
      <p className={styles["container-text"]}>{message}</p>
    </div>
  );
};

export default EmptySearch;
