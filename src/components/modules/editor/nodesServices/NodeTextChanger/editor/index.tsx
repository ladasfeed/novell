import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import React, { useMemo, useState } from "react";
import { useFlowContext } from "components/modules/editor/flow context";
import { Input } from "components/ui/Input";
import styles from "components/modules/editor/nodesServices/NodeTextChanger/editor/index.module.css";
import { Icons } from "assets/icons";
import { ToolButton } from "components/ui/ToolButton";

export default () => {
  const node = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const { changeElement, elements } = useFlowContext();
  const element = useMemo(() => {
    return elements.find((item) => item.id == node?.id);
  }, [elements]);
  const [nodeText, setNodeText] = useState(element?.data?.text);

  const onChangeText = () => {
    changeElement(node?.id as string, (value) => ({
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
