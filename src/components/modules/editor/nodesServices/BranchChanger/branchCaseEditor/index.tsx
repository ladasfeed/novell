import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { useFlowContext } from "components/modules/editor/flow context";
import React, { useEffect, useState } from "react";
import styles from "components/modules/editor/nodesServices/BranchChanger/branchCaseEditor/index.module.css";
import { UiElementContainer } from "components/ui/UiContainer";
import { Input } from "components/ui/Input";
import { Button } from "components/ui/Button";
import { Title } from "components/ui/Title";
import { ReactSelect } from "components/ui/ReactSelect";

export default () => {
  const node = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const branches = useSelector(editorSliceSelectors.getBranches);
  const { elements, changeElement } = useFlowContext();
  const [branchesText, setBranchesText] = useState<
    Array<{
      branch: string;
      text: string;
    }>
  >([]);

  useEffect(() => {
    if (elements) {
      setBranchesText(node?.data?.branchesText || []);
    }
  }, [elements]);

  const saveHandler = () => {
    changeElement(node?.id as string, (v) => ({
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
