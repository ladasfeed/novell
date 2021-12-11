import React, { HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import styles from "./index.module.css";

type propsType = {
  children: ReactNode;
  color?: string;
  separator?: boolean;
  noRectLayout?: boolean;
} & HTMLAttributes<HTMLDivElement>;
export const Title = ({
  children,
  separator,
  color,
  noRectLayout,
  ...jsxAttr
}: propsType) => {
  return (
    <div
      {...jsxAttr}
      className={cn(styles.container, jsxAttr.className, {
        [styles["container--no-rect-layout"]]: noRectLayout,
      })}
      style={{
        color: color,
      }}
    >
      <h2 className={styles.title}>{children}</h2>
      {separator && <div className={styles.separator} />}
    </div>
  );
};
