import React, { useContext } from "react";
import { Elements, FlowElement } from "react-flow-renderer";

export const FlowProvider = React.createContext<{
  setElements: React.Dispatch<React.SetStateAction<FlowElement<any>[]>> | null;
  elements: Elements;
  instance: any;
}>({
  setElements: null,
  elements: [] as Elements,
  instance: {},
});
export const useFlowContext = () => useContext(FlowProvider);
