import styles from "components/modules/editor/services/chapters/index.module.css";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { useAppDispatch } from "store/state";
import { Title } from "components/ui/Title";
import { UiElementContainer } from "components/ui/UiContainer";
import cn from "classnames";
import { RSKHooks } from "react-dev-starter-pack/dist";
import { Input } from "components/ui/Input";

export const ChaptersSidebar = () => {
  const [chapterInputName, setChapterInputName] = useState("");
  const [isOpen, toggleOpen] = RSKHooks.useToggle();
  const [contextMenuState, setContextMenuState] = useState({
    isOpen: false,
    position: [0, 0],
  });
  const chapters = useSelector(editorSliceSelectors.getChapters);
  const currentChapterName = useSelector(editorSliceSelectors.getChapterName);
  const dispatch = useAppDispatch();
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  const getArrayOfChapters = () => {
    return Object.entries(chapters).map(([name]) => name);
  };
  RSKHooks.useBlurred(
    contextMenuRef,
    (v) => setContextMenuState((prev) => ({ ...prev, isOpen: false })),
    contextMenuState.isOpen
  );

  const addNewChapter = () => {
    setChapterInputName("");
    dispatch(
      editorSlice.actions.addNewChapter({
        name: chapterInputName,
        chapter: {
          data: [],
          id: chapterInputName,
        },
      })
    );
  };

  const changeChapter = (name: string) => {
    dispatch(editorSlice.actions.setChapterName(name));
  };

  const onContextMenu = (e: any) => {
    const position = [e.clientX, e.clientY];
    setContextMenuState({
      position,
      isOpen: true,
    });
    e.preventDefault();
  };

  return (
    <div onContextMenu={onContextMenu}>
      <div onClick={toggleOpen} className={styles.preview}>
        Chapter:&nbsp;<b>{currentChapterName}</b>
      </div>
      <div
        className={cn(styles.bar, {
          [`${styles["bar--opened"]}`]: isOpen,
        })}
      >
        <div className={styles.collapse_button} onClick={toggleOpen}>
          Close
        </div>
        {/*<Title separator color="black">*/}
        {/*  Create new chapter*/}
        {/*</Title>*/}
        {/*<div className={styles.create_chapter}>*/}

        {/*  <NodeToolButton onClick={addNewChapter} variant={"plus"}>*/}
        {/*    Save*/}
        {/*  </NodeToolButton>*/}
        {/*</div>*/}
        <Title separator color="black">
          {" "}
          Chapters
        </Title>
        <div className={styles.chapters}>
          {getArrayOfChapters().map((chapter) => (
            <UiElementContainer
              key={chapter}
              className={cn(styles.chapter_element, {
                [styles["chapter_element--active"]]:
                  currentChapterName == chapter,
              })}
              onClick={() => changeChapter(chapter)}
            >
              {chapter}
            </UiElementContainer>
          ))}
        </div>
        {contextMenuState.isOpen && (
          <div
            ref={contextMenuRef}
            className={styles.context_menu}
            style={{
              position: "fixed",
              top: contextMenuState.position[1],
              left: contextMenuState.position[0],
            }}
          >
            <Input
              type="text"
              placeholder="Chapter name"
              value={chapterInputName}
              onChange={(event) =>
                setChapterInputName(event.currentTarget.value)
              }
            />
            <UiElementContainer
              style={{
                cursor: "pointer",
              }}
              onClick={addNewChapter}
            >
              Add new chapter
            </UiElementContainer>
          </div>
        )}
      </div>
    </div>
  );
};
