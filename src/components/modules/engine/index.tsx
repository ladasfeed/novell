import { ReactNode, useEffect, useState } from "react";
import styles from "components/modules/engine/index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { Popup } from "components/ui/Popup";
//@ts-ignore
import { Wave } from "react-animated-text";
import { Icons } from "assets/icons";
import { flowDefaultNodeType } from "types";
import { useAudioTrack } from "components/modules/engine/services/audio";
import { baseUrl } from "api";
import useCharactersRenderer from "./services/characters";

export declare namespace ReaderEngineNamespace {
  export type currentFrameType = {
    data: flowDefaultNodeType;
  } & {
    [key: string]: any;
  };
}

export const Preview = () => {
  const compiled = useSelector(editorSliceSelectors.getCompiled);
  const [currentChapter, setCurrentChapter] = useState(compiled[0]?.data);
  const [currentFrame, setCurrentFrame] =
    useState<ReaderEngineNamespace.currentFrameType>();
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();
  const images = useSelector(editorSliceSelectors.getImages);

  const { toggleAudio } = useAudioTrack({
    currentFrame: currentFrame,
  });

  const renderCharacters = useCharactersRenderer({ currentFrame });

  const end = () => {
    dispatch(editorSlice.actions.setCompiled([]));
  };

  useEffect(() => {
    setIsOpened(true);
  }, []);

  useEffect(() => {
    setCurrentFrame(currentChapter?.find((node) => node?.data?.isRootNode));
  }, [currentChapter]);

  const next = () => {
    if (currentFrame?.data?.isEndNode) {
      const nextChapter = compiled.find(
        (ch) => currentFrame?.data?.nextChapter == ch.name
      );
      if (nextChapter) {
        setCurrentChapter(nextChapter.data);
      } else {
        end();
      }

      return;
    }

    const newNode = currentChapter.find(
      (node: any) => currentFrame?.next == node.id
    );
    if (newNode) {
      setCurrentFrame(newNode);
    } else {
      end();
    }
  };

  const splitterNext = (branch: string) => {
    const pointer = currentFrame?.next?.[branch];

    if (pointer) {
      setCurrentFrame(currentChapter.find((node: any) => pointer == node.id));
    } else {
      alert("End");
    }
  };

  if (!currentFrame) return null;

  const resolve = () => {
    if (currentFrame.type == "customNodeDefault") {
      return (
        <>
          {renderCharacters()}
          <div className={styles.text} onClick={next}>
            {currentFrame.data?.text && (
              <Wave
                iterations={1}
                effect={"verticalFadeIn"}
                text={currentFrame.data.text}
                speed={20}
              />
            )}
          </div>
        </>
      );
    } else {
      return (
        <div className={styles.variants}>
          {currentFrame?.data?.branchesText?.map((item: any) => (
            <div
              className={styles.variant}
              onClick={() => splitterNext(item.branch)}
            >
              {item.text}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <Popup
      className={styles.popup}
      isOpened={isOpened}
      setIsOpened={setIsOpened}
    >
      <div
        style={{
          background: `url(${
            baseUrl +
            images.find((img) => img.id == currentFrame.data.imgId)?.path
          })`,
        }}
        className={styles.container}
      >
        <div onClick={toggleAudio} className={styles.audio}>
          <Icons.ui.Pause />
        </div>
        {resolve()}
      </div>
    </Popup>
  );
};