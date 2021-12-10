import { Popup } from "components/ui/Popup";
import { useState } from "react";
import styles from "./index.module.css";
import { Button } from "components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  characterType,
  editorSlice,
  editorSliceSelectors,
} from "store/state/editor";
import { RSKHooks } from "react-dev-starter-pack/dist";

export const CharacterEditor = () => {
  const [isOpened, toggleOpen] = RSKHooks.useToggle(false);
  const [inputText, setInputText] = useState("");
  const [inputCaseText, setInputCaseText] = useState("");
  const dispatch = useDispatch();
  const [currentCharacter, setCurrentCharacter] =
    useState<characterType | null>();
  const characters = useSelector(editorSliceSelectors.getCharacters);

  const createCharacter = () => {
    dispatch(
      editorSlice.actions.addNewCharacter({
        cases: [],
        name: inputText,
        id: String(characters.length + 1),
      })
    );
  };

  const addCaseToCharacter = () => {
    if (currentCharacter) {
      dispatch(
        editorSlice.actions.addCharacterCase({
          id: currentCharacter.id,
          case: {
            name: inputCaseText,
            fileId: "",
          },
        })
      );
    }
  };

  return (
    <>
      <Button onClick={toggleOpen}>Edit character</Button>
      <Popup isOpened={isOpened} setIsOpened={toggleOpen}>
        <div>
          <div className={styles.create}>
            <input
              onChange={(e) => setInputText(e.currentTarget.value)}
              type="text"
            />
            <Button onClick={createCharacter}>Save</Button>
          </div>
          <div className={styles.characters}>
            <div className={styles.characters_list}>
              {characters.map((item) => (
                <div onClick={() => setCurrentCharacter(item)}>{item.name}</div>
              ))}
            </div>
            {currentCharacter && (
              <div className={styles.character_editor}>
                EDIT
                <div>{currentCharacter?.name}</div>
                <input
                  onChange={(e) => setInputCaseText(e.currentTarget.value)}
                  type="text"
                />
                <Button onClick={addCaseToCharacter}>Save</Button>
              </div>
            )}
          </div>
        </div>
      </Popup>
    </>
  );
};
