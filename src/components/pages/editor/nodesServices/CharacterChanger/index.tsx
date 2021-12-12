import { Button } from "components/ui/Button";
import { useAppDispatch } from "store/state";
import { editorSlice } from "store/state/editor";

export const NodeCharacterEditorButton = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

  const openEditor = () => {
    dispatch(editorSlice.actions.setEditingCharacterState(true));
    dispatch(editorSlice.actions.setCurrentOpenedNode(id));
  };

  return <Button onClick={openEditor}>Character</Button>;
};
