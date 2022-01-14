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

type serverAudioType = {
  path: string;
  id: string;
};

type initialStateType = {
  branches: Array<string>;
  images: Array<fileType>;
  audio: Array<serverAudioType>;
  openedNodeId?: string;
  characters: Array<characterType>;

  popupState:
    | "image"
    | "character"
    | "branches"
    | "audio"
    | "text"
    | "remove"
    | "system"
    | null;

  isEditingCharacter: boolean;
  isEditingBranches: boolean;
  isEditingAudio: boolean;
  isEditingNodeText: boolean;
  compiled: Array<{
    name: string;
    data: Array<any>;
  }>;

  //react flow state
  previewImageMode: boolean;

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
    popupState: null,
    isEditingImage: false,
    isEditingCharacter: false,
    previewImageMode: false,
    isEditingBranches: false,
    isEditingAudio: false,
    isEditingNodeText: false,
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

    setPopupState: (
      state,
      action: PayloadAction<initialStateType["popupState"]>
    ) => {
      state.popupState = action.payload;
    },

    /* Images */
    setImages: (state, action: PayloadAction<Array<fileType>>) => {
      state.images = action.payload;
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

    /* Track */
    setAudio: (state, action: PayloadAction<Array<serverAudioType>>) => {
      state.audio = action.payload;
    },
    setIsEditingAudio: (state, action: PayloadAction<boolean>) => {
      state.isEditingAudio = action.payload;
    },

    /* Common */
    setIsEditingNodeText: (state, action: PayloadAction<boolean>) => {
      state.isEditingNodeText = action.payload;
    },

    /* Remove */

    /* System */
    setCurrentOpenedNode: (state, action: PayloadAction<string>) => {
      state.openedNodeId = action.payload;
    },
    setCompiled: (
      state,
      action: PayloadAction<
        Array<{
          name: string;
          data: Array<any>;
        }>
      >
    ) => {
      state.compiled = action.payload;
    },
    togglePreviewImagesMode: (state) => {
      state.previewImageMode = !state.previewImageMode;
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

  getIsEditingCharacter: (state: StateType) => state.editor.isEditingCharacter,
  getIsEditingBranch: (state: StateType) => state.editor.isEditingBranches,
  getIsEditingAudio: (state: StateType) => state.editor.isEditingAudio,
  getIsEditingNodeText: (state: StateType) => state.editor.isEditingNodeText,

  getChapters: (state: StateType) => state.editor.chapters,
  getChapterName: (state: StateType) => state.editor.currentChapterName,

  getIsImagesPreviewMode: (state: StateType) => state.editor.previewImageMode,

  getPopupState: (state: StateType) => state.editor.popupState,
};
