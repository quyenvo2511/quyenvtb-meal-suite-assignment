import clsx from "clsx";
import styles from "./LoadingSpin.module.css";

type LoadingSpinProps = {
  fullscreen?: boolean;
  size?: number;
  mode?: "default" | "faded"; // new prop
};

const LoadingSpin = ({
  fullscreen = false,
  size = 24,
  mode = "default",
}: LoadingSpinProps) => {
  return (
    <div
      className={clsx(styles["spinnerWrapper"], {
        [styles["fullscreen"]]: fullscreen,
        [styles["faded"]]: mode === "faded", // apply faded style
      })}
    >
      {mode === "default" && (
        <div
          className={styles["spinner"]}
          style={{
            width: size,
            height: size,
            borderWidth: Math.max(size * 0.2, 2),
          }}
        />
      )}
    </div>
  );
};

export default LoadingSpin;
