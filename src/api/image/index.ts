import { builders } from "react-dev-starter-pack/dist";
import { mainApi } from "api/index";

export const imageApi = {
  createImage: builders.api((body: any) => {
    return mainApi.post("/image", body);
  }),
  getImages: builders.api(() => {
    return mainApi.get("/image");
  }),
};
