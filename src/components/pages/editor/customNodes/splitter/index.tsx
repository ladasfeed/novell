import { memo, useCallback, useEffect, useState } from "react";
import { Elements, FlowElement, Handle, Position } from "react-flow-renderer";
import styles from "./index.module.css";
import { getFileFromEvent } from "helpers/file";
import { useFlowContext } from "components/pages/editor/flow context";
import { NodeToolButton } from "components/ui/NodeToolButton";
import { UiElementContainer } from "components/ui/UiContainer";
import { changeElement } from "components/pages/editor/helpers/changeElement";
import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";

export const SplitterNode = memo(({ data, isConnectable, id }: any) => {
  const { setElements } = useFlowContext();
  const branches = useSelector(editorSliceSelectors.getBranches);
  const [sourceBranches, setSourceBranches] = useState([...branches]);

  const [branchesText, setBranchesText] = useState<{
    [key: string]: string;
  }>({ ...data.branchesText });

  const changeElementHandler = (fn: (value: FlowElement) => FlowElement) => {
    if (setElements) {
      setElements((prev) => {
        return changeElement(prev, id, fn);
      });
    }
  };

  useEffect(() => {
    setSourceBranches(branches);
  }, []);

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

  const onSaveText = () => {
    changeElementHandler((value) => ({
      ...value,
      data: { ...value.data, branchesText },
    }));
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
        position={Position.Top}
        className={styles.handle}
        isConnectable={isConnectable}
      />
      <div className={styles.dark_layer} />
      <div className={styles.tools_layer}>
        <div className={styles.tools__header}>
          <NodeToolButton variant="image">
            <input
              className={styles.file_input}
              type="file"
              onChange={onUploadFile}
            />
          </NodeToolButton>
          <UiElementContainer className={styles.branches_container}>
            {branches.map((item, index) => {
              return (
                <input
                  onChange={(e) => {
                    const oldText = { ...branchesText };
                    oldText[item] = e.currentTarget.value;
                    setBranchesText(oldText);
                  }}
                  key={index}
                />
              );
            })}
            <div onClick={onSaveText}>Save</div>
          </UiElementContainer>
        </div>
      </div>
      {sourceBranches.map((item, index) => (
        <div style={{ left: index * 150 }} className={styles.handle_wrapper}>
          <h3 className={styles.handle_wrapper__text}>{item}</h3>
          <Handle
            className={styles.handle}
            type="source"
            position={Position.Bottom}
            id={item}
            isConnectable={isConnectable}
          />
        </div>
      ))}
    </div>
  );
});
