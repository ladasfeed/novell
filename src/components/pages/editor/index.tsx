import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Elements,
  FlowElement,
  ReactFlowProvider,
  removeElements,
} from "react-flow-renderer";
import styles from "./index.module.css";
import { FlowProvider } from "./flow context";
import { Preview } from "components/pages/editor/services/preview";
import { Toolbar } from "components/pages/editor/toolbar";
import { changeElement } from "components/pages/editor/helpers/changeElement";
import { EdgeUnionType } from "types";
import { ChaptersSidebar } from "components/pages/editor/services/chapters";
import { useDispatch, useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { StateType } from "store/state";
import { nodeTypesMap } from "components/pages/editor/constants";
//
// export const initialElements: Array<FlowElement> = [
//   ...Array(200)
//     .fill("")
//     .map((item, index) => {
//       return {
//         id: String(index),
//         type: "customNodeDefault",
//         data: { text: "Root node", root: true },
//         position: { x: 250, y: 250 + index * 100 },
//       };
//     }),
//   ...Array(200)
//     .fill("")
//     .map((item, index) => {
//       return {
//         id: String(index + "b"),
//         type: "customNodeDefault",
//         data: { text: "Root node", root: true },
//         position: { x: 600, y: 250 + index * 100 },
//       };
//     }),
//   ...Array(100)
//     .fill("")
//     .map((item, index) => {
//       return {
//         id: String(index + "d"),
//         type: "customNodeDefault",
//         data: { text: "Root node", root: true },
//         position: { x: 1000, y: 250 + index * 300 },
//       };
//     }),
// ];
export const initialElements: Array<FlowElement> = [
  ...Array(100)
    .fill("")
    .map((item, index) => {
      return {
        id: String(index),
        type: "customNodeDefault",
        data: { text: "Root node", root: true },
        position: { x: 250, y: 250 * index },
      };
    }),
];

export const Editor = () => {
  const [elements, setElements] = useState(initialElements);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const compiled = useSelector(editorSliceSelectors.getCompiled);
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const currentChapterName = useSelector(editorSliceSelectors.getChapterName);
  const currentChapter = useSelector(
    (state: StateType) => state.editor.chapters[currentChapterName]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setElements(currentChapter.data);
  }, [currentChapter]);

  // Handlers
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params: EdgeUnionType) => {
    setElements((els) =>
      addEdge(params, els).map((item) => {
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

  useEffect(() => {
    // const restored = lsController.get("elements");
    // if (restored) {
    //   setElements(restored.elements);
    // }
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

  const changeElementHandler = useCallback(
    (id: string, fn: (value: FlowElement) => FlowElement) => {
      if (setElements) {
        setElements((prev) => {
          return changeElement(prev, id, fn);
        });
      }
    },
    []
  );

  /* Logs */
  console.log(elements);

  return (
    <>
      <div className={styles.container}>
        <ReactFlowProvider>
          <FlowProvider.Provider
            value={{
              setElements,
              elements,
              instance: reactFlowInstance,
              changeElement: changeElementHandler,
            }}
          >
            <div className={styles.rf_wrapper} ref={reactFlowWrapper}>
              <ReactFlow
                nodeTypes={nodeTypesMap}
                onLoad={onLoad}
                onlyRenderVisibleElements
                onDrop={onDrop}
                snapGrid={[30, 30]}
                snapToGrid
                onDragOver={onDragOver}
                elements={elements}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
              >
                <Background
                  variant={BackgroundVariant.Lines}
                  gap={20}
                  size={4}
                />
                <ChaptersSidebar />
                <Toolbar />
              </ReactFlow>
            </div>
          </FlowProvider.Provider>
        </ReactFlowProvider>
      </div>
      {compiled.length && <Preview />}
    </>
  );
};
