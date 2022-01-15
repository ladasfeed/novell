import { Popup } from "components/ui/Popup";
import React, { useCallback, useEffect, useState } from "react";
import styles from "components/modules/editor/services/characterEditor/index.module.css";
import { Button } from "components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { RSKHooks } from "react-dev-starter-pack/dist";
import { Icons } from "assets/icons";
import { Title } from "components/ui/Title";
import { editorThunks } from "store/state/editor/thunk";
import { useAppDispatch } from "store/state";
import { characterStateType, characterType } from "types";
import { Input } from "components/ui/Input";
import { UiElementContainer } from "components/ui/UiContainer";
import { ToolButton } from "components/ui/ToolButton";
import { Img } from "components/ui/Image";
import { baseUrl } from "api";

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
        states: [],
        name: inputText,
        id: String(characters.length + 1),
      })
    );
    setInputText("");
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
          const newCases = currentCharacter!.states.map((item) => {
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
                states: newCases,
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

  return (
    <>
      <ToolButton onClick={toggleOpen} icon={<Icons.ui.CharacterEdit />} />
      <Popup
        title="Characters editor"
        className={styles.popup}
        isOpened={isOpened}
        setIsOpened={toggleOpen}
      >
        <div className={styles.editor}>
          <div className={styles.create}>
            <Title rectForm={"no"} color={"white"}>
              Create character
            </Title>
            <Input
              value={inputText}
              className={styles.name_input}
              placeholder={"Enter character's name..."}
              onChange={(e) => setInputText(e.currentTarget.value)}
              type="text"
            />
            <Icons.ui.Plus onClick={createCharacter} />

            <div className={styles.characters_list}>
              {characters.map((item) => (
                <UiElementContainer
                  key={item.id}
                  className={styles.characters_list__item}
                  onClick={() => setCurrentCharacter(item)}
                >
                  {item.name}
                </UiElementContainer>
              ))}
            </div>
          </div>
          <div className={styles.characters}>
            {currentCharacter && (
              <div className={styles.character_editor}>
                <div className={styles.character_editor__name}>
                  {currentCharacter?.name}
                </div>

                <Title separator color={"white"}>
                  States editor
                </Title>
                <div className={styles.character_editor__add_state}>
                  <Input
                    value={inputCaseText}
                    placeholder={"State name..."}
                    onChange={(e) => setInputCaseText(e.currentTarget.value)}
                    type="text"
                  />
                  <Icons.ui.Plus onClick={addCaseToCharacter} />
                </div>

                <div className={styles.character_editor__states}>
                  {currentCharacter.states.map((item) => {
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
  characterCase: characterStateType;
  addImageToCase: (e: any, name: string) => void;
};
const CharacterCase = ({
  characterCase,
  addImageToCase,
}: CharacterCasePropsType) => {
  const images = useSelector(editorSliceSelectors.getImages);
  const [image, setImage] = useState<string | undefined>();
  useEffect(() => {
    const newImage = images.find((im) => im.id == characterCase.fileId)?.path;
    setImage(baseUrl + newImage);
  }, [images, characterCase.fileId]);

  return (
    <label className={styles.character_editor__state}>
      <Img
        className={styles.character_editor__state__image}
        src={image}
        name={characterCase.name}
      />
      <Input
        style={{
          display: "none",
        }}
        onChange={(e) => addImageToCase(e, characterCase.name)}
        type="file"
      />
    </label>
  );
};
