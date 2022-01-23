import React, { useContext } from "react";
import { Elements, FlowElement } from "react-flow-renderer";
import { nodeDataType } from "types";

export type contextElementsType = Array<
  FlowElement<nodeDataType> & {
    target?: string;
    source?: string;
  }
>;

export const FlowProvider = React.createContext<{
  setElements: React.Dispatch<
    React.SetStateAction<FlowElement<nodeDataType>[]>
  > | null;
  elements: contextElementsType;
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
