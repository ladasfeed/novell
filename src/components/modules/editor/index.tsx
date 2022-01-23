import React, { useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  FlowElement,
  MiniMap,
  ReactFlowProvider,
} from "react-flow-renderer";
import styles from "./index.module.css";
import { FlowProvider } from "./flow context";
import { Preview } from "components/modules/engine";
import { ChaptersSidebar } from "components/modules/editor/services/chapters";
import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { StateType } from "store/state";
import { useDragFlow } from "components/modules/editor/hooks/useDragFlow";
import { useFlowInit } from "components/modules/editor/hooks/useFlowInit";
import {
  edgeTypesMap,
  nodeTypesMap,
} from "components/modules/editor/constants";
import { Toolbar } from "components/modules/editor/toolbar";

export const initialElements: Array<FlowElement> = [];

export const Editor = () => {
  const [elements, setElements] = useState(initialElements);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const compiled = useSelector(editorSliceSelectors.getCompiled);
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const currentChapterName = useSelector(editorSliceSelectors.getChapterName);
  const currentChapter = useSelector(
    (state: StateType) => state.editor.chapters[currentChapterName]
  );

  const dragControls = useDragFlow({
    setElements,
    elements,
    reactFlowWrapper,
    reactFlowInstance,
  });

  const flowHandlers = useFlowInit({
    setReactFlowInstance,
    setElements,
    reactFlowInstance,
  });

  useEffect(() => {
    setElements(currentChapter?.data || []);
  }, [currentChapter]);

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
              changeElement: flowHandlers.changeElementHandler,
            }}
          >
            <div className={styles.rf_wrapper} ref={reactFlowWrapper}>
              <ReactFlow
                nodeTypes={nodeTypesMap}
                onLoad={flowHandlers.onLoad}
                onlyRenderVisibleElements
                snapGrid={[16, 16]}
                minZoom={0.1}
                edgeTypes={edgeTypesMap}
                onEdgeDoubleClick={flowHandlers.deleteEdgeHandler}
                snapToGrid
                elements={elements}
                onElementsRemove={flowHandlers.onElementsRemove}
                onConnect={flowHandlers.onConnect}
                {...dragControls}
              >
                <Background
                  variant={BackgroundVariant.Dots}
                  style={{
                    backgroundColor: "#000000",
                  }}
                  color="#000000"
                />
                <ChaptersSidebar />
                <Toolbar />
                <MiniMap nodeColor={() => "#a43939"} nodeStrokeWidth={3} />
                <Controls />
              </ReactFlow>
            </div>
          </FlowProvider.Provider>
        </ReactFlowProvider>
      </div>
    </>
  );
};
