import styles from "./index.module.css";
import React, { AllHTMLAttributes, HTMLAttributes } from "react";
import cn from "classnames";

type propsType = {} & AllHTMLAttributes<HTMLInputElement>;
export const Input = (props: propsType) => {
  return <input {...props} className={cn(styles.input, props.className)} />;
};
