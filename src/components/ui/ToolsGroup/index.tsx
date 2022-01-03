import { ReactNode } from "react";
import styles from "./index.module.css";

type propsType = {
  name?: string;
  children?: ReactNode;
};

export const ToolsGroup = ({ name, children }: propsType) => {
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{name}</h5>
      <div className={styles.tools}>{children}</div>
    </div>
  );
};
