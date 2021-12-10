import { builders } from "react-dev-starter-pack/dist";

export const lsController = builders.localStorage<{
  branches: Array<string>;
  elements: any;
}>();
