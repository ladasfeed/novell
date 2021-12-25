import { ReactNode, useEffect, useState } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { Popup } from "components/ui/Popup";
//@ts-ignore
import { Wave } from "react-animated-text";
import { baseUrl } from "api";

export const Preview = () => {
  const compiled = useSelector(editorSliceSelectors.getCompiled);
  const images = useSelector(editorSliceSelectors.getImages);
  const [currentChapter, setCurrentChapter] = useState(compiled[0]?.data);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(currentChapter[0]);
  const [isOpened, setIsOpened] = useState(false);
  const audioFiles = useSelector(editorSliceSelectors.getAudio);
  const [audioObject, setAudioObject] = useState<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsOpened(true);
  }, []);

  useEffect(() => {
    setCurrentFrame(currentChapter[0]);
  }, [currentChapter]);

  const next = () => {
    const newNode = currentChapter.find(
      (node: any) => currentFrame.next == node.id
    );
    if (newNode) {
      setCurrentFrame(newNode);
    } else {
      console.log(newNode);
      if (currentFrame?.data?.isEndNode) {
        if (compiled[currentChapterIndex + 1]) {
          setCurrentChapterIndex((prev) => prev + 1);
          console.log(compiled[currentChapterIndex + 1]);
          setCurrentChapter(compiled[currentChapterIndex + 1]?.data);
        } else {
          alert("No end");
          dispatch(editorSlice.actions.setCompiled([]));
        }
      } else {
        dispatch(editorSlice.actions.setCompiled([]));
      }
    }
  };

  useEffect(() => {
    if (!currentFrame) return;

    const audioAction = currentFrame.data.audioAction;

    if (audioAction) {
      if (audioAction.type == "set") {
        const audio = audioFiles.find((item) => item.id == audioAction.audioId);

        console.log(audio);
        if (audio) {
          const audioController = new Audio(baseUrl + audio!.path);
          audioController.play();
          console.log(audioController);

          setAudioObject(audioController);
        }
      }
    }
  }, [currentFrame]);

  const splitterNext = (branch: string) => {
    const pointer = currentFrame.next?.[branch];

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

  console.log(currentFrame);
  const resolve = () => {
    if (currentFrame.type == "customNodeDefault") {
      return (
        <>
          {renderCharacters()}
          <div className={styles.text} onClick={next}>
            <Wave
              iterations={1}
              effect={"verticalFadeIn"}
              text={currentFrame.data.text}
              speed={20}
            />
          </div>
        </>
      );
    } else {
      const branchesText = Object.entries(currentFrame.data.branchesText);

      return (
        <div className={styles.variants}>
          {branchesText.map((item: any) => (
            <div
              className={styles.variant}
              onClick={() => splitterNext(item[0])}
            >
              {item[1]}
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
        {resolve()}
      </div>
    </Popup>
  );
};
