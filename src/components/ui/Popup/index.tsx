import React, { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import styles from "./index.module.css";
import { RSKHooks } from "react-dev-starter-pack/dist";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";

type propsType = {
  isOpened: boolean;
  setIsOpened: (v: boolean) => void;
  title?: string;
  children?: ReactNode;
  autoWidth?: boolean;
} & HTMLAttributes<HTMLDivElement>;
export const Popup = ({
  isOpened,
  setIsOpened,
  children,
  autoWidth,
  title,
  ...jsxAttr
}: propsType) => {
  const ref = useRef<HTMLDivElement>(null);
  RSKHooks.useBlurred(ref, setIsOpened, isOpened);

  useEffect(() => {
    if (isOpened) {
      const closeOnEscape = (e: any) => {
        if (e.code == "Escape") {
          setIsOpened(false);
        }
      };
      window.addEventListener("keydown", closeOnEscape);

      return () => {
        window.removeEventListener("keydown", closeOnEscape);
      };
    }
  }, [isOpened]);
  //
  // if (!isOpened) {
  //   return null;
  // }
  return (
    <AnimatePresence exitBeforeEnter>
      {isOpened && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 0.2 }}
          className={cn(styles.container)}
        >
          <motion.div
            animate={{ y: 0 }}
            initial={{ y: -100 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            ref={ref}
            className={cn(styles.container_inner, jsxAttr.className, {
              [`${styles["container_inner--auto-width"]}`]: autoWidth,
            })}
          >
            {title && <h3 className={styles.title}>{title}</h3>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
