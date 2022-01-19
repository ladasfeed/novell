import { Button } from "components/ui/Button";
import { BranchEditor } from "components/modules/editor/services/branchEditor";
import { ImageEditor } from "components/modules/editor/services/imageEditor";
import React, { useState } from "react";
import styles from "./index.module.css";
import { useFlowContext } from "components/modules/editor/flow context";
import { lsController } from "store/ls";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { CharacterEditor } from "components/modules/editor/services/characterEditor";
import { imageApi } from "api/image";
import { StateType, store } from "store/state";
import { AudioEditor } from "components/modules/editor/services/audoEditor";
import { ToolsGroup } from "components/ui/ToolsGroup";
import { ToolButton } from "components/ui/ToolButton";
import { Icons } from "assets/icons";
import { RSKHooks } from "react-dev-starter-pack/dist";
import cn from "classnames";
import { nodesServices } from "components/modules/editor/nodesServices";
import { compile } from "components/modules/editor/helpers/compile";
import { initialElements } from "components/modules/editor/index";
import { VariablesEditor } from "components/modules/editor/services/variablesEditor";
import { novellApi } from "api/novell";

const arrayOfNodeServices = Object.entries(nodesServices).map(
  (item) => item[1]
);

export const Toolbar = () => {
  const { setElements, elements, instance } = useFlowContext();
  const dispatch = useDispatch();
  const currentChapterName = useSelector(editorSliceSelectors.getChapterName);
  const chapters = useSelector(editorSliceSelectors.getChapters);
  const [isOpen, toggleOpen] = RSKHooks.useToggle(true);

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

  const saveHandler = async () => {
    // @ts-ignore
    const saved = instance.toObject();

    dispatch(
      editorSlice.actions.updateChapterElements({
        data: saved.elements,
        name: currentChapterName,
      })
    );

    const characters = (store.getState() as StateType).editor.characters;

    lsController.set("characters", characters);

    await novellApi.update({
      id: lsController.get("novellId") as string,
      characters,
      chapters: (store.getState() as StateType).editor.chapters,
      branches: (store.getState() as StateType).editor.branches,
    });
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
          <VariablesEditor />
        </ToolsGroup>

        {arrayOfNodeServices.map((s) => React.createElement(s.Service))}

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
