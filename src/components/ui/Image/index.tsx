import { HTMLAttributes } from "react";
import cn from "classnames";
import styles from "./index.module.css";

type propsType = {
  name?: string;
  src?: string;
} & HTMLAttributes<HTMLDivElement>;

export const Img = ({ name, src, ...jsxAttr }: propsType) => {
  return (
    <div {...jsxAttr} className={cn(styles.container, jsxAttr.className)}>
      <img className={styles.img} src={src} alt="" />
      <span className={styles.name}>{name}</span>
    </div>
  );
};
