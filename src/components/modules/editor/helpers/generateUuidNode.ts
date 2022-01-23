import { isNode } from "react-flow-renderer";
import { reactFlowNodeType } from "types";
import { contextElementsType } from "components/modules/editor/flow context";

export const generateUuidNode = (elements: contextElementsType) => {
  if (!elements.length) {
    return "0";
  }

  return String(
    Math.max.apply(
      null,
      elements.filter((i) => isNode(i)).map((i) => Number(i.id))
    ) + 1
  );
};
