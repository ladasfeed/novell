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
import { Input } from "components/ui/Input";

export const ControlPanel = () => {
  const [novellArray, setNovellArray] = useState<Array<NovellType>>([]);
  const push = useNavigate();
  const dispatch = useDispatch();

  const getList = async () => {
    const res = await novellApi.get();
    setNovellArray(res.data);
  };

  useEffect(() => {
    getList();
  }, []);

  // edit
  const selectNovell = (index: number) => {
    const novell = novellArray[index];
    dispatch(editorSlice.actions.setBranches(novell.branches));
    dispatch(editorSlice.actions.setChapters(novell.chapters));
    dispatch(editorSlice.actions.setCharacters(novell.characters));
    lsController.set("novellId", novell._id as string);

    push(routes.editor);
  };

  // read
  const readNovell = (index: number) => {
    const novell = novellArray[index];
    lsController.set("novellId", String(novell!._id));
    dispatch(editorSlice.actions.setBranches(novell.branches));
    dispatch(editorSlice.actions.setChapters(novell.chapters));
    dispatch(editorSlice.actions.setCharacters(novell.characters));

    const arrayOfChapters = Object.entries(novell.chapters).map(
      ([name, chapter]) => {
        return {
          data: compile(chapter.data),
          name,
        };
      }
    );

    dispatch(editorSlice.actions.setCompiled(arrayOfChapters));
  };

  // create
  const [novellName, setNovellName] = useState("");
  const createNovell = async () => {
    await novellApi.create({
      name: novellName,
      chapters: {
        first: {
          id: "0",
          data: [],
        },
      },
      branches: ["default"],
      characters: [],
    });
    getList();
    setNovellName("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.novell_list}>
        {novellArray?.map((item, index) => (
          <div className={styles.novell_card}>
            {item.name}
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
        >
          <Input
            placeholder="Enter novell name"
            value={novellName}
            onChange={(e) => setNovellName(e.currentTarget.value)}
          />
          <Icons.ui.Plus onClick={createNovell} />
        </div>
        <Preview large />
      </div>
    </div>
  );
};
