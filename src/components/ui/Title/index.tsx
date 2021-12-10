import React, { HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import styles from "./index.module.css";

type propsType = {
  children: ReactNode;
  separator?: boolean;
} & HTMLAttributes<HTMLDivElement>;
export const Title = ({ children, separator, ...jsxAttr }: propsType) => {
  return (
    <div {...jsxAttr} className={cn(styles.container, jsxAttr.className)}>
      <h2 className={styles.title}>{children}</h2>
      {separator && <div className={styles.separator} />}
    </div>
  );
};
