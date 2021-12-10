import { memo, useCallback, useState } from "react";
import { Elements, FlowElement, Handle, Position } from "react-flow-renderer";
import styles from "./index.module.css";
import { getFileFromEvent } from "helpers/file";
import { useFlowContext } from "components/pages/editor/flow context";
import { NodeToolButton } from "components/ui/NodeToolButton";
import { UiElementContainer } from "components/ui/UiContainer";
import { changeElement } from "components/pages/editor/helpers/changeElement";

export const CustomNodeDefault = memo(({ data, isConnectable, id }: any) => {
  const { setElements } = useFlowContext();
  const [nodeText, setNodeText] = useState(data.text);
  const [isEditingText, setIsEditingText] = useState(false);

  const changeElementHandler = (fn: (value: FlowElement) => FlowElement) => {
    if (setElements) {
      setElements((prev) => {
        return changeElement(prev, id, fn);
      });
    }
  };

  const onChangeText = () => {
    changeElementHandler((value) => ({
      ...value,
      data: { ...value.data, text: nodeText },
    }));
    setIsEditingText(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${data.img})`,
      }}
      className={styles.container}
    >
      <Handle
        className={styles.handle}
        type="target"
        position={Position.Top}
        onConnect={(v) => {
          console.log(v);
        }}
        id="default"
        isConnectable={isConnectable}
      />
      <div className={styles.dark_layer} />
      <div className={styles.tools_layer}>
        <div className={styles.tools__header}>
          <NodeToolButton variant="image" />
        </div>

        <div className={styles.tools__footer}>
          <UiElementContainer className={styles.text_edit}>
            {isEditingText ? (
              <>
                <input
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
        </div>
      </div>
      <Handle
        type="source"
        id={data.branch || "default"}
        position={Position.Bottom}
        className={styles.handle}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});
