import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "store/state/index";
import { lsController } from "store/ls";

/* Types */
type fileType = {
  name: string;
  value: string;
  id?: string;
};

export type characterCase = {
  name: string;
  fileId: string;
};
export type characterType = {
  name: string;
  id: string;
  cases: Array<characterCase>;
};

type initialStateType = {
  branches: Array<string>;
  images: Array<fileType>;
  openedNodeId?: string;
  characters: Array<characterType>;

  // action state
  isEditingImage: boolean;
  compiled: Array<any>;
};

/* Slice */
export const editorSlice = createSlice({
  name: "editor",
  initialState: {
    branches: ["default"],
    images: [],
    isEditingImage: false,
    compiled: [],
    characters: lsController.get("characters") || [],
  } as initialStateType,
  reducers: {
    setEditingImageState: (state, action: PayloadAction<boolean>) => {
      state.isEditingImage = action.payload;
    },
    setCompiled: (state, action: PayloadAction<Array<any>>) => {
      state.compiled = action.payload;
    },

    addNewCharacter: (state, action: PayloadAction<characterType>) => {
      state.characters = [...state.characters, action.payload];
    },
    addCharacterCase: (
      state,
      action: PayloadAction<{
        id: string;
        case: characterCase;
      }>
    ) => {
      state.characters = state.characters.map((item) => {
        return item.id == action.payload.id
          ? {
              ...item,
              cases: [...item.cases, action.payload.case],
            }
          : item;
      });
    },
    updateCharacter: (
      state,
      action: PayloadAction<{
        character: characterType;
      }>
    ) => {
      state.characters = state.characters.map((item) => {
        return item.id == action.payload.character.id
          ? action.payload.character
          : item;
      });
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
  getCompiled: (state: StateType) => state.editor.compiled,
  getCharacters: (state: StateType) => state.editor.characters,
};
