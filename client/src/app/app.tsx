import { Suspense, useLayoutEffect } from "react";
import { Routes } from "react-router-dom";
import { configRoutes } from "../config/routeConfig";
import styles from "./app.module.css";
import { routes } from "./routes";

const App = () => {
  // responsive
  useLayoutEffect(() => {
    const updateFontSize = () => {
      const maxWidth = 1920;
      const minWidth = 1420;

      const innerWidth = Math.max(
        minWidth,
        Math.min(window.innerWidth, maxWidth)
      );
      const baseWidth = 1420;
      const vw = innerWidth / baseWidth;

      document.documentElement.style.fontSize = `${vw * 16}px`;
    };

    updateFontSize();
    window.addEventListener("resize", updateFontSize);

    return () => window.removeEventListener("resize", updateFontSize);
  }, []);
  return (
    <div className={styles["app"]}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>{configRoutes(routes)}</Routes>
      </Suspense>
    </div>
  );
};

export default App;
