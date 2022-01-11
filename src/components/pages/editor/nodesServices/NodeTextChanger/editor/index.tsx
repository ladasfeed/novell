import { useAppDispatch } from "store/state";
import { useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { Popup } from "components/ui/Popup";
import React, { useMemo, useState } from "react";
import { useFlowContext } from "components/pages/editor/flow context";
import { UiElementContainer } from "components/ui/UiContainer";
import { Input } from "components/ui/Input";
import styles from "components/pages/editor/nodesServices/NodeTextChanger/editor/index.module.css";
import { Button } from "components/ui/Button";
import { Icons } from "assets/icons";
import { NodeToolButton } from "components/ui/NodeToolButton";
import { ToolButton } from "components/ui/ToolButton";

export default () => {
  const dispatch = useAppDispatch();
  const isEditingCharacterCase = useSelector(
    editorSliceSelectors.getIsEditingNodeText
  );
  const toggle = () => {
    dispatch(editorSlice.actions.setIsEditingNodeText(false));
  };

  return (
    <Popup
      className={styles.popup}
      isOpened={isEditingCharacterCase}
      setIsOpened={toggle}
      title="Text node settings"
    >
      <Inner />
    </Popup>
  );
};

const Inner = () => {
  const nodeId = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const { changeElement, elements } = useFlowContext();
  const element = useMemo(() => {
    return elements.find((item) => item.id == nodeId);
  }, [elements]);
  const [nodeText, setNodeText] = useState(element?.data?.text);

  const onChangeText = () => {
    changeElement(nodeId as string, (value) => ({
      ...value,
      data: { ...value.data, text: nodeText },
    }));
  };

  return (
    <div>
      <div className={styles.node_text}>
        <Input
          defaultValue={element?.data?.text}
          type="text"
          placeholder="Node text..."
          onChange={(e) => setNodeText(e.currentTarget.value)}
        />
        <ToolButton
          icon={<Icons.ui.Save onClick={onChangeText}>Save</Icons.ui.Save>}
        />
      </div>
    </div>
  );
};
