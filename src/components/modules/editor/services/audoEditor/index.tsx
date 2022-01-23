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
import { lsController } from "store/ls";
import { Title } from "components/ui/Title";
import { unwrapResult } from "@reduxjs/toolkit";

export const AudioEditor = () => {
  const [opened, toggle] = RSKHooks.useToggle(false);
  const dispatch = useAppDispatch();
  const audioTracks = useSelector(editorSliceSelectors.getAudio);

  const getAudio = async () => {
    audioApi
      .get({
        novell_id: String(lsController.get("novellId")),
      })
      .then((res) => {
        const audioArray = res.data;
        dispatch(editorSlice.actions.setAudio(audioArray));
      });
  };

  const upload = (e: any) => {
    dispatch(
      editorThunks.uploadAudio({
        event: e,
      })
    )
      .unwrap()
      .then(() => {
        getAudio();
      });
  };

  useEffect(() => {
    getAudio();
  }, []);

  return (
    <>
      <ToolButton icon={<Icons.ui.Audio />} onClick={toggle} />
      <Popup title="Audio storage" isOpened={opened} setIsOpened={toggle}>
        <label className={styles.upload}>
          <input onChange={upload} type={"file"} className={styles.input} />
          <UiElementContainer
            style={{
              cursor: "pointer",
              width: "200px",
            }}
          >
            Upload audiotrack
          </UiElementContainer>
        </label>
        <UiElementContainer className={styles.track_list}>
          <Title>Track list</Title>
          {audioTracks?.map((item) => (
            <Track name={"Wow"} src={`${baseUrl}${item.path}`} />
          ))}
        </UiElementContainer>
      </Popup>
    </>
  );
};
