import { editorSlice } from "store/state/editor";
import React from "react";
import { nodeServiceFactory } from "components/pages/editor/helpers/nodeServiceFactory";
import CharacterCaseEditor from "./characterCaseEditor";

export default nodeServiceFactory({
  service: CharacterCaseEditor,
  nodeButtonParams: {
    variantOrIcon: "character",
    reduxActionToOpen: editorSlice.actions.setEditingCharacterState,
  },
});
