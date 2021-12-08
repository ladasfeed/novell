import styles from "./index.module.css";
import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

type propsType = HTMLAttributes<HTMLDivElement>;
export const UiElementContainer: FC<propsType> = ({ children, ...jsxAttr }) => {
  return (
    <div {...jsxAttr} className={cn(styles.container, jsxAttr.className)}>
      {children}
    </div>
  );
};
