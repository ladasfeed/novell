import styles from "./index.module.css";
import { novellApi } from "api/novell";
import { useEffect, useState } from "react";
import { lsController } from "store/ls";
import { NovellType } from "types";
import { useNavigate } from "react-router-dom";
import { routes } from "routes";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { Icons } from "assets/icons";
import { Button } from "components/ui/Button";
import { compile } from "components/modules/editor/helpers/compile";
import { Preview } from "components/modules/engine";

export const ControlPanel = () => {
  const [novellArray, setNovellArray] = useState<Array<NovellType>>([]);
  const push = useNavigate();
  const dispatch = useDispatch();
  const compiled = useSelector(editorSliceSelectors.getCompiled);

  const getList = async () => {
    const res = await novellApi.get();
    setNovellArray(res.data);
  };

  useEffect(() => {
    getList();
  }, []);

  const selectNovell = (index: number) => {
    const novell = novellArray[index];
    dispatch(editorSlice.actions.setBranches(novell.branches));
    dispatch(editorSlice.actions.setChapters(novell.chapters));
    dispatch(editorSlice.actions.setCharacters(novell.characters));
    lsController.set("novellId", novell._id as string);

    push(routes.editor);
  };

  const createNovell = async () => {
    await novellApi.create({
      chapters: {
        first: {
          id: "0",
          data: [],
        },
      },
      branches: ["default"],
      characters: [],
    });
  };

  const readNovell = (index: number) => {
    const novell = novellArray[index];
    dispatch(editorSlice.actions.setBranches(novell.branches));
    dispatch(editorSlice.actions.setChapters(novell.chapters));
    dispatch(editorSlice.actions.setCharacters(novell.characters));

    console.log(novell.chapters);
    const arrayOfChapters = Object.entries(novell.chapters).map(
      ([name, chapter]) => {
        return {
          data: compile(chapter.data),
          name,
        };
      }
    );

    console.log(arrayOfChapters);
    dispatch(editorSlice.actions.setCompiled(arrayOfChapters));
  };

  return (
    <div className={styles.container}>
      <div className={styles.novell_list}>
        {novellArray?.map((item, index) => (
          <div className={styles.novell_card}>
            {item._id}
            <Button variant={"light"} onClick={() => selectNovell(index)}>
              Edit novell
            </Button>
            <Button onClick={() => readNovell(index)} variant={"light"}>
              Read novell
            </Button>
          </div>
        ))}
        <div
          style={{
            background: "black",
          }}
          className={styles.novell_card}
          onClick={createNovell}
        >
          <Icons.ui.Plus />
        </div>
        <Preview large />
      </div>
    </div>
  );
};
