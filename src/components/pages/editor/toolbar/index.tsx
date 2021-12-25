import { Button } from "components/ui/Button";
import { BranchEditor } from "components/pages/editor/services/branchEditor";
import { ImageEditor } from "components/pages/editor/services/imageEditor";
import { ImageCaseEditor } from "components/pages/editor/services/imageCaseEditor";
import React from "react";
import styles from "./index.module.css";
import { useFlowContext } from "components/pages/editor/flow context";
import { lsController } from "store/ls";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { compile } from "components/pages/editor/helpers/compile";
import { initialElements } from "components/pages/editor/index";
import { Title } from "components/ui/Title";
import { CharacterEditor } from "components/pages/editor/services/characterEditor";
import { mainApi } from "api";
import { imageApi } from "api/image";
import { StateType, store } from "store/state";
import { CharacterCaseEditor } from "components/pages/editor/services/characterCaseEditor";
import { BranchCaseEditor } from "components/pages/editor/services/branchCaseEditor";
import { AudioEditor } from "components/pages/editor/services/audoEditor";
import { AudioCaseEditor } from "components/pages/editor/services/audioCaseEditor";

export const Toolbar = () => {
  const { setElements, elements, instance } = useFlowContext();
  const dispatch = useDispatch();
  const currentChapterName = useSelector(editorSliceSelectors.getChapterName);
  const chapters = useSelector(editorSliceSelectors.getChapters);

  if (!setElements) return null;

  const deleteAll = async () => {
    await imageApi.deleteAll();
  };

  const compliedHandler = () => {
    const arrayOfChapters = Object.entries(chapters).map(([name, chapter]) => {
      return {
        data: compile(chapter.data),
        name,
      };
    });

    dispatch(editorSlice.actions.setCompiled(arrayOfChapters));
  };

  const saveHandler = () => {
    // @ts-ignore
    const saved = instance.toObject();
    dispatch(
      editorSlice.actions.updateChapterElements({
        data: elements,
        name: currentChapterName,
      })
    );
    lsController.set(
      "characters",
      (store.getState() as StateType).editor.characters
    );
  };

  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const togglePreviewImageMode = () => {
    dispatch(editorSlice.actions.togglePreviewImagesMode());
  };

  return (
    <div className={styles.container}>
      <Title separator>View mode</Title>
      <Button onClick={togglePreviewImageMode}>Toggle image preview</Button>

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
      <BranchCaseEditor />

      <ImageEditor />
      <ImageCaseEditor />

      <CharacterEditor />
      <CharacterCaseEditor />

      <AudioEditor />
      <AudioCaseEditor />

      <Title separator>General control</Title>
      <Button onDoubleClick={() => setElements(initialElements)}>
        Reset All
      </Button>
      <Button onDoubleClick={lsController.clearAll}>Reset LS</Button>
      <Button onClick={compliedHandler}>Compile</Button>
      <Button onDoubleClick={deleteAll}>Delete images</Button>
      <Button onClick={saveHandler}>Save</Button>
    </div>
  );
};
