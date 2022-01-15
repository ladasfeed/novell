import React, { memo, useEffect, useState } from "react";
import { Handle, Position, useUpdateNodeInternals } from "react-flow-renderer";
import styles from "components/modules/editor/customNodes/splitter/index.module.css";
import { useFlowContext } from "components/modules/editor/flow context";
import { UiElementContainer } from "components/ui/UiContainer";
import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { Input } from "components/ui/Input";
import { Button } from "components/ui/Button";
import { nodesServices } from "components/modules/editor/nodesServices";
import { ReactFlowNode } from "components/ui/Node";
import {
  flowDefaultNodeType,
  flowNodeBaseType,
  reactFlowNodeType,
} from "types";

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
    }, [nodeProps.data?.branches]);

    return (
      <ReactFlowNode imageId={nodeProps?.data?.imgId}>
        <ReactFlowNode.Handle
          type="target"
          position={Position.Top}
          id={nodeProps?.data?.branch || ""}
          isConnectable={isConnectable}
        />
        <ReactFlowNode.Tools>
          {services.map((item) => {
            return React.createElement(item.NodeButton, { node: nodeProps });
          })}
        </ReactFlowNode.Tools>

        <div
          style={{
            position: "relative",
          }}
        >
          {nodeProps?.data?.branches?.map((item: any, index: number) => (
            <div style={{ left: index * 50 }} className={styles.handle_wrapper}>
              <h3 className={styles.handle_wrapper__text}>{item}</h3>
              <ReactFlowNode.Handle
                type="source"
                position={Position.Bottom}
                id={item}
                isConnectable={isConnectable}
              />
            </div>
          ))}
        </div>
      </ReactFlowNode>
    );

    return (
      <div
        style={
          {
            // backgroundImage: `url(${data.img})`,
          }
        }
        className={styles.container}
      >
        <Handle
          type="target"
          position={Position.Top}
          className={styles.handle}
          isConnectable={isConnectable}
        />
        <div className={styles.dark_layer} />
        <div className={styles.tools_layer}>
          <div className={styles.tools__header}>
            <div className={styles.tools__buttons}>
              {services.map((item) => {
                return React.createElement(item.NodeButton, {
                  node: nodeProps,
                });
              })}
            </div>
          </div>
        </div>
        {nodeProps?.data?.branches?.map((item: any, index: number) => (
          <div style={{ left: index * 150 }} className={styles.handle_wrapper}>
            <h3 className={styles.handle_wrapper__text}>{item}</h3>
            <Handle
              className={styles.handle}
              type="source"
              position={Position.Bottom}
              id={item}
              isConnectable={isConnectable}
            />
          </div>
        ))}
      </div>
    );
  }
);
