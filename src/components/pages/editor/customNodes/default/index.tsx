import React, { memo } from "react";
import { Position } from "react-flow-renderer";
import { nodesServices } from "components/pages/editor/nodesServices";
import { ReactFlowNode } from "components/ui/Node";
import { flowDefaultNodeType } from "types";

const services = [
  nodesServices.nodeImageService,
  nodesServices.nodeAudioService,
  nodesServices.nodeCharacterService,
  nodesServices.nodeTextService,
  nodesServices.removeNodeService,
];

export const CustomNodeDefault = memo(
  ({
    data,
    isConnectable,
    id,
  }: {
    data: flowDefaultNodeType;
  } & {
    [key: string]: any;
  }) => {
    return (
      <ReactFlowNode imageId={data.imgId}>
        <ReactFlowNode.Handle
          type="target"
          position={Position.Top}
          id="default"
          isConnectable={isConnectable}
        />
        <ReactFlowNode.Tools>
          {services.map((item) => {
            return React.createElement(item.NodeButton, { id });
          })}
        </ReactFlowNode.Tools>
        <ReactFlowNode.Handle
          type="source"
          id={data.branch || "default"}
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
      </ReactFlowNode>
    );
  }
);
