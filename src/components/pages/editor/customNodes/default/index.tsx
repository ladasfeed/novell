import { memo, useCallback, useState } from "react";
import {
  Elements,
  FlowElement,
  Handle,
  Position,
  useUpdateNodeInternals,
} from "react-flow-renderer";
import styles from "./index.module.css";
import { getFileFromEvent } from "helpers/file";
import { useFlowContext } from "components/pages/editor/flow context";
import { NodeToolButton } from "components/ui/NodeToolButton";
import { UiElementContainer } from "components/ui/UiContainer";

const changeElement = (
  elements: Elements,
  id: string,
  setValue: (value: FlowElement) => FlowElement
): Elements => {
  return elements.map((item) => {
    return item.id == id ? setValue(item) : item;
  });
};

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

  const onUploadFile = useCallback(
    (e: any) => {
      getFileFromEvent(e).then((file) => {
        changeElementHandler((value) => ({
          ...value,
          data: { ...value.data, img: file.value },
        }));
      });
    },
    [setElements]
  );

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
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div className={styles.dark_layer} />
      <div className={styles.tools_layer}>
        <div className={styles.tools__header}>
          <label>
            <NodeToolButton variant="image">
              <input
                className={styles.file_input}
                type="file"
                onChange={onUploadFile}
              />
            </NodeToolButton>
          </label>
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
        position={Position.Right}
        id="a"
        style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ bottom: 10, top: "auto", background: "#555" }}
        isConnectable={isConnectable}
      />
    </div>
  );
});
