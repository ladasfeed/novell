import { nodeServiceFactory } from "components/modules/editor/helpers/nodeServiceFactory";
import ImageCaseEditor from "components/modules/editor/nodesServices/NodeImageChanger/imageCaseEditor";

export default nodeServiceFactory({
  Service: ImageCaseEditor,
  nodeButtonParams: {
    variantOrIcon: "image",
  },
  serviceName: "image",
});
