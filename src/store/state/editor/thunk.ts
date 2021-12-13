import { getFileFromEvent } from "helpers/file";
import { imageApi } from "api/image";
import { editorSlice } from "store/state/editor/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { StateType } from "store/state/index";
import { audioApi } from "api/audio";

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
            ...fileReady,
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
      console.log(event);
      const audio = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(audio);

      const file = await new Promise((res) => {
        reader.onload = function (event: any) {
          res(event.target.result);
        };
      });

      const fileReady = {
        value: file as string,
        name: "test",
      };

      const audioArray = (getState() as StateType).editor.audio;
      const response = await audioApi.create(fileReady);
      dispatch(
        editorSlice.actions.setImages([
          ...audioArray,
          {
            ...fileReady,
            id: response?.data.id,
          },
        ])
      );

      return response?.data.id as string;
    }
  ),
};
