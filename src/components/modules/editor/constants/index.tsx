import { CustomNodeDefault } from "components/modules/editor/customNodes/default";
import { SplitterNode } from "components/modules/editor/customNodes/splitter";
import CustomEdge from "components/modules/editor/customNodes/edge";

export const nodeTypesMap = {
  customNodeDefault: CustomNodeDefault,
  splitterNode: SplitterNode,
};

export const edgeTypesMap = {
  custom: CustomEdge,
};
