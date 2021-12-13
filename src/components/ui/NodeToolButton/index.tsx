import React, { FC, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import styles from "./index.module.css";
import { Icons } from "assets/icons";

type variantType =
  | "image"
  | "settings"
  | "sound"
  | "character"
  | "branch"
  | "plus";

type propsType = {} & HTMLAttributes<HTMLLabelElement> & {
    variant?: variantType;
    children?: ReactNode;
  };

const iconsMap: {
  [key in variantType]: FC;
} = {
  image: Icons.nodeIcons.Picture,
  settings: Icons.nodeIcons.Picture,
  character: Icons.nodeIcons.UserAdd,
  sound: Icons.nodeIcons.Picture,
  branch: Icons.nodeIcons.Picture,
  plus: Icons.ui.Plus,
};

export const NodeToolButton = ({
  variant,
  children,
  ...jsxAttr
}: propsType) => {
  return (
    <label {...jsxAttr} className={cn(styles.container, jsxAttr.className)}>
      {variant ? React.createElement(iconsMap[variant]) : null}
      {children}
    </label>
  );
};
