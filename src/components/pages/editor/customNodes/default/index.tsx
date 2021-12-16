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

export const CustomNodeDefault = memo(({ data, isConnectable, id }: any) => {
  const { changeElement } = useFlowContext();
  const [nodeText, setNodeText] = useState(data.text);
  const images = useSelector(editorSliceSelectors.getImages);
  const [isEditingText, setIsEditingText] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const onChangeText = () => {
    changeElement(id, (value) => ({
      ...value,
      data: { ...value.data, text: nodeText },
    }));
    setIsEditingText(false);
  };

  useEffect(() => {
    if (data.imgId !== undefined) {
      const newImg = images.find((item) => item.id == data.imgId);
      if (newImg) {
        setImage(newImg.value);
      }
    }
  }, [data.imgId, images]);

  const toggleEndNodeState = (e: any) => {
    const value = e.currentTarget.checked;
    changeElement(id, (v) => {
      return {
        ...v,
        data: { ...v.data, isEndNode: value },
      };
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
      }}
      className={styles.container}
    >
      <Handle
        className={styles.handle}
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
        </div>

        <div className={styles.tools__footer}>
          <UiElementContainer className={styles.text_edit}>
            {isEditingText ? (
              <>
                <Input
                  defaultValue={data.text}
                  className={styles.text_edit__input}
                  type="text"
                  onChange={(e) => setNodeText(e.currentTarget.value)}
                />
                <div onClick={onChangeText}>Save</div>
              </>
            ) : (
              <>
                <div
                  className={styles.text_edit__text}
                  onClick={() => setIsEditingText(true)}
                >
                  {data.text}
                </div>
              </>
            )}
          </UiElementContainer>
          <input onChange={toggleEndNodeState} type="checkbox" />
        </div>
      </div>
      <Handle
        type="source"
        id={data.branch || "default"}
        position={Position.Bottom}
        className={styles.handle}
        isConnectable={isConnectable}
      />
    </div>
  );
});
