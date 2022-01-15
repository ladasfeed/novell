import { getFileFromEvent } from "helpers/file";
import { imageApi } from "api/image";
import { editorSlice } from "store/state/editor/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { StateType } from "store/state/index";
import { audioApi } from "api/audio";

function urltoFile(url: string, filename: string, mimeType: string) {
  return new Promise((resolve) => {
    fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        resolve(new File([buf], filename, { type: mimeType }));
      });
  });
}

export const editorThunks = {
  uploadImage: createAsyncThunk(
    "uploadImage",
    async (
      {
        event,
      }: {
        event: any;
      },
      { dispatch, getState }
    ) => {
      const file = await getFileFromEvent(event);
      const fileReady = {
        value: file.value,
        name: file.file_name,
      };

      const images = (getState() as StateType).editor.images;
      const response = await imageApi.createImage(fileReady);
      dispatch(
        editorSlice.actions.setImages([
          ...images,
          {
            path: response?.data.path,
            id: response?.data.id,
          },
        ])
      );

      return response?.data.id as string;
    }
  ),
  uploadAudio: createAsyncThunk(
    "uploadAudio",
    async (
      {
        event,
      }: {
        event: any;
      },
      { dispatch, getState }
    ) => {
      const audio = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(audio);

      const file: string = await new Promise((res) => {
        reader.onload = function (event: any) {
          res(event.target.result);
        };
      });

      // const ss = await urltoFile(file, audio.name, audio.type);

      const fileReady = {
        value: file as string,
        name: "test",
      };

      const response = await audioApi.create(fileReady);
      return response?.data.id as string;
    }
  ),
};
