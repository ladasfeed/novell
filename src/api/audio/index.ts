import { builders } from "react-dev-starter-pack/dist";
import { mainApi } from "api/index";

export const audioApi = {
  create: builders.api((body: any) => {
    return mainApi.post("/audio", body);
  }),
  get: builders.api(() => {
    return mainApi.get("/audio");
  }),
  deleteAll: builders.api(() => {
    return mainApi.delete("/audio");
  }),
};
