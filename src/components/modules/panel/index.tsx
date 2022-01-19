import styles from "./index.module.css";
import { novellApi } from "api/novell";
import { useEffect, useState } from "react";
import { lsController } from "store/ls";
import { NovellType } from "types";
import { useNavigate } from "react-router-dom";
import { routes } from "routes";
import { useDispatch } from "react-redux";
import { editorSlice } from "store/state/editor";
import { Icons } from "assets/icons";

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

  const selectNovell = (index: number) => {
    const novell = novellArray[index];
    dispatch(editorSlice.actions.setBranches(novell.branches));
    dispatch(editorSlice.actions.setChapters(novell.chapters));
    dispatch(editorSlice.actions.setCharacters(novell.characters));
    lsController.set("novellId", novell._id as string);

    push(routes.editor);
  };

  const createNovell = async () => {
    const res = await novellApi.create({
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

  return (
    <div className={styles.container}>
      <div className={styles.novell_list}>
        {novellArray?.map((item, index) => (
          <div
            className={styles.novell_card}
            onClick={() => selectNovell(index)}
          >
            {item._id}
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
      </div>
    </div>
  );
};
