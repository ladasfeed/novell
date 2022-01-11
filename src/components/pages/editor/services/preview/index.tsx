import { ReactNode, useEffect, useState } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { Popup } from "components/ui/Popup";
//@ts-ignore
import { Wave } from "react-animated-text";
import { baseUrl } from "api";
import { Icons } from "assets/icons";
import { flowDefaultNodeType } from "types";
import { log } from "util";

const fadeVolumeController = (audio: HTMLAudioElement, type: "in" | "out") => {
  const res = new Promise((resolve) => {
    var interval = setInterval(() => {
      if (type == "out") {
        audio.volume = audio.volume - 0.02;
        if (audio.volume <= 0.05) {
          window.clearInterval(interval);
          resolve("");
        }
      } else {
        audio.volume = audio.volume + 0.02;
        if (audio.volume >= 0.91) {
          window.clearInterval(interval);
          resolve("");
        }
      }
    }, 100);
  });
  return res;
};

export const Preview = () => {
  const compiled = useSelector(editorSliceSelectors.getCompiled);
  const images = useSelector(editorSliceSelectors.getImages);
  const [currentChapter, setCurrentChapter] = useState(compiled[0]?.data);
  const [currentFrame, setCurrentFrame] = useState<
    {
      data: flowDefaultNodeType;
    } & {
      [key: string]: any;
    }
  >();
  const [isOpened, setIsOpened] = useState(false);
  const audioFiles = useSelector(editorSliceSelectors.getAudio);
  const [audioObject, setAudioObject] = useState<HTMLAudioElement>(new Audio());
  const dispatch = useDispatch();

  console.log(compiled);

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
    } else {
      end();

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

  useEffect(() => {
    if (!currentFrame) return;

    const audioAction = currentFrame.data.audioAction;

    if (audioAction) {
      if (audioAction.type == "set") {
        const audio = audioFiles.find((item) => item.id == audioAction.audioId);

        if (audio) {
          if (audioObject.src) {
            fadeVolumeController(audioObject, "out").then(() => {
              audioObject.src = baseUrl + audio!.path;
              audioObject.play();
            });
          } else {
            audioObject.src = baseUrl + audio!.path;
            audioObject.play();
          }
        }
      }
    }
  }, [currentFrame]);

  useEffect(() => {
    audioObject.volume = 0;
    audioObject.onloadeddata = () => {
      fadeVolumeController(audioObject, "in");
    };
  }, []);

  const toggleAudio = () => {
    if (audioObject.paused) {
      audioObject.play();
    } else {
      audioObject.pause();
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

  const renderCharacters = () => {
    if (!currentFrame.data.characterCases) {
      return null;
    }
    let arrOfReactNodes: Array<ReactNode> = [];

    currentFrame.data.characterCases.forEach((characterCase: any) => {
      const character = characterCase.character;
      const fileId = character.states.find(
        (state: any) => state.name == characterCase.stateName
      )?.fileId;
      const caseImage = images.find((im) => im.id == fileId);

      if (caseImage) {
        arrOfReactNodes.push(
          <img
            style={{
              left: characterCase.position == "left" ? 100 : undefined,
              right: characterCase.position == "right" ? 100 : undefined,
            }}
            className={styles.character}
            src={caseImage?.value}
            alt=""
          />
        );
      }
    });

    return <div>{arrOfReactNodes}</div>;
  };

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
            images.find((img) => img.id == currentFrame.data.imgId)?.value
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
