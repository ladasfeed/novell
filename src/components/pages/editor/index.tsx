import React, { useCallback, useContext, useState } from "react";
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  Elements,
  FlowElement,
  ReactFlowProvider,
  removeElements,
} from "react-flow-renderer";
import styles from "./index.module.css";
import { CustomNodeDefault } from "components/pages/editor/customNodes/default";
import { FlowProvider } from "./flow context";

type EdgeUnionType = Edge<any> | Connection;

const initialElements: Array<FlowElement> = [
  {
    id: "3",
    type: "customNodeDefault",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
];

const nodeTypes = {
  customNodeDefault: CustomNodeDefault,
};

let rerenderCounter = 0;

export const Editor = () => {
  const [elements, setElements] = useState(initialElements);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Handlers
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params: EdgeUnionType) =>
    setElements((els) => addEdge(params, els));

  const addNewNode = () => {
    setElements((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        type: "customNodeDefault",
        data: { text: "Custom text..." },
        position: { x: 500, y: 600 },
      },
    ]);
  };

  const onLoad = useCallback(
    (rfi) => {
      if (!reactFlowInstance) {
        setReactFlowInstance(rfi);
      }
    },
    [reactFlowInstance]
  );
  rerenderCounter++;
  console.log(rerenderCounter);

  return (
    <div className={styles.container}>
      <ReactFlowProvider>
        <FlowProvider.Provider
          value={{
            setElements: setElements,
          }}
        >
          <ReactFlow
            nodeTypes={nodeTypes}
            onLoad={onLoad}
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
          >
            <div
              style={{
                zIndex: 100,
                position: "relative",
              }}
              onClick={addNewNode}
            >
              Add node
            </div>
          </ReactFlow>
        </FlowProvider.Provider>
      </ReactFlowProvider>
    </div>
  );
};
