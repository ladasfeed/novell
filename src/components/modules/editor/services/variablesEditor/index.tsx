import { ToolButton } from "components/ui/ToolButton";
import { Icons } from "assets/icons";
import { Popup } from "components/ui/Popup";
import styles from "components/modules/editor/services/imageEditor/index.module.css";
import { RSKHooks } from "react-dev-starter-pack/dist";
import { Input } from "components/ui/Input";
import { useState } from "react";
import { Button } from "components/ui/Button";
import { set } from "lodash";
import { lsController } from "store/ls";
import { useDispatch } from "react-redux";
import { editorSlice } from "store/state/editor";

export const VariablesEditor = () => {
  const [isOpened, toggleOpen] = RSKHooks.useToggle();
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const [variables, setVariables] = useState<
    Array<{
      name: string;
    }>
  >([]);

  const addVariable = () => {
    setVariables((prev) => {
      return [
        ...prev,
        {
          name: inputValue,
        },
      ];
    });
    setInputValue("");
  };

  const saveHandler = () => {
    dispatch(
      editorSlice.actions.setVariables(variables.map((item) => item.name))
    );
  };

  return (
    <>
      <ToolButton onClick={toggleOpen} icon={<Icons.ui.Compile />} />
      <Popup
        title={"Variables"}
        isOpened={isOpened}
        setIsOpened={toggleOpen}
        className={styles.popup}
      >
        <div>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
          <Button onClick={addVariable}>Save</Button>
        </div>
        <div>
          {variables.map((item) => (
            <div>{item.name}</div>
          ))}
        </div>
        <Button onClick={saveHandler}>Save</Button>
      </Popup>
    </>
  );
};
