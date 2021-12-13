import React, { HTMLAttributes, ReactNode, useRef } from "react";
import styles from "./index.module.css";
import { RSKHooks } from "react-dev-starter-pack/dist";
import cn from "classnames";

type propsType = {
  isOpened: boolean;
  setIsOpened: (v: boolean) => void;
  title?: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
export const Popup = ({
  isOpened,
  setIsOpened,
  children,
  title,
  ...jsxAttr
}: propsType) => {
  const ref = useRef<HTMLDivElement>(null);
  RSKHooks.useBlurred(ref, setIsOpened, isOpened);

  if (!isOpened) {
    return null;
  }
  return (
    <div {...jsxAttr} className={cn(styles.container)}>
      <div ref={ref} className={cn(styles.container_inner, jsxAttr.className)}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {children}
      </div>
    </div>
  );
};
