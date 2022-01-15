import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import styles from "components/modules/editor/nodesServices/NodeImageChanger/imageCaseEditor/index.module.css";
import { useFlowContext } from "components/modules/editor/flow context";
import { Title } from "components/ui/Title";
import { useEffect, useState } from "react";

export default () => {
  const node = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const images = useSelector(editorSliceSelectors.getImages);
  const { changeElement, elements } = useFlowContext();
  const [currentImage, setCurrentImage] = useState(
    images.find((i) => i.id == node?.data?.imgId)
  );

  useEffect(() => {
    setCurrentImage(images.find((i) => i.id == node?.data?.imgId));
  }, [node]);

  const changeImage = (e: any) => {
    const imgId = e.currentTarget.getAttribute("data-id");
    changeElement(node?.id as string, (value) => ({
      ...value,
      data: { ...value.data, imgId: imgId },
    }));
  };

  return (
    <>
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
    </>
  );
};
