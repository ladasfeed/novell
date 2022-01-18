import React, { memo, useEffect } from "react";
import { Handle, Position, useUpdateNodeInternals } from "react-flow-renderer";
import styles from "components/modules/editor/customNodes/splitter/index.module.css";
import { nodesServices } from "components/modules/editor/nodesServices";
import { ReactFlowNode } from "components/ui/Node";
import { reactFlowNodeType } from "types";
import { NodeServiceConnector } from "components/modules/editor/helpers/nodeServiceFactory";

const services = [
  nodesServices.nodeImageService,
  nodesServices.nodeAudioService,
  nodesServices.nodeCharacterService,
  nodesServices.nodeBranchService,
  nodesServices.removeNodeService,
];

export const SplitterNode = memo(
  ({
    isConnectable,
    ...nodeProps
  }: reactFlowNodeType & {
    isConnectable: boolean;
  }) => {
    const upd = useUpdateNodeInternals();

    useEffect(() => {
      upd(nodeProps.id);
    }, [nodeProps.data?.splitterData]);

    return (
      <ReactFlowNode imageId={nodeProps?.data?.imgId}>
        <ReactFlowNode.Handle
          type="target"
          position={Position.Top}
          id={nodeProps?.data?.branch || ""}
          isConnectable={isConnectable}
        />
        <ReactFlowNode.Tools>
          <NodeServiceConnector services={services} nodeProps={nodeProps} />
        </ReactFlowNode.Tools>

        <div
          style={{
            position: "relative",
          }}
        >
          {nodeProps?.data?.splitterData?.outputs?.map(
            (item, index: number) => (
              <div
                style={{ left: index * 50 }}
                className={styles.handle_wrapper}
              >
                <h3 className={styles.handle_wrapper__text}>{item.branch}</h3>
                <ReactFlowNode.Handle
                  type="source"
                  position={Position.Bottom}
                  id={nodeProps.id + "-Splitter-" + String(item.id)}
                  isConnectable={isConnectable}
                />
              </div>
            )
          )}
        </div>
      </ReactFlowNode>
    );
  }
);
