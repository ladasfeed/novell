import { memo, useEffect, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import styles from "./index.module.css";
import { useFlowContext } from "components/pages/editor/flow context";
import { UiElementContainer } from "components/ui/UiContainer";
import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { NodeImageChanger } from "components/pages/editor/nodesServices/NodeImageChanger";
import { NodeCharacterEditorButton } from "components/pages/editor/nodesServices/CharacterChanger";
import { Input } from "components/ui/Input";
import { NodeAudioChanger } from "components/pages/editor/nodesServices/AudioChanger";
import { NodeCommonChanger } from "components/pages/editor/nodesServices/CommonChanger";
import { NodeBranchChanger } from "components/pages/editor/nodesServices/BranchChanger";
import cn from "classnames";

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
  }, [data.imgId, images]);

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
          <NodeImageChanger id={id} />
          <NodeCharacterEditorButton id={id} />
          <NodeAudioChanger id={id} />
          <NodeCommonChanger id={id} />
          <NodeBranchChanger id={id} />
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
