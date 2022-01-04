import { CustomNodeDefault } from "components/pages/editor/customNodes/default";
import { SplitterNode } from "components/pages/editor/customNodes/splitter";
import CustomEdge from "components/pages/editor/customNodes/edge";

export const nodeTypesMap = {
  customNodeDefault: CustomNodeDefault,
  splitterNode: SplitterNode,
};

export const edgeTypesMap = {
  custom: CustomEdge,
};
