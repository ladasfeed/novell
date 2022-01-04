import { useDispatch } from "react-redux";
import { editorSlice } from "store/state/editor";
import { NodeToolButton } from "components/ui/NodeToolButton";
import { nodeServiceFactory } from "components/pages/editor/helpers/nodeServiceFactory";
import AudioCaseEditor from "./audioCaseEditor";

export default nodeServiceFactory({
  nodeButtonParams: {
    variantOrIcon: "sound",
    reduxActionToOpen: editorSlice.actions.setIsEditingAudio,
  },
  service: AudioCaseEditor,
});
