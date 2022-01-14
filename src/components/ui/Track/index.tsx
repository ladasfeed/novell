import styles from "./index.module.css";
import cn from "classnames";
import { useEffect, useState } from "react";
import { Icons } from "assets/icons";

type propsType = {
  src?: string;
  name?: string;
  className?: string;
};

export const Track = ({ src, className, name }: propsType) => {
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>();

  useEffect(() => {
    if (src) {
      const audio = new Audio(src);
      setAudio(audio);
    }
  }, [src]);

  const togglePlaying = () => {
    if (audio?.paused) {
      audio.play();
    } else {
      audio?.pause();
    }
  };

  return (
    <div className={cn(styles.container, className)}>
      <audio src={src} className={styles.audio} />
      <Icons.ui.Pause className={styles.control} onClick={togglePlaying} />
      <div className={styles.name}>{name}</div>
    </div>
  );
};
