import React, { HTMLAttributes, ReactNode, useRef } from "react";
import styles from "./index.module.css";
import { RSKHooks } from "react-dev-starter-pack/dist";
import cn from "classnames";

type propsType = {
  isOpened: boolean;
  setIsOpened: (v: boolean) => void;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
export const Popup = ({
  isOpened,
  setIsOpened,
  children,
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
        {children}
      </div>
    </div>
  );
};
