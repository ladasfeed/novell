import { isEdge, isNode } from "react-flow-renderer";
import { reactFlowNodeType } from "types";

export const compile = (elements: Array<any>) => {
  const nodes: Array<reactFlowNodeType> = elements.filter(isNode);
  const edges: Array<any> = elements.filter(isEdge);
  let nodesTree: Array<any> = [];

  nodes.forEach((node) => {
    let newNode: any = { ...node };
    let nodesEdgesOutput = edges.filter((edge) => edge.source == newNode.id);
    let nodesEdgesInput = edges.filter((edge) => edge.target == newNode.id);

    newNode.branch = newNode.data.branch || nodesEdgesInput?.[0]?.sourceHandle;
    if (!nodesEdgesOutput.length) {
      nodesTree.push(newNode);
      return;
    }

    if (nodesEdgesOutput.length == 1) {
      newNode.next = nodesEdgesOutput[0].target;
    } else {
      newNode.next = {};
      nodesEdgesOutput.forEach((edge) => {
        newNode.next[edge.sourceHandle] = edge.target;
      });
    }
    nodesTree.push(newNode);
  });
  console.log(nodesTree);

  return nodesTree;
};
