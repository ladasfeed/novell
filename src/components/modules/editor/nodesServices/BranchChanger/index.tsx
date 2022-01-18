import React from "react";
import { nodeServiceFactory } from "components/modules/editor/helpers/nodeServiceFactory";
import BranchCaseEditor from "components/modules/editor/nodesServices/BranchChanger/branchCaseEditor";
import styles from "./index.module.css";

export default nodeServiceFactory({
  Service: BranchCaseEditor,
  nodeButtonParams: {
    variantOrIcon: "branch",
  },
  popupProps: {
    className: styles.popup,
  },
  serviceName: "branches",
});
