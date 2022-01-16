import React, { useContext } from "react";
import { Elements, FlowElement } from "react-flow-renderer";
import { nodeDataType } from "types";

export const FlowProvider = React.createContext<{
  setElements: React.Dispatch<React.SetStateAction<FlowElement<any>[]>> | null;
  elements: Array<
    FlowElement<nodeDataType> & {
      target?: string;
      source?: string;
    }
  >;
  changeElement: (
    id: string,
    fn: (value: FlowElement<nodeDataType>) => FlowElement<nodeDataType>
  ) => void;
  instance: any;
}>({
  setElements: null,
  elements: [] as Elements,
  changeElement: (v, s) => null,
  instance: {},
});
export const useFlowContext = () => useContext(FlowProvider);
