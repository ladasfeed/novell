import styles from "./index.module.css";
import { useState } from "react";
import { NodeToolButton } from "components/ui/NodeToolButton";
import { useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { useAppDispatch } from "store/state";
import { Title } from "components/ui/Title";
import { UiElementContainer } from "components/ui/UiContainer";
import cn from "classnames";

export const ChaptersSidebar = () => {
  const [chapterInputName, setChapterInputName] = useState("");
  const chapters = useSelector(editorSliceSelectors.getChapters);
  const currentChapterName = useSelector(editorSliceSelectors.getChapterName);
  const dispatch = useAppDispatch();

  const getArrayOfChapters = () => {
    return Object.entries(chapters).map(([name]) => name);
  };

  const addNewChapter = () => {
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

  return (
    <div className={styles.container}>
      <Title separator>Create new chapter</Title>
      <div className={styles.create_chapter}>
        <input
          type="text"
          value={chapterInputName}
          onChange={(event) => setChapterInputName(event.currentTarget.value)}
        />
        <NodeToolButton onClick={addNewChapter} variant={"plus"}>
          Save
        </NodeToolButton>
      </div>
      <Title separator>Chapters</Title>
      <div className={styles.chapters}>
        {getArrayOfChapters().map((chapter) => (
          <UiElementContainer
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
    </div>
  );
};
