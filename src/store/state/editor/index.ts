import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "store/state/index";
import { lsController } from "store/ls";

/* Types */
type fileType = {
  name: string;
  value: string;
  id?: string;
};

type initialStateType = {
  branches: Array<string>;
  images: Array<fileType>;
};

/* Slice */
export const editorSlice = createSlice({
  name: "editor",
  initialState: {
    branches: ["default"],
    images: [],
  } as initialStateType,
  reducers: {
    setBranches: (state, action: PayloadAction<Array<string>>) => {
      state.branches = action.payload;
      lsController.set("branches", action.payload);
    },
    setImages: (state, action: PayloadAction<Array<fileType>>) => {
      state.images = action.payload;
    },
  },
});

export const editorSliceSelectors = {
  getBranches: (state: StateType) => state.editor.branches,
  getImages: (state: StateType) => state.editor.images,
};
