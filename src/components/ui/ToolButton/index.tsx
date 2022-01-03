import { HTMLAttributes, ReactNode } from "react";
import styles from "./index.module.css";
import cn from "classnames";
type propsType = {
  icon: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
export const ToolButton = ({ icon, ...jsxAttr }: propsType) => {
  return (
    <div {...jsxAttr} className={cn(styles.container, jsxAttr.className)}>
      {/*{icon}*/}
    </div>
  );
};
