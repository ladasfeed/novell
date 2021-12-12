import React, { useContext } from "react";
import { Elements, FlowElement } from "react-flow-renderer";

export const FlowProvider = React.createContext<{
  setElements: React.Dispatch<React.SetStateAction<FlowElement<any>[]>> | null;
  elements: Elements;
  changeElement: (id: string, fn: (value: FlowElement) => FlowElement) => void;
  instance: any;
}>({
  setElements: null,
  elements: [] as Elements,
  changeElement: (v, s) => null,
  instance: {},
});
export const useFlowContext = () => useContext(FlowProvider);
