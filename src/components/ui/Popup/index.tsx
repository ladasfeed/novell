import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { RSKHooks } from "react-dev-starter-pack/dist";

type propsType = {
  isOpened: boolean;
  setIsOpened: (v: boolean) => void;
  children?: ReactNode;
};
export const Popup = ({ isOpened, setIsOpened, children }: propsType) => {
  const ref = useRef<HTMLDivElement>(null);
  RSKHooks.useBlurred(ref, setIsOpened, isOpened);

  if (!isOpened) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.container_inner}>
        {children}
      </div>
    </div>
  );
};
