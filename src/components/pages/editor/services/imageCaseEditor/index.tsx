import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { Popup } from "components/ui/Popup";
import styles from "./index.module.css";
import { useFlowContext } from "components/pages/editor/flow context";
import { Title } from "components/ui/Title";
import { useEffect, useState } from "react";

export const ImageCaseEditor = () => {
  const nodeId = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const images = useSelector(editorSliceSelectors.getImages);
  const isEditing = useSelector(editorSliceSelectors.getIsEditingImage);
  const { changeElement, elements } = useFlowContext();
  const dispatch = useDispatch();
  const [node, setNode] = useState(elements.find((i) => i.id == nodeId));
  const [currentImage, setCurrentImage] = useState(
    images.find((i) => i.id == node?.data?.imgId)
  );

  const toggleOpen = () => {
    dispatch(editorSlice.actions.setEditingImageState(!isEditing));
  };

  useEffect(() => {
    setNode(elements.find((i) => i.id == nodeId));
  }, [isEditing]);
  useEffect(() => {
    setCurrentImage(images.find((i) => i.id == node?.data?.imgId));
  }, [isEditing]);

  const changeImage = (e: any) => {
    const imgId = e.currentTarget.getAttribute("data-id");
    changeElement(nodeId as string, (value) => ({
      ...value,
      data: { ...value.data, imgId: imgId },
    }));
    toggleOpen();
  };

  return (
    <Popup
      isOpened={isEditing}
      className={styles.popup}
      setIsOpened={toggleOpen}
    >
      {currentImage && (
        <div className={styles.current}>
          <Title>Current image</Title>
          <div className={styles.img_container}>
            <img className={styles.img} src={currentImage.value} />
          </div>
        </div>
      )}
      <Title className={styles.title}>Choose background</Title>
      <div className={styles.list}>
        {images.map((item) => (
          <div
            className={styles.img_container}
            data-id={item.id}
            onClick={changeImage}
          >
            <img className={styles.img} src={item.value} />
          </div>
        ))}
      </div>
    </Popup>
  );
};
