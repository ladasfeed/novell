import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "store/state/index";
import { lsController } from "store/ls";
import { characterStateType, characterType, fileType } from "types";

/* Types */

type initialStateType = {
  branches: Array<string>;
  images: Array<fileType>;
  audio: Array<fileType>;
  openedNodeId?: string;
  characters: Array<characterType>;

  // action state
  isEditingImage: boolean;
  isEditingCharacter: boolean;
  isEditingBranches: boolean;
  compiled: Array<any>;
};

/* Slice */
export const editorSlice = createSlice({
  name: "editor",
  initialState: {
    branches: ["default"],
    images: [],
    audio: [],
    isEditingImage: false,
    isEditingCharacter: false,
    isEditingBranches: false,
    compiled: [],
    characters: lsController.get("characters") || [],
  } as initialStateType,
  reducers: {
    setEditingImageState: (state, action: PayloadAction<boolean>) => {
      state.isEditingImage = action.payload;
    },
    setEditingCharacterState: (state, action: PayloadAction<boolean>) => {
      state.isEditingCharacter = action.payload;
    },
    setEditingBranches: (state, action: PayloadAction<boolean>) => {
      state.isEditingBranches = action.payload;
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
        case: characterStateType;
      }>
    ) => {
      state.characters = state.characters.map((item) => {
        return item.id == action.payload.id
          ? {
              ...item,
              states: [...item.states, action.payload.case],
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
    },
    setBranches: (state, action: PayloadAction<Array<string>>) => {
      state.branches = action.payload;
      lsController.set("branches", action.payload);
    },
    setImages: (state, action: PayloadAction<Array<fileType>>) => {
      state.images = action.payload;
    },
    setAudio: (state, action: PayloadAction<Array<fileType>>) => {
      state.audio = action.payload;
    },
  },
});

export const editorSliceSelectors = {
  getBranches: (state: StateType) => state.editor.branches,
  getCurrentOpenedNode: (state: StateType) => state.editor.openedNodeId,
  getCompiled: (state: StateType) => state.editor.compiled,
  getCharacters: (state: StateType) => state.editor.characters,

  getImages: (state: StateType) => state.editor.images,
  getAudio: (state: StateType) => state.editor.audio,

  getIsEditingImage: (state: StateType) => state.editor.isEditingImage,
  getIsEditingCharacter: (state: StateType) => state.editor.isEditingCharacter,
  getIsEditingBranch: (state: StateType) => state.editor.isEditingBranches,
};
