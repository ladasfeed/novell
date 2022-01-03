import { Popup } from "components/ui/Popup";
import { useEffect, useState } from "react";
import { Button } from "components/ui/Button";
import { RSKHooks } from "react-dev-starter-pack/dist";
import { lsController } from "store/ls";
import { UiElementContainer } from "components/ui/UiContainer";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { Input } from "components/ui/Input";
import styles from "./index.module.css";
import { Icons } from "assets/icons";
import { ToolButton } from "components/ui/ToolButton";

export const BranchEditor = () => {
  const [isOpened, toggleOpen] = RSKHooks.useToggle(false);
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();
  const branches = useSelector(editorSliceSelectors.getBranches);

  const updateBranches = () => {
    if (inputText) {
      dispatch(editorSlice.actions.setBranches([...branches, inputText]));
      setInputText("");
    }
  };
  const removeBranch = (name: string) => {
    const oldBranches = [...branches].filter((i) => i != name);
    dispatch(editorSlice.actions.setBranches(oldBranches));
  };

  useEffect(() => {
    const lsBranches = lsController.get("branches");
    if (lsBranches) {
      dispatch(editorSlice.actions.setBranches(lsBranches));
    }
  }, []);

  return (
    <>
      <ToolButton
        title="branch"
        onClick={toggleOpen}
        icon={<Icons.ui.BranchEditor />}
      />
      <Popup
        title="Branches editor"
        isOpened={isOpened}
        setIsOpened={toggleOpen}
      >
        <div className={styles.create}>
          <Input
            value={inputText}
            placeholder="Branch name..."
            className={styles.input}
            onChange={(e) => setInputText(e.currentTarget.value)}
            type="text"
          />
          <Icons.ui.Plus onClick={updateBranches} />
        </div>

        <div className={styles.branches__list}>
          {branches?.map((item) => (
            <UiElementContainer className={styles.branches__list_item}>
              {item}{" "}
              <span onClick={() => removeBranch(item)}>
                <Icons.ui.Plus
                  style={{
                    transform: "rotateZ(45deg)",
                  }}
                />
              </span>
            </UiElementContainer>
          ))}
        </div>
      </Popup>
    </>
  );
};
