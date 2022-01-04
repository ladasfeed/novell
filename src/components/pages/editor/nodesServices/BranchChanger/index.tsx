import { editorSlice } from "store/state/editor";
import React from "react";
import { nodeServiceFactory } from "components/pages/editor/helpers/nodeServiceFactory";
import BranchCaseEditor from "./branchCaseEditor";

export default nodeServiceFactory({
  service: BranchCaseEditor,
  nodeButtonParams: {
    variantOrIcon: "branch",
    reduxActionToOpen: editorSlice.actions.setEditingBranches,
  },
});
