import React, { memo, useEffect, useState } from "react";
import { Handle, Position, useUpdateNodeInternals } from "react-flow-renderer";
import styles from "./index.module.css";
import { useFlowContext } from "components/pages/editor/flow context";
import { UiElementContainer } from "components/ui/UiContainer";
import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { Input } from "components/ui/Input";
import { Button } from "components/ui/Button";
import { nodesServices } from "components/pages/editor/nodesServices";

const services = [
  nodesServices.nodeImageService,
  nodesServices.nodeAudioService,
  nodesServices.nodeCharacterService,
  nodesServices.nodeBranchService,
];

export const SplitterNode = memo(({ data, isConnectable, id }: any) => {
  const { changeElement } = useFlowContext();
  const branches = useSelector(editorSliceSelectors.getBranches);
  const upd = useUpdateNodeInternals();

  const [branchesText, setBranchesText] = useState<{
    [key: string]: string;
  }>({ ...data.branchesText });

  const onSaveText = () => {
    changeElement(id, (value) => ({
      ...value,
      data: { ...value.data, branchesText },
    }));
  };

  useEffect(() => {
    upd(id);
  }, [data.branches]);

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
          <div className={styles.tools__buttons}>
            {services.map((item) => {
              return React.createElement(item.NodeButton, { id });
            })}
          </div>

          <UiElementContainer className={styles.branches_container}>
            {data?.branches?.map((item: any, index: number) => {
              return (
                <Input
                  placeholder={item}
                  onChange={(e) => {
                    const oldText = { ...branchesText };
                    oldText[item] = e.currentTarget.value;
                    setBranchesText(oldText);
                  }}
                  className={styles.text_edit__input}
                  key={index}
                />
              );
            })}
            <Button onClick={onSaveText}>Save</Button>
          </UiElementContainer>
        </div>
      </div>
      {data?.branches?.map((item: any, index: number) => (
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
