import React, { FC, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import styles from "./index.module.css";
import { Icons } from "assets/icons";

export type NodeToolButtonIconType =
  | "image"
  | "settings"
  | "sound"
  | "character"
  | "branch"
  | "plus"
  | "cross"
  | "text"
  | "copy";

type propsType = {} & HTMLAttributes<HTMLLabelElement> & {
    variant?: NodeToolButtonIconType;
    children?: ReactNode;
  };

const iconsMap: {
  [key in NodeToolButtonIconType]: FC;
} = {
  image: Icons.nodeIcons.Picture,
  settings: Icons.ui.Settings,
  character: Icons.nodeIcons.UserAdd,
  sound: Icons.ui.Audio,
  branch: Icons.ui.BranchEditor,
  plus: Icons.ui.Plus,
  cross: Icons.ui.Reset,
  text: Icons.ui.Text,
  copy: Icons.ui.Copy,
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
