import React, {
  FC,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import styles from "./index.module.css";
import cn from "classnames";

type propsType = { children?: ReactNode } & HTMLAttributes<HTMLButtonElement>;
export const Button = ({ children, ...props }: propsType) => {
  return (
    <button {...props} className={cn(styles.container, props.className)}>
      {children}
    </button>
  );
};
