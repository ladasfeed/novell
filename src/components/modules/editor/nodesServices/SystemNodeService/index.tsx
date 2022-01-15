import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { useFlowContext } from "components/modules/editor/flow context";
import { nodeServiceFactory } from "components/modules/editor/helpers/nodeServiceFactory";
import { ReactSelect } from "components/ui/ReactSelect";
import { useEffect, useMemo, useState } from "react";
import { UiElementContainer } from "components/ui/UiContainer";
import styles from "components/modules/editor/nodesServices/SystemNodeService/index.module.css";

const Service = () => {
  const { elements, changeElement } = useFlowContext();
  const chapters = useSelector(editorSliceSelectors.getChapters);
  const node = useSelector(editorSliceSelectors.getCurrentOpenedNode);
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
    changeElement(node?.id as string, (v) => {
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
    changeElement(node?.id as string, (v) => {
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
  );
};

export default nodeServiceFactory({
  Service,
  nodeButtonParams: {
    variantOrIcon: "settings",
  },
  serviceName: "system",
});
