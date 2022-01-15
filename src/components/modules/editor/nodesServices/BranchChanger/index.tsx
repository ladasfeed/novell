import React from "react";
import { nodeServiceFactory } from "components/modules/editor/helpers/nodeServiceFactory";
import BranchCaseEditor from "components/modules/editor/nodesServices/BranchChanger/branchCaseEditor";

export default nodeServiceFactory({
  Service: BranchCaseEditor,
  nodeButtonParams: {
    variantOrIcon: "branch",
  },
  serviceName: "branches",
});
