import React, { useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  FlowElement,
  ReactFlowProvider,
} from "react-flow-renderer";
import styles from "./index.module.css";
import { FlowProvider } from "./flow context";
import { Preview } from "components/pages/editor/services/preview";
import { Toolbar } from "components/pages/editor/toolbar";
import { ChaptersSidebar } from "components/pages/editor/services/chapters";
import { useDispatch, useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { StateType } from "store/state";
import { nodeTypesMap } from "components/pages/editor/constants";
import { useDragFlow } from "components/pages/editor/hooks/useDragFlow";
import { useFlowInit } from "components/pages/editor/hooks/useFlowInit";
import { lsController } from "store/ls";

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
    setElements(currentChapter.data);
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
                snapGrid={[30, 30]}
                snapToGrid
                elements={elements}
                onElementsRemove={flowHandlers.onElementsRemove}
                onConnect={flowHandlers.onConnect}
                {...dragControls}
              >
                <Background
                  variant={BackgroundVariant.Lines}
                  style={{
                    backgroundColor: "#cecece",
                  }}
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
