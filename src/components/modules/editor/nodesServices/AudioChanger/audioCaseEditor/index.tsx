import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { useFlowContext } from "components/modules/editor/flow context";
import { baseUrl } from "api";
import { NodeToolButton } from "components/ui/NodeToolButton";
import styles from "components/modules/editor/nodesServices/AudioChanger/audioCaseEditor/index.module.css";
import { Track } from "components/ui/Track";

export default () => {
  const audioFiles = useSelector(editorSliceSelectors.getAudio);
  const node = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const { changeElement } = useFlowContext();

  const setAudio = (audioId: string) => {
    changeElement(node?.data as string, (value) => ({
      ...value,
      data: {
        ...value.data,
        audioAction: {
          type: "set",
          audioId,
        },
      },
    }));
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
