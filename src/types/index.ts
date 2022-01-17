import { Connection, Edge, Elements, FlowElement } from "react-flow-renderer";
import { Node } from "react-flow-renderer/dist/types";

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

export type actFrameType = {
  text: string;
  charactersCases: Array<characterCaseType>;
};

export type actType = Array<actFrameType>;

export type nodeDataType = {
  act?: actType;
  imgId?: string;
  isEndNode?: boolean;
  isRootNode?: boolean;
  nextChapter?: string;
  audioAction?: {
    type: "set";
    audioId: string;
  };
  branch?: string;
  characterCases?: Array<characterCaseType>;

  // splitter only
  branches?: Array<string>;
  branchesText?: Array<{
    branch: string;
    text: string;
  }>;
};

export type reactFlowNodeType = Node<nodeDataType>;
