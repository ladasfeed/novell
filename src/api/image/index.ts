import { builders } from "react-dev-starter-pack/dist";
import { mainApi } from "api/index";
import { ImageApiDTO } from "api/image/types";

export const imageApi = {
  createImage: builders.api((body: ImageApiDTO.createImage) => {
    return mainApi.post("/image", body);
  }),
  getImages: builders.api((query: ImageApiDTO.getImages) => {
    return mainApi.get(`/image?type=${query.type}`);
  }),
  deleteAll: builders.api(() => {
    return mainApi.delete("/image");
  }),
};
