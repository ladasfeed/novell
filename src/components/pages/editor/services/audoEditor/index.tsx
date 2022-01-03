import React, { useEffect, useState } from "react";
import { Button } from "components/ui/Button";
import { Popup } from "components/ui/Popup";
import { getFileFromEvent } from "helpers/file";
import { RSKHooks } from "react-dev-starter-pack/dist";
import { useAppDispatch } from "store/state";
import { editorThunks } from "store/state/editor/thunk";
import { fileType } from "types";
import { audioApi } from "api/audio";
import { editorSlice } from "store/state/editor";
import { ToolButton } from "components/ui/ToolButton";
import { Icons } from "assets/icons";

export const AudioEditor = () => {
  const [opened, toggle] = RSKHooks.useToggle(false);
  const dispatch = useAppDispatch();
  const [arrayAudio, setArrayAudio] = useState<
    Array<{
      path: string;
    }>
  >([]);

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
      <Popup isOpened={opened} setIsOpened={toggle}>
        <input onChange={upload} type={"file"} />
        <div>
          {arrayAudio?.map((item) => (
            <audio controls src={`http://localhost:4000${item.path}`} />
          ))}
        </div>
      </Popup>
    </>
  );
};
