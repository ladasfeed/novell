import React, { useContext } from "react";
import { Elements, FlowElement } from "react-flow-renderer";
import { flowDefaultNodeType } from "types";

export const FlowProvider = React.createContext<{
  setElements: React.Dispatch<React.SetStateAction<FlowElement<any>[]>> | null;
  elements: Elements<flowDefaultNodeType>;
  changeElement: (
    id: string,
    fn: (
      value: FlowElement<flowDefaultNodeType>
    ) => FlowElement<flowDefaultNodeType>
  ) => void;
  instance: any;
}>({
  setElements: null,
  elements: [] as Elements,
  changeElement: (v, s) => null,
  instance: {},
});
export const useFlowContext = () => useContext(FlowProvider);
