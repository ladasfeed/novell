import { useDispatch } from "react-redux";
import { editorSlice } from "store/state/editor";
import { NodeToolButton } from "components/ui/NodeToolButton/index";

export const NodeChangeBgButton = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const changeBg = () => {
    dispatch(editorSlice.actions.setCurrentOpenedNode(id));
  };

  return <NodeToolButton onClick={changeBg} variant="image" />;
};
