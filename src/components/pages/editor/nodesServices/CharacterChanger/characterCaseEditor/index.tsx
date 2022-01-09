import { Popup } from "components/ui/Popup";
import { useAppDispatch } from "store/state";
import { useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { UiElementContainer } from "components/ui/UiContainer";
import React, { useEffect, useState } from "react";
import { characterCaseType, characterType } from "types";
import styles from "components/pages/editor/nodesServices/CharacterChanger/characterCaseEditor/index.module.css";
import { Title } from "components/ui/Title";
import { useFlowContext } from "components/pages/editor/flow context";
import { Button } from "components/ui/Button";
import { ReactSelect } from "components/ui/ReactSelect";

export default () => {
  const dispatch = useAppDispatch();
  const isEditingCharacterCase = useSelector(
    editorSliceSelectors.getIsEditingCharacter
  );
  const toggle = () => {
    dispatch(editorSlice.actions.setEditingCharacterState(false));
  };

  return (
    <Popup
      title="Characters"
      className={styles.popup}
      isOpened={isEditingCharacterCase}
      setIsOpened={toggle}
    >
      <CharacterCaseEditorInner />
    </Popup>
  );
};

const CharacterCaseEditorInner = () => {
  const dispatch = useAppDispatch();
  const { changeElement, elements } = useFlowContext();
  const nodeId = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const characters = useSelector(editorSliceSelectors.getCharacters);
  const [characterCases, setCharacterCases] = useState<
    Array<characterCaseType>
  >([]);

  useEffect(() => {
    setCharacterCases(
      elements.find((el) => {
        return el.id == nodeId;
      })?.data?.characterCases || []
    );
  }, []);

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

  const removeCase = (characterId: string) => {
    setCharacterCases((prev) => {
      return prev.filter((item) => {
        return item.character.id != characterId;
      });
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.character_list}>
        <Title color="black" rectForm="mrBot">
          Characters:{" "}
        </Title>

        {characters.map((item) => (
          <UiElementContainer
            className={styles.character_list__item}
            onClick={() => createCharacterCase(item)}
          >
            {item.name}
          </UiElementContainer>
        ))}
      </div>
      <div className={styles.character_cases_list}>
        {characterCases?.map((item) => (
          <UiElementContainer className={styles.character_case}>
            <div className={styles.character_case__header}>
              <div>
                Name: <b>{item.character.name}</b>
              </div>
              <div onClick={() => removeCase(item.character.id)}>X</div>
            </div>
            <div className={styles.character_case__controls}>
              State name:{" "}
              <ReactSelect
                onChange={(v: any) =>
                  changeCaseState(item.character.id, v.value)
                }
                defaultValue={{
                  value: item.stateName,
                  label: item.stateName,
                }}
                options={characters
                  .find((ch) => ch.id == item.character.id)
                  ?.states.map((state) => ({
                    label: state.name,
                    value: state.name,
                  }))}
              />
            </div>
            <div className={styles.character_case__controls}>
              Position:{" "}
              <ReactSelect
                onChange={(v: any) =>
                  changeCasePosition(
                    item.character.id,
                    v!.value as "left" | "right"
                  )
                }
                defaultValue={{
                  value: item.position,
                  label: item.position,
                }}
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
          </UiElementContainer>
        ))}
        <Button onClick={saveHandler}>Save</Button>
      </div>
    </div>
  );
};
