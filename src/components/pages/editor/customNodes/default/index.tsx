import React, { memo, useEffect, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import cn from "classnames";
import { nodesServices } from "components/pages/editor/nodesServices";

const services = [
  nodesServices.nodeImageService,
  nodesServices.nodeAudioService,
  nodesServices.nodeCharacterService,
  nodesServices.nodeTextService,
];

export const CustomNodeDefault = memo(({ data, isConnectable, id }: any) => {
  const images = useSelector(editorSliceSelectors.getImages);
  const [image, setImage] = useState<string | null>(null);
  const isPreviewImageMode = useSelector(
    editorSliceSelectors.getIsImagesPreviewMode
  );

  useEffect(() => {
    if (data.imgId !== undefined) {
      const newImg = images.find((item) => item.id == data.imgId);
      if (newImg) {
        setImage(newImg.value);
      }
    }
  }, [data.imgId]);

  return (
    <div
      style={{
        backgroundImage: isPreviewImageMode ? `url(${image})` : "",
      }}
      className={styles.container}
    >
      <Handle
        className={cn(styles.handle, styles.handle_top)}
        type="target"
        position={Position.Top}
        id="default"
        isConnectable={isConnectable}
      />
      <div className={styles.dark_layer} />
      <div className={styles.tools_layer}>
        <div className={styles.tools__buttons}>
          {services.map((item) => {
            return React.createElement(item.NodeButton, { id });
          })}
        </div>
      </div>
      <Handle
        type="source"
        id={data.branch || "default"}
        position={Position.Bottom}
        className={cn(styles.handle, styles.handle_bottom)}
        isConnectable={isConnectable}
      />
    </div>
  );
});
