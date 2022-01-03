import { Popup } from "components/ui/Popup";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { useFlowContext } from "components/pages/editor/flow context";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { UiElementContainer } from "components/ui/UiContainer";

export const BranchCaseEditor = () => {
  const isEditing = useSelector(editorSliceSelectors.getIsEditingBranch);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(editorSlice.actions.setEditingBranches(!isEditing));
  };

  return (
    <Popup setIsOpened={toggle} isOpened={isEditing}>
      <BranchCaseEditorInner />
    </Popup>
  );
};

const BranchCaseEditorInner = () => {
  const nodeId = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const branches = useSelector(editorSliceSelectors.getBranches);
  const { elements, changeElement } = useFlowContext();
  const [node, setNode] = useState<any>();

  useEffect(() => {
    if (elements) {
      setNode(elements.find((i) => i.id == nodeId));
    }
  }, [elements]);

  const onAddBranch = (branch: string) => {
    // TODO говно
    changeElement(nodeId as string, (v) => ({
      ...v,
      data: { ...v.data, branches: [...v.data.branches, branch] },
    }));
  };

  if (!node) return null;
  return (
    <div className={styles.container}>
      <div>
        <h2>Choose</h2>
        <div className={styles.branches_list}>
          {branches.map((item) => {
            return (
              <UiElementContainer onClick={() => onAddBranch(item)}>
                {item}
              </UiElementContainer>
            );
          })}
        </div>
      </div>
    </div>
  );
};
