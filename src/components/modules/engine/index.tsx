import { ReactNode, useEffect, useState } from "react";
import styles from "components/modules/engine/index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { Popup } from "components/ui/Popup";
//@ts-ignore
import { Wave } from "react-animated-text";
import { Icons } from "assets/icons";
import { useAudioTrack } from "components/modules/engine/services/audio";
import { baseUrl } from "api";
import useCharactersRenderer from "./services/characters";
import { actFrameType, nodeDataType } from "types";
import cn from "classnames";
import { editorThunks } from "store/state/editor/thunk";
import { audioApi } from "api/audio";
import { lsController } from "store/ls";

export declare namespace ReaderEngineNamespace {
  export type currentFrameType = {
    data: nodeDataType;
  } & {
    [key: string]: any;
  };
}

export const Preview = (props: { large?: boolean }) => {
  const compiled = useSelector(editorSliceSelectors.getCompiled);
  const [currentChapter, setCurrentChapter] = useState(compiled[0]?.data);
  const [currentFrame, setCurrentFrame] =
    useState<ReaderEngineNamespace.currentFrameType>();
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();
  const backgroundImage = useSelector(editorSliceSelectors.getBackgroundImages);
  const [currentActFrame, setCurrentActFrame] = useState<
    actFrameType & {
      index: number;
    }
  >();

  const { toggleAudio } = useAudioTrack({
    currentFrame: currentFrame,
  });

  useEffect(() => {
    if (compiled.length) {
      setIsOpened(true);
      setCurrentChapter(compiled[0]?.data);
    }
  }, [compiled]);

  useEffect(() => {
    if (!compiled.length) return;

    dispatch(
      editorThunks.getImages({
        type: "character",
        novell_id: String(lsController.get("novellId")),
      })
    );
    dispatch(
      editorThunks.getImages({
        type: "background",
        novell_id: String(lsController.get("novellId")),
      })
    );
    audioApi
      .get({
        novell_id: String(lsController.get("novellId")),
      })
      .then((res) => {
        const audioArray = res.data;
        dispatch(editorSlice.actions.setAudio(audioArray));
      });
  }, [compiled]);

  const renderCharacters = useCharactersRenderer({ currentFrame });

  const end = () => {
    dispatch(editorSlice.actions.setCompiled([]));
  };

  useEffect(() => {
    setIsOpened(true);
  }, []);

  useEffect(() => {
    if (!isOpened) {
      dispatch(editorSlice.actions.setCompiled([]));
    }
  }, [isOpened]);

  useEffect(() => {
    setCurrentFrame(currentChapter?.find((node) => node?.data?.isRootNode));
  }, [currentChapter]);
  useEffect(() => {
    if (currentFrame) {
      setCurrentActFrame({
        ...currentFrame!.data!.act![0],
        index: 0,
      });
    }
  }, [currentFrame]);

  const next = () => {
    // next act frame
    const nextActFrame = currentFrame?.data.act?.[currentActFrame!.index + 1];
    if (nextActFrame) {
      setCurrentActFrame({
        ...nextActFrame,
        index: currentActFrame!.index + 1,
      });
      return;
    }

    // ...
    if (currentFrame?.data)
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

  // TODO
  const splitterNext = (variantId: number) => {
    const variant = currentFrame?.data.splitterData?.variants.find(
      (item) => item.id == variantId
    );

    console.log(variant!.id);
    const output = currentFrame?.data.splitterData?.outputs.find((item) => {
      return item.variants.includes(variant!.id);
    });

    console.log(output);

    const newFrame = currentChapter.find(
      (frame) => currentFrame?.next[output!.id] == frame.id
    );

    setCurrentFrame(newFrame);

    // if (pointer) {
    //   setCurrentFrame(currentChapter.find((node: any) => pointer == node.id));
    // } else {
    //   alert("End");
    // }
  };

  if (!currentFrame) return null;

  const resolve = () => {
    if (currentFrame.type == "customNodeDefault") {
      return (
        <>
          {renderCharacters()}
          <div className={styles.text} onClick={next}>
            {currentActFrame?.text && (
              <Wave
                iterations={1}
                effect={"verticalFadeIn"}
                text={currentActFrame?.text}
                speed={20}
              />
            )}
          </div>
        </>
      );
    } else {
      return (
        <div className={styles.variants}>
          {currentFrame?.data?.splitterData?.variants.map((item) => (
            <div
              className={styles.variant}
              onClick={() => splitterNext(item.id)}
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
      className={cn(styles.popup, {
        [styles["popup--large"]]: props.large,
      })}
      isOpened={isOpened}
      setIsOpened={setIsOpened}
    >
      <div
        style={{
          background: `url(${
            baseUrl +
            backgroundImage.find((img) => img.id == currentFrame.data.imgId)
              ?.path
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
