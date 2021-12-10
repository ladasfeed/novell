import React, { HTMLAttributes, ReactNode } from "react";
import styles from "./index.module.css";
import cn from "classnames";

type propsType = {
  children?: ReactNode;
  variant?: "add-node";
} & HTMLAttributes<HTMLButtonElement>;
export const Button = ({ children, variant, ...props }: propsType) => {
  return (
    <button
      {...props}
      className={cn(styles.container, props.className, {
        [styles["container--add-node"]]: variant == "add-node",
      })}
    >
      {children}
    </button>
  );
};
