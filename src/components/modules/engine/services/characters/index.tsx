import { ReactNode } from "react";
import styles from "components/modules/engine/index.module.css";
import { ReaderEngineNamespace } from "components/modules/engine/index";
import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { baseUrl } from "api";

export default ({
  currentFrame,
}: {
  currentFrame: ReaderEngineNamespace.currentFrameType | undefined;
}) => {
  const images = useSelector(editorSliceSelectors.getCharacterImages);

  const renderCharacters = () => {
    if (!currentFrame?.data.characterCases) {
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
            src={baseUrl + caseImage?.path}
            alt=""
          />
        );
      }
    });

    return <div>{arrOfReactNodes}</div>;
  };

  return renderCharacters;
};
