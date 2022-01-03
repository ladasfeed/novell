import { Button } from "components/ui/Button";
import { BranchEditor } from "components/pages/editor/services/branchEditor";
import { ImageEditor } from "components/pages/editor/services/imageEditor";
import { ImageCaseEditor } from "components/pages/editor/services/imageCaseEditor";
import React, { useState } from "react";
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
import { ToolsGroup } from "components/ui/ToolsGroup";
import { ToolButton } from "components/ui/ToolButton";
import { Icons } from "assets/icons";
import { RSKHooks } from "react-dev-starter-pack/dist";
import cn from "classnames";
import { CommonCaseEditor } from "components/pages/editor/services/commonCaseEditor";

export const Toolbar = () => {
  const { setElements, elements, instance } = useFlowContext();
  const dispatch = useDispatch();
  const currentChapterName = useSelector(editorSliceSelectors.getChapterName);
  const chapters = useSelector(editorSliceSelectors.getChapters);
  const [isOpen, toggleOpen] = RSKHooks.useToggle();

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
    <>
      <Button className={styles.open_button} onClick={toggleOpen}>
        Toolbar
      </Button>
      <div
        className={cn(styles.container, {
          [`${styles["container--opened"]}`]: isOpen,
        })}
      >
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={toggleOpen}
        >
          Close
        </div>

        <ToolsGroup name="View">
          <ToolButton
            title={"preview images"}
            icon={<Icons.ui.ImageEditor />}
            onClick={togglePreviewImageMode}
          />
        </ToolsGroup>

        <ToolsGroup name="Nodes">
          <ToolButton
            title={"node"}
            className={"dndnode"}
            draggable
            onDragStart={(e) => onDragStart(e, "customNodeDefault")}
            icon={<Icons.ui.AddNode />}
          />
          <ToolButton
            title={"splitter"}
            className={"dndnode"}
            draggable
            onDragStart={(e) => onDragStart(e, "splitterNode")}
            icon={<Icons.ui.AddSplitter />}
          />
        </ToolsGroup>

        <ToolsGroup name="Editors">
          <BranchEditor />
          <ImageEditor />
          <CharacterEditor />
          <AudioEditor />
        </ToolsGroup>

        <BranchCaseEditor />
        <CharacterCaseEditor />
        <AudioCaseEditor />
        <ImageCaseEditor />
        <CommonCaseEditor />

        <ToolsGroup name="General">
          <ToolButton
            onDoubleClick={() => setElements(initialElements)}
            icon={<Icons.ui.Reset />}
          />
          <ToolButton onClick={compliedHandler} icon={<Icons.ui.Compile />} />
          <ToolButton onClick={saveHandler} icon={<Icons.ui.Save />} />
        </ToolsGroup>

        <Button onDoubleClick={lsController.clearAll}>Reset LS</Button>
        <Button onDoubleClick={deleteAll}>Delete images</Button>
      </div>
    </>
  );
};
