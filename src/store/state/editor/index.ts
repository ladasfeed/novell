import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "store/state/index";
import { lsController } from "store/ls";
import {
  chaptersObjectType,
  chapterType,
  characterStateType,
  characterType,
  fileType,
} from "types";
import { Elements } from "react-flow-renderer";

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

  currentChapterName: string;
  chapters: chaptersObjectType;
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
    currentChapterName: "first",
    characters: lsController.get("characters") || [],
    chapters: lsController.get("chapters") || {
      first: {
        data: [],
        id: "1",
      },
    },
  } as initialStateType,
  reducers: {
    /* Chapters */
    addNewChapter: (
      state,
      {
        payload,
      }: PayloadAction<{
        chapter: chapterType;
        name: string;
      }>
    ) => {
      state.chapters[payload.name] = payload.chapter;
    },
    updateChapterElements: (
      state,
      {
        payload,
      }: PayloadAction<{
        data: Elements;
        name: string;
      }>
    ) => {
      if (state.chapters[payload.name]) {
        state.chapters[payload.name].data = payload.data;
        lsController.set("chapters", state.chapters);
      }
    },
    setChapterName: (state, action: PayloadAction<string>) => {
      state.currentChapterName = action.payload;
    },

    /* Images */
    setImages: (state, action: PayloadAction<Array<fileType>>) => {
      state.images = action.payload;
    },
    setEditingImageState: (state, action: PayloadAction<boolean>) => {
      state.isEditingImage = action.payload;
    },

    /* Character */
    addNewCharacter: (state, action: PayloadAction<characterType>) => {
      state.characters = [...state.characters, action.payload];
    },
    setEditingCharacterState: (state, action: PayloadAction<boolean>) => {
      state.isEditingCharacter = action.payload;
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

    /* Branches */
    setBranches: (state, action: PayloadAction<Array<string>>) => {
      state.branches = action.payload;
      lsController.set("branches", action.payload);
    },
    setEditingBranches: (state, action: PayloadAction<boolean>) => {
      state.isEditingBranches = action.payload;
    },

    /* Audio */
    setAudio: (state, action: PayloadAction<Array<fileType>>) => {
      state.audio = action.payload;
    },

    /* System */
    setCurrentOpenedNode: (state, action: PayloadAction<string>) => {
      state.openedNodeId = action.payload;
    },
    setCompiled: (state, action: PayloadAction<Array<any>>) => {
      state.compiled = action.payload;
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

  getChapters: (state: StateType) => state.editor.chapters,
  getChapterName: (state: StateType) => state.editor.currentChapterName,
};
