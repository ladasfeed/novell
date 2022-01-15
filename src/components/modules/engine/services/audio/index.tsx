import { useDispatch, useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { useEffect, useState } from "react";
import { baseUrl } from "api";
import { ReaderEngineNamespace } from "components/modules/engine/index";

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

export const useAudioTrack = ({
  currentFrame,
}: {
  currentFrame: ReaderEngineNamespace.currentFrameType | undefined;
}) => {
  const audioFiles = useSelector(editorSliceSelectors.getAudio);

  const [audioObject, setAudioObject] = useState<HTMLAudioElement>(new Audio());

  const dispatch = useDispatch();

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

    return () => {
      audioObject.pause();
    };
  }, []);

  const toggleAudio = () => {
    if (audioObject.paused) {
      audioObject.play();
    } else {
      audioObject.pause();
    }
  };

  return {
    toggleAudio,
  };
};
