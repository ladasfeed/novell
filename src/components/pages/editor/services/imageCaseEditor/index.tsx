import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { Popup } from "components/ui/Popup";
import styles from "./index.module.css";
import { useFlowContext } from "components/pages/editor/flow context";

export const ImageCaseEditor = () => {
  const nodeId = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const images = useSelector(editorSliceSelectors.getImages);
  const isEditing = useSelector(editorSliceSelectors.getIsEditingImage);
  const { changeElement } = useFlowContext();
  const dispatch = useDispatch();

  const toggleOpen = () => {
    dispatch(editorSlice.actions.setEditingImageState(!isEditing));
  };

  const changeImage = (e: any) => {
    const imgId = e.currentTarget.getAttribute("data-id");
    changeElement(nodeId as string, (value) => ({
      ...value,
      data: { ...value.data, imgId: imgId },
    }));
    toggleOpen();
  };

  return (
    <Popup isOpened={isEditing} setIsOpened={toggleOpen}>
      <div>Node ID: {nodeId}</div>
      <div className={styles.list}>
        {images.map((item) => (
          <img
            data-id={item.id}
            onClick={changeImage}
            className={styles.img}
            src={item.value}
          />
        ))}
      </div>
    </Popup>
  );
};
