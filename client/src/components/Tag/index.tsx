import React from "react";
import styles from "./Tag.module.css";

type TagProps = {
  type: "todo" | "completed" | "all";
  label: string;
};

const Tag: React.FC<TagProps> = ({ label, type }) => {
  return <span className={`${styles["tag"]} ${styles[type]}`}>{label}</span>;
};

export default Tag;
