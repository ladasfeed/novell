import nodeImageService from "components/modules/editor/nodesServices/NodeImageChanger";
import nodeAudioService from "components/modules/editor/nodesServices/AudioChanger";
import nodeCharacterService from "components/modules/editor/nodesServices/CharacterChanger";
import nodeBranchService from "components/modules/editor/nodesServices/BranchChanger";
import nodeTextService from "components/modules/editor/nodesServices/NodeTextChanger";
import removeNodeService from "components/modules/editor/nodesServices/RemoveNode";
import systemNodeService from "components/modules/editor/nodesServices/SystemNodeService";
import copyNodeService from "components/modules/editor/nodesServices/CopyNodeService";

export const nodesServices = {
  nodeImageService,
  nodeAudioService,
  nodeCharacterService,
  nodeBranchService,
  nodeTextService,
  removeNodeService,
  systemNodeService,
  copyNodeService,
};
