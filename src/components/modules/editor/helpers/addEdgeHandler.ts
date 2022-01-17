import { addEdge, Elements } from "react-flow-renderer";
import { EdgeUnionType } from "types";
import { CSSProperties } from "react";

export const addEdgeHandler = ({
  elements,
  params,
  labelStyle = { fill: "black", fontWeight: 700 },
  label,
}: {
  elements: Elements<any>;
  params: EdgeUnionType;
  label?: string;
  labelStyle?: CSSProperties;
}) => {
  return addEdge(
    {
      ...params,
      label: label || params.sourceHandle,
      labelStyle,
    },
    elements
  );
};
