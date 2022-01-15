import { Elements, FlowElement } from "react-flow-renderer";

export const changeFlowElement = (
  elements: Elements,
  id: string,
  setValue: (value: FlowElement) => FlowElement
): Elements => {
  return elements.map((item) => {
    return item.id == id ? setValue(item) : item;
  });
};
