import { nodeServiceFactory } from "components/modules/editor/helpers/nodeServiceFactory";
import AudioCaseEditor from "components/modules/editor/nodesServices/AudioChanger/audioCaseEditor";

export default nodeServiceFactory({
  nodeButtonParams: {
    variantOrIcon: "sound",
  },
  Service: AudioCaseEditor,
  serviceName: "audio",
});
