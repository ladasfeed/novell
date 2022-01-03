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

export type flowNodeBaseType = {
  text?: string;
  imgId?: string;
  isEndNode?: boolean;
  audioAction?: {
    type: "set";
    audioId: string;
  };
};

export type flowDefaultNodeType = {
  characterCases?: Array<characterCaseType>;
  branchesText?: {
    [key: string]: string;
  };
} & flowNodeBaseType;

export type flowSplitterNodeType = {
  branchesText: {
    [key: string]: string;
  };
} & flowNodeBaseType;
