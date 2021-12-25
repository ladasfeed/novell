import { useDispatch } from "react-redux";
import { editorSlice } from "store/state/editor";
import { NodeToolButton } from "components/ui/NodeToolButton";

export const NodeAudioChanger = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const changeBg = () => {
    dispatch(editorSlice.actions.setCurrentOpenedNode(id));
    dispatch(editorSlice.actions.setIsEditingAudio(true));
  };

  return <NodeToolButton onClick={changeBg} variant="sound" />;
};
