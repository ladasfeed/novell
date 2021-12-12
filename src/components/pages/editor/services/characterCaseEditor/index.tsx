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
import ReactSelect from "react-select";

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
      elements.find((el) => el.id == nodeId)?.data.characterCases || []
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

  const changeCaseState = (characterId: string, stateName: string) => {
    setCharacterCases((prev) => {
      return prev.map((item) =>
        item.character.id == characterId
          ? {
              ...item,
              stateName: stateName,
            }
          : item
      );
    });
  };

  const changeCasePosition = (characterId: string, pos: "left" | "right") => {
    setCharacterCases((prev) => {
      return prev.map((item) =>
        item.character.id == characterId
          ? {
              ...item,
              position: pos,
            }
          : item
      );
    });
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
              <div className={styles.character_case__state_name}>
                State name:{" "}
                <ReactSelect
                  onChange={(v) => changeCaseState(item.character.id, v!.value)}
                  options={item.character.states.map((state) => ({
                    label: state.name,
                    value: state.name,
                  }))}
                />
              </div>
              <div className={styles.character_case__state_name}>
                Position:{" "}
                <ReactSelect
                  onChange={(v) =>
                    changeCasePosition(
                      item.character.id,
                      v!.value as "left" | "right"
                    )
                  }
                  options={[
                    {
                      value: "left",
                      label: "left",
                    },
                    {
                      value: "right",
                      label: "right",
                    },
                  ]}
                />
              </div>
            </div>
          ))}
          <Button onClick={saveHandler}>Save</Button>
        </div>
      </div>
    </Popup>
  );
};
