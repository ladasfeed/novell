import { Connection, Edge, Elements, FlowElement } from "react-flow-renderer";

export type EdgeUnionType = Edge<any> | Connection;

export type fileType = {
  path: string;
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
  isRootNode?: boolean;
  nextChapter?: string;
  audioAction?: {
    type: "set";
    audioId: string;
  };
  branch?: string;
  branches?: Array<string>;
};

export type flowDefaultNodeType = {
  characterCases?: Array<characterCaseType>;
  branchesText?: Array<{
    branch: string;
    text: string;
  }>;
} & flowNodeBaseType;

export type reactFlowNodeType = FlowElement<flowDefaultNodeType>;

let ss: reactFlowNodeType;
