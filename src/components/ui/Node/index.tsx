import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import React, { ReactNode, useEffect, useState } from "react";
import cn from "classnames";
import { Handle, Position } from "react-flow-renderer";
import styles from "./index.module.css";

type propsType = {
  children: ReactNode;
  imageId?: string;
  isRootNode?: boolean;
  isEndNode?: boolean;
};
export function ReactFlowNode({
  imageId,
  children,
  isRootNode,
  isEndNode,
}: propsType) {
  const images = useSelector(editorSliceSelectors.getImages);
  const [image, setImage] = useState<string | null>(null);
  const isPreviewImageMode = useSelector(
    editorSliceSelectors.getIsImagesPreviewMode
  );

  useEffect(() => {
    if (imageId !== undefined) {
      const newImg = images.find((item) => item.id == imageId);
      if (newImg) {
        setImage(newImg.path);
      }
    }
  }, [imageId]);

  return (
    <div
      style={{
        backgroundImage: isPreviewImageMode ? `url(${image})` : "",
      }}
      className={cn(styles.container, {
        [`${styles["node--root"]}`]: isRootNode,
        [`${styles["node--end"]}`]: isEndNode,
      })}
    >
      <div className={styles.dark_layer} />

      {children}
    </div>
  );
}

ReactFlowNode.Handle = ({
  isConnectable,
  position,
  id,
  type,
}: {
  isConnectable: boolean;
  position: Position;
  id: string;
  type: "target" | "source";
}) => (
  <Handle
    className={cn(styles.handle, {
      [`${styles.handle_top}`]: position == Position.Top,
      [`${styles.handle_bottom}`]: position == Position.Bottom,
    })}
    type={type}
    position={position}
    id={id}
    isConnectable={isConnectable}
  />
);

ReactFlowNode.Tools = ({ children }: { children: ReactNode }) => (
  <div className={styles.tools_layer}>
    <div className={styles.tools__buttons}>{children}</div>
  </div>
);
