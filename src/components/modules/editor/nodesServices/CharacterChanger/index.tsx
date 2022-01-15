import React from "react";
import { nodeServiceFactory } from "components/modules/editor/helpers/nodeServiceFactory";
import CharacterCaseEditor from "components/modules/editor/nodesServices/CharacterChanger/characterCaseEditor";

export default nodeServiceFactory({
  Service: CharacterCaseEditor,
  nodeButtonParams: {
    variantOrIcon: "character",
  },
  serviceName: "character",
});
