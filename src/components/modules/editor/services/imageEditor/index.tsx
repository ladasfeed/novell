import { RSKHooks } from "react-dev-starter-pack/dist";
import { Popup } from "components/ui/Popup";
import { Button } from "components/ui/Button";
import { imageApi } from "api/image";
import { NodeToolButton } from "components/ui/NodeToolButton";
import { useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { useEffect } from "react";
import styles from "components/modules/editor/services/imageEditor/index.module.css";
import { editorThunks } from "store/state/editor/thunk";
import { useAppDispatch } from "store/state";
import { Input } from "components/ui/Input";
import { ToolButton } from "components/ui/ToolButton";
import { Icons } from "assets/icons";
import { Img } from "components/ui/Image";
import { baseUrl } from "api";
import { lsController } from "store/ls";

export const ImageEditor = () => {
  const [isOpened, toggleOpen] = RSKHooks.useToggle(false);
  const images = useSelector(editorSliceSelectors.getBackgroundImages);
  const dispatch = useAppDispatch();

  const getImages = () => {
    dispatch(
      editorThunks.getImages({
        type: "background",
        novell_id: String(lsController.get("novellId")),
      })
    );
  };

  const uploadImage = async (e: any) => {
    dispatch(
      editorThunks.uploadImage({
        event: e,
        type: "background",
      })
    );
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <ToolButton onClick={toggleOpen} icon={<Icons.ui.ImageEditor />} />
      <Popup
        title={"Image editor"}
        autoWidth
        isOpened={isOpened}
        setIsOpened={toggleOpen}
        className={styles.popup}
      >
        <NodeToolButton>
          <Input
            className={styles.input}
            type={"file"}
            onChange={uploadImage}
          />
          +
        </NodeToolButton>
        <div>
          <div className={styles.image_list}>
            {images.map((item) => (
              <Img
                className={styles.image}
                src={baseUrl + item.path}
                name={"no name."}
              />
            ))}
          </div>
        </div>
      </Popup>
    </>
  );
};
