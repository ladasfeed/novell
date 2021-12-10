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
  openedNodeId?: string;

  // action state
  isEditingImage: boolean;
};

/* Slice */
export const editorSlice = createSlice({
  name: "editor",
  initialState: {
    branches: ["default"],
    images: [],
    isEditingImage: false,
  } as initialStateType,
  reducers: {
    setEditingImageState: (state, action: PayloadAction<boolean>) => {
      state.isEditingImage = action.payload;
    },
    setCurrentOpenedNode: (state, action: PayloadAction<string>) => {
      state.openedNodeId = action.payload;
      state.isEditingImage = true;
    },
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
  getCurrentOpenedNode: (state: StateType) => state.editor.openedNodeId,
  getIsEditingImage: (state: StateType) => state.editor.isEditingImage,
};
