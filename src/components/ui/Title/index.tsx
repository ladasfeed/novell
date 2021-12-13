import React, { HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import styles from "./index.module.css";

type propsType = {
  children: ReactNode;
  color?: string;
  separator?: boolean;
  rectForm?: "no" | "mrBot" | "mrAll";
} & HTMLAttributes<HTMLDivElement>;
export const Title = ({
  children,
  separator,
  color,
  rectForm,
  ...jsxAttr
}: propsType) => {
  return (
    <div
      {...jsxAttr}
      className={cn(styles.container, jsxAttr.className, {
        [styles["container--no-rect-layout"]]: rectForm == "no",
        [styles["container--mb"]]: rectForm == "mrBot",
        [styles["container--mr_all"]]: rectForm == "mrAll",
      })}
      style={{
        color: color,
      }}
    >
      <h2 className={styles.title}>{children}</h2>
      {separator && (
        <div
          style={{
            backgroundColor: color,
          }}
          className={styles.separator}
        />
      )}
    </div>
  );
};
