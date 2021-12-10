import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { editorSlice } from "store/state/editor";

export const stateActions = {};

const reducer = combineReducers({
  editor: editorSlice.reducer,
});

export const store = configureStore({
  reducer,
});

export type StateType = ReturnType<typeof reducer>;
