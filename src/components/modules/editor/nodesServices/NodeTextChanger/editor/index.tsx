import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import React, { useMemo, useState } from "react";
import { useFlowContext } from "components/modules/editor/flow context";
import { Input } from "components/ui/Input";
import styles from "components/modules/editor/nodesServices/NodeTextChanger/editor/index.module.css";
import { Icons } from "assets/icons";
import { ToolButton } from "components/ui/ToolButton";
import { actType } from "types";
import { Button } from "components/ui/Button";

export default () => {
  const node = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const { changeElement } = useFlowContext();
  const [actData, setActData] = useState<actType>(node?.data?.act || []);

  const onSave = () => {
    changeElement(node?.id as string, (value) => ({
      ...value,
      data: { ...value.data, act: actData },
    }));
  };

  const addActFrame = () => {
    setActData((prev) => [
      ...prev,
      {
        charactersCases: [],
        text: "",
      },
    ]);
  };

  const editText = (e: any) => {
    const currentFrameIndex = Number(
      e.currentTarget.getAttribute("data-index")
    );
    const value = e.currentTarget.value;

    setActData((prev) =>
      prev.map((item, index) => {
        return currentFrameIndex == index
          ? {
              text: value,
              charactersCases: [],
            }
          : item;
      })
    );
  };

  // useFieldsArray
  return (
    <div>
      {actData.map((item, index) => (
        <div className={styles.node_text}>
          <Input
            value={item.text}
            type="text"
            data-index={index}
            placeholder="Node text..."
            onChange={editText}
          />
        </div>
      ))}
      <div className={styles.buttons}>
        <Icons.ui.Plus onClick={addActFrame}>Add</Icons.ui.Plus>
        <ToolButton
          icon={<Icons.ui.Save onClick={onSave}>Save</Icons.ui.Save>}
        />
      </div>
    </div>
  );
};
