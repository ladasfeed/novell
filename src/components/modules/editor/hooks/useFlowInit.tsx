import {
  addEdge,
  ArrowHeadType,
  Elements,
  FlowElement,
  removeElements,
} from "react-flow-renderer";
import { EdgeUnionType } from "types";
import { useCallback } from "react";
import { changeFlowElement } from "components/modules/editor/helpers/changeElement";
import { addEdgeHandler } from "components/modules/editor/helpers/addEdgeHandler";

export const useFlowInit = ({
  reactFlowInstance,
  setReactFlowInstance,
  setElements,
}: {
  setElements: React.Dispatch<React.SetStateAction<FlowElement<any>[]>>;
  reactFlowInstance: any;
  setReactFlowInstance: any;
}) => {
  // Handlers
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params: EdgeUnionType) => {
    setElements((els) =>
      addEdgeHandler({
        elements: els,
        params: params,
      }).map((item) => {
        return params.target == item.id
          ? {
              ...item,
              data: {
                ...item.data,
                branch: params.sourceHandle,
                branches: [params.sourceHandle],
              },
            }
          : item;
      })
    );
  };

  const onLoad = useCallback(
    (rfi) => {
      if (!reactFlowInstance) {
        setReactFlowInstance(rfi);
      }
    },
    [reactFlowInstance]
  );

  const changeElementHandler = useCallback(
    (id: string, fn: (value: FlowElement) => FlowElement) => {
      if (setElements) {
        setElements((prev) => {
          return changeFlowElement(prev, id, fn);
        });
      }
    },
    []
  );

  return {
    onElementsRemove,
    onConnect,
    onLoad,
    changeElementHandler,
  };
};
