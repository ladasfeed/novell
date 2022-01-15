import React from "react";
import { nodeServiceFactory } from "components/modules/editor/helpers/nodeServiceFactory";
import NodeTextEditor from "components/modules/editor/nodesServices/NodeTextChanger/editor";

export default nodeServiceFactory({
  Service: NodeTextEditor,
  nodeButtonParams: {
    variantOrIcon: "text",
  },
  serviceName: "text",
});
