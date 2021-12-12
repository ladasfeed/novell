import { Popup } from "components/ui/Popup";
import { useAppDispatch } from "store/state";
import { useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { UiElementContainer } from "components/ui/UiContainer";
import { useEffect, useState } from "react";
import { characterCaseType, characterType } from "types";
import styles from "./index.module.css";
import { Title } from "components/ui/Title";
import { useFlowContext } from "components/pages/editor/flow context";
import { Button } from "components/ui/Button";

export const CharacterCaseEditor = () => {
  const dispatch = useAppDispatch();
  const { changeElement, elements } = useFlowContext();
  const nodeId = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const characters = useSelector(editorSliceSelectors.getCharacters);
  const [characterCases, setCharacterCases] = useState<
    Array<characterCaseType>
  >([]);
  const isEditingCharacterCase = useSelector(
    editorSliceSelectors.getIsEditingCharacter
  );

  // sync
  useEffect(() => {
    setCharacterCases(
      elements.find((el) => el.id == nodeId)?.data.characterCases
    );
  }, [nodeId]);

  const toggle = () => {
    dispatch(editorSlice.actions.setEditingCharacterState(false));
  };

  const createCharacterCase = (character: characterType) => {
    setCharacterCases((prev) => [
      ...prev,
      {
        character: character,
        position: "left",
        stateName: character.states[0].name,
      },
    ]);
  };

  const saveHandler = () => {
    changeElement(nodeId as string, (v) => ({
      ...v,
      data: { ...v.data, characterCases },
    }));
  };

  return (
    <Popup
      className={styles.popup}
      isOpened={isEditingCharacterCase}
      setIsOpened={toggle}
    >
      <div className={styles.wrapper}>
        <div className={styles.character_list}>
          {characters.map((item) => (
            <UiElementContainer onClick={() => createCharacterCase(item)}>
              {item.name}
            </UiElementContainer>
          ))}
        </div>
        <div className={styles.character_cases_list}>
          {characterCases?.map((item) => (
            <div className={styles.character_case}>
              <div>Name: {item.character.name}</div>
              <div>State name: {item.stateName}</div>
              <div>Position: {item.position}</div>
            </div>
          ))}
          <Button onClick={saveHandler}>Save</Button>
        </div>
      </div>
    </Popup>
  );
};
