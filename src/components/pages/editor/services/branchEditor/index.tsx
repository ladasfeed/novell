import { Popup } from "components/ui/Popup";
import { useEffect, useState } from "react";
import { Button } from "components/ui/Button";
import { RSKHooks } from "react-dev-starter-pack/dist";
import { lsController } from "store/ls";
import { UiElementContainer } from "components/ui/UiContainer";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";

export const BranchEditor = () => {
  const [isOpened, toggleOpen] = RSKHooks.useToggle(false);
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();
  const branches = useSelector(editorSliceSelectors.getBranches);

  const updateBranches = () => {
    dispatch(editorSlice.actions.setBranches([...branches, inputText]));
    setInputText("");
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
      <Button onClick={toggleOpen}>Branch Editor</Button>
      <Popup isOpened={isOpened} setIsOpened={toggleOpen}>
        <input
          onChange={(e) => setInputText(e.currentTarget.value)}
          type="text"
        />
        <Button onClick={updateBranches}>Save</Button>
        {branches?.map((item) => (
          <UiElementContainer>
            {item} <span onClick={() => removeBranch(item)}>X</span>
          </UiElementContainer>
        ))}
      </Popup>
    </>
  );
};
