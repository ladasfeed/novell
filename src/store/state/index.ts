import {
  Action,
  combineReducers,
  configureStore,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { editorSlice } from "store/state/editor";
import { useDispatch } from "react-redux";

export const stateActions = {};

const reducer = combineReducers({
  editor: editorSlice.reducer,
});

export const store = configureStore({
  reducer,
});

export type StateType = ReturnType<typeof reducer>;

export type AppDispatch = typeof store.dispatch;
export type ThunkAppDispatch = ThunkDispatch<StateType, void, Action>;
export const useAppDispatch = () => useDispatch<ThunkAppDispatch>();
