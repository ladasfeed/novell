import { getFileFromEvent } from "helpers/file";
import { imageApi } from "api/image";
import { editorSlice } from "store/state/editor/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { StateType } from "store/state/index";

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
};
