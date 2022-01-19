import { builders } from "react-dev-starter-pack/dist";
import { chaptersObjectType, characterType } from "types";

export const lsController = builders.localStorage<{
  branches: Array<string>;
  chapters: chaptersObjectType;
  characters: Array<characterType>;
  variables: Array<string>;
  novellId: string;
}>();
