import React, { useContext } from "react";
import { FlowElement } from "react-flow-renderer";

export const FlowProvider = React.createContext<{
  setElements: React.Dispatch<React.SetStateAction<FlowElement<any>[]>> | null;
}>({
  setElements: null,
});
export const useFlowContext = () => useContext(FlowProvider);
