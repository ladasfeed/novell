import { memo, useEffect, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import styles from "./index.module.css";
import { useFlowContext } from "components/pages/editor/flow context";
import { UiElementContainer } from "components/ui/UiContainer";
import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { NodeImageChanger } from "components/pages/editor/nodesServices/NodeImageChanger";
import { NodeCharacterEditorButton } from "components/pages/editor/nodesServices/CharacterChanger";

export const SplitterNode = memo(({ data, isConnectable, id }: any) => {
  const { changeElement } = useFlowContext();
  const branches = useSelector(editorSliceSelectors.getBranches);
  const [sourceBranches, setSourceBranches] = useState([...branches]);

  const [branchesText, setBranchesText] = useState<{
    [key: string]: string;
  }>({ ...data.branchesText });

  useEffect(() => {
    setSourceBranches(branches);
  }, []);

  const onSaveText = () => {
    changeElement(id, (value) => ({
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
          <NodeImageChanger id={id} />
          <NodeCharacterEditorButton id={id} />

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
