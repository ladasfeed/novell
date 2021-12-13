import { RSKHooks } from "react-dev-starter-pack/dist";
import { Popup } from "components/ui/Popup";
import { Button } from "components/ui/Button";
import { imageApi } from "api/image";
import { NodeToolButton } from "components/ui/NodeToolButton";
import { useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { useEffect } from "react";
import styles from "./index.module.css";
import { editorThunks } from "store/state/editor/thunk";
import { useAppDispatch } from "store/state";
import { Input } from "components/ui/Input";

export const ImageEditor = () => {
  const [isOpened, toggleOpen] = RSKHooks.useToggle(false);
  const images = useSelector(editorSliceSelectors.getImages);
  const dispatch = useAppDispatch();

  const getImages = () => {
    imageApi.getImages().then((res) => {
      console.log(res.data);
      dispatch(
        editorSlice.actions.setImages(
          res.data.map(({ _id, ...data }: any) => ({
            ...data,
            id: _id,
          }))
        )
      );
    });
  };

  const uploadImage = async (e: any) => {
    dispatch(
      editorThunks.uploadImage({
        event: e,
      })
    );
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <Button onClick={toggleOpen}>Image editor</Button>
      <Popup isOpened={isOpened} setIsOpened={toggleOpen}>
        <NodeToolButton variant={"image"}>
          <Input
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
