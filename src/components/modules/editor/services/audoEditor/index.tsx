import React, { useEffect, useState } from "react";
import { Popup } from "components/ui/Popup";
import { RSKHooks } from "react-dev-starter-pack/dist";
import { useAppDispatch } from "store/state";
import { editorThunks } from "store/state/editor/thunk";
import { audioApi } from "api/audio";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { ToolButton } from "components/ui/ToolButton";
import { Icons } from "assets/icons";
import styles from "components/modules/editor/services/audoEditor/index.module.css";
import { Button } from "components/ui/Button";
import { useSelector } from "react-redux";
import { Track } from "components/ui/Track";
import { UiElementContainer } from "components/ui/UiContainer";
import { baseUrl } from "api";

export const AudioEditor = () => {
  const [opened, toggle] = RSKHooks.useToggle(false);
  const dispatch = useAppDispatch();
  const audioTracks = useSelector(editorSliceSelectors.getAudio);

  const upload = (e: any) => {
    dispatch(
      editorThunks.uploadAudio({
        event: e,
      })
    );
  };

  useEffect(() => {
    audioApi.get().then((res) => {
      const audioArray = res.data;
      dispatch(editorSlice.actions.setAudio(audioArray));
    });
  }, []);

  return (
    <>
      <ToolButton icon={<Icons.ui.Audio />} onClick={toggle} />
      <Popup title="Audio storage" isOpened={opened} setIsOpened={toggle}>
        <label className={styles.upload}>
          <input onChange={upload} type={"file"} className={styles.input} />
          <Button>Upload audiotrack</Button>
        </label>
        <UiElementContainer className={styles.track_list}>
          <h2>Track list</h2>
          {audioTracks?.map((item) => (
            <Track name={"Wow"} src={`${baseUrl}${item.path}`} />
          ))}
        </UiElementContainer>
      </Popup>
    </>
  );
};
