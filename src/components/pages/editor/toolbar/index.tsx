import { Button } from "components/ui/Button";
import { BranchEditor } from "components/pages/editor/services/branchEditor";
import { ImageEditor } from "components/pages/editor/services/imageEditor";
import { ImageCaseEditor } from "components/pages/editor/services/imageCaseEditor";
import React from "react";
import styles from "./index.module.css";
import { useFlowContext } from "components/pages/editor/flow context";
import { lsController } from "store/ls";
import { useDispatch } from "react-redux";
import { editorSlice } from "store/state/editor";
import { compile } from "components/pages/editor/helpers/compile";
import { initialElements } from "components/pages/editor/index";
import { Title } from "components/ui/Title";
import { CharacterEditor } from "components/pages/editor/services/characterEditor";

export const Toolbar = () => {
  const { setElements, elements } = useFlowContext();
  const dispatch = useDispatch();

  if (!setElements) return null;

  const addNewNode = (nodeType: string) => {
    setElements((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        type: nodeType,
        data: { text: "Custom text..." },
        position: { x: 500, y: 600 },
      },
    ]);
  };

  const compliedHandler = () => {
    dispatch(editorSlice.actions.setCompiled(compile(elements)));
  };

  const saveHandler = () => {
    // @ts-ignore
    const saved = reactFlowInstance.toObject();
    lsController.set("elements", saved);
  };

  const onDragStart = (event: any, nodeType: string) => {
    console.log(nodeType);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={styles.container}>
      <Title separator>Nodes</Title>
      <Button
        variant="add-node"
        className={"dndnode"}
        draggable
        onDragStart={(e) => onDragStart(e, "customNodeDefault")}
      >
        Add node
      </Button>
      <Button
        className={"dndnode"}
        draggable
        variant="add-node"
        onDragStart={(e) => onDragStart(e, "splitterNode")}
      >
        Add splitter
      </Button>

      <Title separator>Editors </Title>
      <BranchEditor />
      <ImageEditor />
      <ImageCaseEditor />
      <CharacterEditor />

      <Title separator>General control</Title>
      <Button onDoubleClick={() => setElements(initialElements)}>
        Reset All
      </Button>
      <Button onDoubleClick={lsController.clearAll}>Reset LS</Button>
      <Button onClick={compliedHandler}>Compile</Button>
      <Button onClick={saveHandler}>Save</Button>
    </div>
  );
};
