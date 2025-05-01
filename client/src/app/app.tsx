import { Suspense, useLayoutEffect } from "react";
import { Routes } from "react-router-dom";
import { configRoutes } from "../config/routeConfig";
import styles from "./app.module.css";
import { routes } from "./routes";
import LoadingSpin from "../components/LoadingSpin/LoadingSpin";

const App = () => {
  // responsive
  useLayoutEffect(() => {
    const updateFontSize = () => {
      const maxWidth = 1920;
      const minWidth = 375;
      const baseWidth = 1420;

      const innerWidth = Math.max(
        minWidth,
        Math.min(window.innerWidth, maxWidth)
      );
      const vw = innerWidth / baseWidth;

      const fontSize = Math.max(12, vw * 16);
      document.documentElement.style.fontSize = `${fontSize}px`;
    };

    updateFontSize();
    window.addEventListener("resize", updateFontSize);

    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  return (
    <div className={styles["app"]}>
      <Suspense fallback={<LoadingSpin />}>
        <Routes>{configRoutes(routes)}</Routes>
      </Suspense>
    </div>
  );
};

export default App;
