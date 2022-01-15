import React from "react";
import { nodeServiceFactory } from "components/modules/editor/helpers/nodeServiceFactory";
import CharacterCaseEditor from "components/modules/editor/nodesServices/CharacterChanger/characterCaseEditor";
import styles from "./characterCaseEditor/index.module.css";

export default nodeServiceFactory({
  Service: CharacterCaseEditor,
  nodeButtonParams: {
    variantOrIcon: "character",
  },
  popupProps: {
    className: styles.popup,
  },
  serviceName: "character",
});
