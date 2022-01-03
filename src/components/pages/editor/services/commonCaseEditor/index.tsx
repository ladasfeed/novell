import { useAppDispatch } from "store/state";
import { useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { Popup } from "components/ui/Popup";
import React, { useMemo, useState } from "react";
import { useFlowContext } from "components/pages/editor/flow context";
import { UiElementContainer } from "components/ui/UiContainer";
import { Input } from "components/ui/Input";
import styles from "./index.module.css";

export const CommonCaseEditor = () => {
  const dispatch = useAppDispatch();
  const isEditingCharacterCase = useSelector(
    editorSliceSelectors.getIsEditingCommon
  );
  const toggle = () => {
    dispatch(editorSlice.actions.setIsEditingCommon(false));
  };

  return (
    <Popup
      className={styles.popup}
      isOpened={isEditingCharacterCase}
      setIsOpened={toggle}
      title="Common node settings"
    >
      <CommonCaseEditorInner />
    </Popup>
  );
};

const CommonCaseEditorInner = () => {
  const nodeId = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const { changeElement, elements } = useFlowContext();
  const [isEditingText, setIsEditingText] = useState(false);
  const element = useMemo(() => {
    return elements.find((item) => item.id == nodeId);
  }, [elements]);
  const [nodeText, setNodeText] = useState(element?.data?.text);

  const onChangeText = () => {
    changeElement(nodeId as string, (value) => ({
      ...value,
      data: { ...value.data, text: nodeText },
    }));
    setIsEditingText(false);
  };

  const toggleEndNodeState = (e: any) => {
    const value = e.currentTarget.checked;
    changeElement(nodeId as string, (v) => {
      return {
        ...v,
        data: { ...v.data, isEndNode: value },
      };
    });
  };

  console.log(element);

  return (
    <div>
      <UiElementContainer className={styles.node_text}>
        {isEditingText ? (
          <>
            <Input
              defaultValue={element?.data?.text}
              type="text"
              onChange={(e) => setNodeText(e.currentTarget.value)}
            />
            <div onClick={onChangeText}>Save</div>
          </>
        ) : (
          <>
            <div onClick={() => setIsEditingText(true)}>
              {element?.data?.text}
            </div>
          </>
        )}
      </UiElementContainer>
      <label htmlFor="">
        Is node root:
        <input onChange={toggleEndNodeState} type="checkbox" />
      </label>
    </div>
  );
};
