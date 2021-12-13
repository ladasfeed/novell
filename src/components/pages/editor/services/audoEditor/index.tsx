import React, { useEffect, useState } from "react";
import { Button } from "components/ui/Button";
import { Popup } from "components/ui/Popup";
import { getFileFromEvent } from "helpers/file";
import { RSKHooks } from "react-dev-starter-pack/dist";
import { useAppDispatch } from "store/state";
import { editorThunks } from "store/state/editor/thunk";
import { fileType } from "types";
import { audioApi } from "api/audio";

export const AudioEditor = () => {
  const [opened, toggle] = RSKHooks.useToggle(false);
  const dispatch = useAppDispatch();
  const [arrayAudio, setArrayAudio] = useState<Array<fileType>>([]);

  const upload = (e: any) => {
    dispatch(
      editorThunks.uploadAudio({
        event: e,
      })
    );
  };

  useEffect(() => {
    audioApi.get().then((res) => {
      console.log(res);
      setArrayAudio(res.data);
    });
  }, []);

  return (
    <>
      <Button onClick={toggle}>Audio editor</Button>
      <Popup isOpened={opened} setIsOpened={toggle}>
        <input onChange={upload} type={"file"} />
      </Popup>
    </>
  );
};
