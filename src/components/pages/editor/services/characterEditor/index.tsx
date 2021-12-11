import { Popup } from "components/ui/Popup";
import { useCallback, useEffect, useState } from "react";
import styles from "./index.module.css";
import { Button } from "components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  characterCase,
  characterType,
  editorSlice,
  editorSliceSelectors,
} from "store/state/editor";
import { RSKHooks } from "react-dev-starter-pack/dist";
import { Icons } from "assets/icons";
import { Title } from "components/ui/Title";
import { editorThunks } from "store/state/editor/thunk";
import { useAppDispatch } from "store/state";

export const CharacterEditor = () => {
  const [isOpened, toggleOpen] = RSKHooks.useToggle(false);
  const [inputText, setInputText] = useState("");
  const [inputCaseText, setInputCaseText] = useState("");
  const dispatch = useAppDispatch();
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

  const addImageToCase = useCallback(
    async (e: any, name: string) => {
      if (!currentCharacter) return;
      dispatch(
        editorThunks.uploadImage({
          event: e,
        })
      )
        .unwrap()
        .then((id) => {
          const newCases = currentCharacter!.cases.map((item) => {
            return item.name == name
              ? {
                  name,
                  fileId: id,
                }
              : item;
          });

          dispatch(
            editorSlice.actions.updateCharacter({
              character: {
                ...currentCharacter,
                cases: newCases,
              },
            })
          );
        });
    },
    [currentCharacter]
  );

  useEffect(() => {
    if (currentCharacter) {
      setCurrentCharacter(
        characters.find((ch) => ch.id == currentCharacter.id)
      );
    }
  }, [characters]);

  console.log(currentCharacter);
  return (
    <>
      <Button onClick={toggleOpen}>Edit character</Button>
      <Popup
        className={styles.popup}
        isOpened={isOpened}
        setIsOpened={toggleOpen}
      >
        <div className={styles.editor}>
          <div className={styles.create}>
            <Title noRectLayout color={"white"}>
              Create character
            </Title>
            <input
              className={styles.name_input}
              placeholder={"Enter character's name..."}
              onChange={(e) => setInputText(e.currentTarget.value)}
              type="text"
            />
            <Icons.ui.Plus onClick={createCharacter}>Save</Icons.ui.Plus>
          </div>
          <div className={styles.characters}>
            <div className={styles.characters_list}>
              {characters.map((item) => (
                <div
                  className={styles.characters_list__item}
                  onClick={() => setCurrentCharacter(item)}
                >
                  {item.name}
                </div>
              ))}
            </div>

            {currentCharacter && (
              <div className={styles.character_editor}>
                <div className={styles.character_editor__name}>
                  {currentCharacter?.name}
                </div>

                <h5>Add new state</h5>
                <div className={styles.character_editor__add_state}>
                  <input
                    placeholder={"State name..."}
                    onChange={(e) => setInputCaseText(e.currentTarget.value)}
                    type="text"
                  />
                  <Icons.ui.Plus onClick={addCaseToCharacter}>
                    Save
                  </Icons.ui.Plus>
                </div>

                <div className={styles.character_editor__states}>
                  {currentCharacter.cases.map((item) => {
                    return (
                      <CharacterCase
                        characterCase={item}
                        addImageToCase={addImageToCase}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </Popup>
    </>
  );
};

type CharacterCasePropsType = {
  characterCase: characterCase;
  addImageToCase: (e: any, name: string) => void;
};
const CharacterCase = ({
  characterCase,
  addImageToCase,
}: CharacterCasePropsType) => {
  const images = useSelector(editorSliceSelectors.getImages);
  const [image, setImage] = useState<string | undefined>();
  console.log(images);
  useEffect(() => {
    const newImage = images.find((im) => im.id == characterCase.fileId)?.value;
    console.log(newImage);
    setImage(newImage);
  }, [images, characterCase.fileId]);

  return (
    <label className={styles.character_editor__state}>
      <img
        className={styles.character_editor__state__image}
        src={image}
        alt=""
      />
      <input
        style={{
          display: "none",
        }}
        onChange={(e) => addImageToCase(e, characterCase.name)}
        type="file"
      />
      <h6 className={styles.character_editor__state__name}>
        {characterCase.name}
      </h6>
    </label>
  );
};
