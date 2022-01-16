import React, { memo } from "react";
import { Position, Node } from "react-flow-renderer";
import { nodesServices } from "components/modules/editor/nodesServices";
import { ReactFlowNode } from "components/ui/Node";
import { reactFlowNodeType } from "types";
import { NodeServiceConnector } from "components/modules/editor/helpers/nodeServiceFactory";

const services = [
  nodesServices.nodeImageService,
  nodesServices.nodeAudioService,
  nodesServices.nodeCharacterService,
  nodesServices.nodeTextService,
  nodesServices.removeNodeService,
  nodesServices.systemNodeService,
  nodesServices.copyNodeService,
];

export const CustomNodeDefault = memo(
  ({
    isConnectable,
    ...nodeProps
  }: reactFlowNodeType & {
    isConnectable: boolean;
    xPos: number;
    yPos: number;
  }) => {
    return (
      <ReactFlowNode
        isRootNode={nodeProps.data?.isRootNode}
        isEndNode={nodeProps.data?.isEndNode}
        imageId={nodeProps.data?.imgId}
      >
        <ReactFlowNode.Handle
          type="target"
          position={Position.Top}
          id="default"
          isConnectable={isConnectable}
        />
        <ReactFlowNode.Tools>
          <NodeServiceConnector services={services} nodeProps={nodeProps} />
        </ReactFlowNode.Tools>
        <ReactFlowNode.Handle
          type="source"
          id={nodeProps.data?.branch || "default"}
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
      </ReactFlowNode>
    );
  }
);
