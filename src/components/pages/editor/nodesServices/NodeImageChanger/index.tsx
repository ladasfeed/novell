import { nodeServiceFactory } from "components/pages/editor/helpers/nodeServiceFactory";
import ImageCaseEditor from "components/pages/editor/nodesServices/NodeImageChanger/imageCaseEditor";
import { editorSlice } from "store/state/editor";

export default nodeServiceFactory({
  service: ImageCaseEditor,
  nodeButtonParams: {
    variantOrIcon: "image",
    action: (dispatch) => dispatch(editorSlice.actions.setPopupState("image")),
  },
});
