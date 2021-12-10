import { RSKHooks } from "react-dev-starter-pack/dist";
import { Popup } from "components/ui/Popup";
import { Button } from "components/ui/Button";
import { imageApi } from "api/image";
import { NodeToolButton } from "components/ui/NodeToolButton";
import { getFileFromEvent } from "helpers/file";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { useEffect } from "react";
import styles from "./index.module.css";

export const ImageEditor = () => {
  const [isOpened, toggleOpen] = RSKHooks.useToggle(false);
  const images = useSelector(editorSliceSelectors.getImages);
  const dispatch = useDispatch();

  const uploadImage = (e: any) => {
    getFileFromEvent(e).then((file) => {
      const fileReady = {
        value: file.value,
        name: file.file_name,
      };
      imageApi.createImage(fileReady).then((res) => {
        dispatch(
          editorSlice.actions.setImages([
            ...images,
            {
              ...fileReady,
              id: res.data.id,
            },
          ])
        );
        console.log(res);
      });
    });
  };

  const getImages = () => {
    imageApi.getImages().then((res) => {
      console.log(res.data);
      dispatch(editorSlice.actions.setImages(res.data));
    });
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <Button onClick={toggleOpen}>Image editor</Button>
      <Popup isOpened={isOpened} setIsOpened={toggleOpen}>
        <NodeToolButton variant={"image"}>
          <input
            className={styles.input}
            type={"file"}
            onChange={uploadImage}
          />
        </NodeToolButton>
        <div>
          <h4>Images</h4>
          <div className={styles.image_list}>
            {images.map((item) => (
              <img className={styles.image} src={item.value} />
            ))}
          </div>
        </div>
      </Popup>
    </>
  );
};
