import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  Elements,
  FlowElement,
  isEdge,
  isNode,
  ReactFlowProvider,
  removeElements,
} from "react-flow-renderer";
import styles from "./index.module.css";
import { CustomNodeDefault } from "components/pages/editor/customNodes/default";
import { FlowProvider } from "./flow context";
import { SplitterNode } from "components/pages/editor/customNodes/splitter";
import { Preview } from "components/pages/editor/services/preview";
import { Button } from "components/ui/Button";
import { BranchEditor } from "components/pages/editor/services/branchEditor";
import { ImageEditor } from "components/pages/editor/services/imageEditor";
import { lsController } from "store/ls";
import { ImageCaseEditor } from "components/pages/editor/services/imageCaseEditor";

type EdgeUnionType = Edge<any> | Connection;

const initialElements: Array<FlowElement> = [
  {
    id: "0",
    type: "customNodeDefault",
    data: { text: "Root node", root: true },
    position: { x: 250, y: 250 },
  },
];

const nodeTypes = {
  customNodeDefault: CustomNodeDefault,
  splitterNode: SplitterNode,
};

let rerenderCounter = 0;

const compile = (elements: Array<any>) => {
  const nodes: Array<any> = elements.filter(isNode);
  const edges: Array<any> = elements.filter(isEdge);
  let nodesTree: Array<any> = [];

  nodes.forEach((node) => {
    let newNode = { ...node };
    let nodesEdgesOutput = edges.filter((edge) => edge.source == newNode.id);
    let nodesEdgesInput = edges.filter((edge) => edge.target == newNode.id);

    newNode.branch = newNode.data.branch || nodesEdgesInput?.[0]?.sourceHandle;
    if (!nodesEdgesOutput.length) {
      nodesTree.push(newNode);
      return;
    }

    if (nodesEdgesOutput.length == 1) {
      newNode.next = nodesEdgesOutput[0].target;
    } else {
      newNode.next = {};
      nodesEdgesOutput.forEach((edge) => {
        newNode.next[edge.sourceHandle] = edge.target;
      });
    }
    nodesTree.push(newNode);
  });
  console.log(nodesTree);

  return nodesTree;
};

export const Editor = () => {
  const [elements, setElements] = useState(initialElements);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [compiled, setCompiled] = useState<Array<any>>([]);

  console.log(elements);

  // Handlers
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params: EdgeUnionType) => {
    setElements((els) =>
      addEdge(params, els).map((item) => {
        return params.target == item.id
          ? {
              ...item,
              data: { ...item.data, branch: params.sourceHandle },
            }
          : item;
      })
    );
  };

  const addNewNode = (nodeType: string) => {
    setElements((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        type: nodeType,
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

  const compliedHandler = () => {
    setCompiled(compile(elements));
  };

  const saveHandler = () => {
    // @ts-ignore
    const saved = reactFlowInstance.toObject();
    lsController.set("elements", saved);
  };

  useEffect(() => {
    const restored = lsController.get("elements");
    console.log(restored);
    if (restored) {
      setElements(restored.elements);
    }
  }, []);

  return (
    <>
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
              <div className={styles.toolbar}>
                <Button onClick={() => addNewNode("customNodeDefault")}>
                  Add node
                </Button>
                <Button onClick={() => addNewNode("splitterNode")}>
                  Add splitter
                </Button>
                <Button onClick={compliedHandler}>Compile</Button>
                <BranchEditor />
                <ImageEditor />
                <ImageCaseEditor />
                <Button onClick={saveHandler}>Save</Button>
              </div>
            </ReactFlow>
          </FlowProvider.Provider>
        </ReactFlowProvider>
      </div>
      <Preview tree={compiled} />
    </>
  );
};
