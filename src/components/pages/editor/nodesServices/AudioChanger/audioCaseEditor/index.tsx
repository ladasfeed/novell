import { Popup } from "components/ui/Popup";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { useFlowContext } from "components/pages/editor/flow context";
import { baseUrl } from "api";
import { NodeToolButton } from "components/ui/NodeToolButton";
import styles from "components/pages/editor/nodesServices/AudioChanger/audioCaseEditor/index.module.css";
import { Track } from "components/ui/Track";

export default () => {
  const isOpened = useSelector(editorSliceSelectors.getIsEditingAudio);
  const dispatch = useDispatch();

  const togglePopup = (val: boolean) => {
    dispatch(editorSlice.actions.setIsEditingAudio(val));
  };

  return (
    <Popup title="Audio editor" isOpened={isOpened} setIsOpened={togglePopup}>
      <AudioCaseEditorInner togglePopup={togglePopup} />
    </Popup>
  );
};

const AudioCaseEditorInner = ({
  togglePopup,
}: {
  togglePopup: (val: boolean) => void;
}) => {
  const audioFiles = useSelector(editorSliceSelectors.getAudio);
  const currentNodeId = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const { changeElement } = useFlowContext();

  const setAudio = (audioId: string) => {
    changeElement(currentNodeId as string, (value) => ({
      ...value,
      data: {
        ...value.data,
        audioAction: {
          type: "set",
          audioId,
        },
      },
    }));
    togglePopup(false);
  };

  return (
    <div className={styles.list}>
      {audioFiles.map((item) => (
        <div className={styles.audio_wrapper}>
          <Track name="Wow" src={baseUrl + item.path} />
          <NodeToolButton
            onClick={() => {
              setAudio(item.id);
            }}
          >
            Set
          </NodeToolButton>
        </div>
      ))}
    </div>
  );
};
