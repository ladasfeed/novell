import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { Toolbar } from "components/pages/editor/toolbar";

type EdgeUnionType = Edge<any> | Connection;

export const initialElements: Array<FlowElement> = [
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
let id = 0;
const getId = () => `dndnode_${id++}`;

export const Editor = () => {
  const [elements, setElements] = useState(initialElements);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
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

  const onLoad = useCallback(
    (rfi) => {
      if (!reactFlowInstance) {
        setReactFlowInstance(rfi);
      }
    },
    [reactFlowInstance]
  );

  rerenderCounter++;

  useEffect(() => {
    const restored = lsController.get("elements");
    console.log(restored);
    if (restored) {
      setElements(restored.elements);
    }
  }, []);

  const onDrop = (event: any) => {
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
      data: { text: `${type} node` },
    };

    setElements((es) => es.concat(newNode));
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <>
      <div className={styles.container}>
        <ReactFlowProvider>
          <FlowProvider.Provider
            value={{
              setElements,
              elements,
            }}
          >
            <div className={styles.rf_wrapper} ref={reactFlowWrapper}>
              <ReactFlow
                nodeTypes={nodeTypes}
                onLoad={onLoad}
                onDrop={onDrop}
                onDragOver={onDragOver}
                elements={elements}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
              >
                <Toolbar />
              </ReactFlow>
            </div>
          </FlowProvider.Provider>
        </ReactFlowProvider>
      </div>
      <Preview />
    </>
  );
};
