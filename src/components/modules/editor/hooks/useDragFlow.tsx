import React, { useCallback } from "react";
import { FlowElement } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";

export const useDragFlow = ({
  setElements,
  reactFlowInstance,
  reactFlowWrapper,
  elements,
}: {
  reactFlowWrapper: React.MutableRefObject<HTMLDivElement | null>;
  setElements: React.Dispatch<React.SetStateAction<FlowElement<any>[]>>;
  reactFlowInstance: any;
  elements: Array<any>;
}) => {
  const branches = useSelector(editorSliceSelectors.getBranches);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds!.left,
        y: event.clientY - reactFlowBounds!.top,
      });
      const newNode = {
        id: String(elements.length + 1),
        type,
        position,
        data: {
          branch: branches[0],
          act: [],
        },
      };

      setElements((es) => es.concat(newNode));
    },
    [elements, reactFlowWrapper, reactFlowInstance]
  );

  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return {
    onDrop,
    onDragOver,
  };
};
