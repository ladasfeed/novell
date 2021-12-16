import { Connection, Edge, Elements } from "react-flow-renderer";

export type EdgeUnionType = Edge<any> | Connection;

export type fileType = {
  name: string;
  value: string;
  id?: string;
};

export type characterStateType = {
  name: string;
  fileId: string;
};
export type characterType = {
  name: string;
  id: string;
  states: Array<characterStateType>;
};

export type characterCaseType = {
  stateName: string;
  character: characterType;
  position: "left" | "right";
};

export type chapterType = {
  data: Elements;
  id: string;
};

export type chaptersObjectType = {
  [key: string]: chapterType;
};
