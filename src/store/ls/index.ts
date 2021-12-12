import { builders } from "react-dev-starter-pack/dist";
import { characterType } from "types";

export const lsController = builders.localStorage<{
  branches: Array<string>;
  elements: any;
  characters: Array<characterType>;
}>();
