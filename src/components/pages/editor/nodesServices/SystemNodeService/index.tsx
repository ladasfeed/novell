import { useAppDispatch } from "store/state";
import { useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { useFlowContext } from "components/pages/editor/flow context";
import { Popup } from "components/ui/Popup";
import { nodeServiceFactory } from "components/pages/editor/helpers/nodeServiceFactory";
import { ReactSelect } from "components/ui/ReactSelect";
import { useEffect, useMemo, useState } from "react";
import { UiElementContainer } from "components/ui/UiContainer";
import styles from "./index.module.css";

const Service = () => {
  const dispatch = useAppDispatch();
  const template = useSelector(editorSliceSelectors.getPopupState);
  const { setElements, elements, changeElement } = useFlowContext();
  const toggleOpen = (v: boolean) => [
    dispatch(editorSlice.actions.setPopupState(v ? "system" : null)),
  ];
  const chapters = useSelector(editorSliceSelectors.getChapters);
  const nodeId = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const node = useMemo(() => {
    return elements.find((el) => el.id);
  }, [nodeId, elements]);
  const arrayOfChapters = useMemo(() => {
    return Object.entries(chapters).map(([ch]) => ch);
  }, [chapters]);
  const [isEndNode, setIsEndNode] = useState(false);

  useEffect(() => {
    if (node) {
      setIsEndNode(Boolean(node?.data?.isEndNode));
    }
  }, [node]);

  const selectNextChapter = (selectValue: any) => {
    changeElement(nodeId as string, (v) => {
      return {
        ...v,
        data: {
          ...v.data,
          isEndNode: Boolean(selectValue),
          nextChapter: selectValue?.value,
        },
      };
    });
  };

  const markAsRootHandler = (e: any) => {
    const value = e.currentTarget.checked;
    changeElement(nodeId as string, (v) => {
      return {
        ...v,
        data: {
          ...v.data,
          isRootNode: value,
        },
      };
    });
  };

  return (
    <Popup
      title="System node settings"
      isOpened={template == "system"}
      setIsOpened={toggleOpen}
    >
      <div className={styles.container}>
        <UiElementContainer>
          <div className={styles.is_end_node}>
            Is node end:{" "}
            <label htmlFor="">
              <input
                checked={isEndNode}
                onChange={(e) => {
                  const value = e.currentTarget.checked;
                  setIsEndNode(value);
                  if (!value) {
                    selectNextChapter(undefined);
                  }
                }}
                type="checkbox"
              />
            </label>
          </div>
          {isEndNode && (
            <div className={styles.choose_chapter}>
              <h2>Choose chapter</h2>
              <ReactSelect
                defaultValue={{
                  value: node?.data?.nextChapter,
                  label: node?.data?.nextChapter,
                }}
                onChange={selectNextChapter}
                options={arrayOfChapters.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </div>
          )}
        </UiElementContainer>

        <UiElementContainer>
          <div>
            Mark as root node:{" "}
            <input
              checked={Boolean(node?.data?.isRootNode)}
              onChange={markAsRootHandler}
              type="checkbox"
            />
          </div>
        </UiElementContainer>
      </div>
    </Popup>
  );
};

export default nodeServiceFactory({
  service: Service,
  nodeButtonParams: {
    action: (dispatch) => dispatch(editorSlice.actions.setPopupState("system")),
    variantOrIcon: "settings",
  },
});
