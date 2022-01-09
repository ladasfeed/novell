import { Popup } from "components/ui/Popup";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { useFlowContext } from "components/pages/editor/flow context";
import React, { useEffect, useState } from "react";
import styles from "components/pages/editor/nodesServices/BranchChanger/branchCaseEditor/index.module.css";
import { UiElementContainer } from "components/ui/UiContainer";
import { Input } from "components/ui/Input";
import { Button } from "components/ui/Button";
import { Title } from "components/ui/Title";
import { ReactSelect } from "components/ui/ReactSelect";
import { reactFlowNodeType } from "types";

export default () => {
  const isEditing = useSelector(editorSliceSelectors.getIsEditingBranch);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(editorSlice.actions.setEditingBranches(!isEditing));
  };

  return (
    <Popup
      title="Branches controller"
      setIsOpened={toggle}
      isOpened={isEditing}
    >
      <BranchCaseEditorInner />
    </Popup>
  );
};

const BranchCaseEditorInner = () => {
  const nodeId = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const branches = useSelector(editorSliceSelectors.getBranches);
  const { elements, changeElement } = useFlowContext();
  const [node, setNode] = useState<reactFlowNodeType>();
  const [branchesText, setBranchesText] = useState<
    Array<{
      branch: string;
      text: string;
    }>
  >([]);

  useEffect(() => {
    if (elements) {
      const foundNode = elements.find((i) => i.id == nodeId);

      console.log(foundNode);
      if (foundNode) {
        setBranchesText(foundNode?.data?.branchesText || []);
        setNode(foundNode);
      }
    }
  }, [elements]);

  const saveHandler = () => {
    changeElement(nodeId as string, (v) => ({
      ...v,
      data: {
        ...v.data,
        branchesText,
        branches: branchesText.map((item) => item.branch),
      },
    }));
  };

  const onChangeText = (e: any) => {
    const value = e.currentTarget.value;
    const branch = e.currentTarget.getAttribute("data-branch");
    setBranchesText((p) =>
      p.map((item) => {
        return item.branch == branch
          ? {
              branch,
              text: value,
            }
          : item;
      })
    );
  };

  console.log(branchesText);
  if (!node) return null;
  return (
    <div className={styles.container}>
      <div>
        <Title color={"black"}>Select needed branches</Title>
        <ReactSelect
          defaultValue={node.data?.branchesText?.map((v) => ({
            value: v.branch,
            label: v.branch,
          }))}
          onChange={(v: any) => {
            setBranchesText((p) => [
              ...p,
              {
                text: "",
                branch: v[v.length - 1].value,
              },
            ]);
          }}
          isMulti
          options={branches.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </div>
      <UiElementContainer className={styles.branches_container}>
        {branchesText?.map((item, index: number) => {
          return (
            <Input
              placeholder={item.branch}
              data-branch={item.branch}
              value={item.text}
              onChange={onChangeText}
              className={styles.text_edit__input}
              key={index}
            />
          );
        })}
        <Button onClick={saveHandler}>Save</Button>
      </UiElementContainer>
    </div>
  );
};
