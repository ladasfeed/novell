import { editorSlice } from "store/state/editor";
import React from "react";
import { nodeServiceFactory } from "components/pages/editor/helpers/nodeServiceFactory";
import NodeTextEditor from "./editor";

export default nodeServiceFactory({
  service: NodeTextEditor,
  nodeButtonParams: {
    reduxActionToOpen: editorSlice.actions.setIsEditingNodeText,
    variantOrIcon: "settings",
  },
});
