import { builders } from "react-dev-starter-pack/dist";
import { mainApi } from "api/index";
import { ImageApiDTO } from "api/image/types";

export const imageApi = {
  createImage: builders.api(
    ({ novell_id, ...body }: ImageApiDTO.createImage) => {
      return mainApi.post(`/image/${novell_id}`, body);
    }
  ),
  getImages: builders.api(({ novell_id, type }: ImageApiDTO.getImages) => {
    return mainApi.get(`/image/${novell_id}?type=${type}`);
  }),
  deleteAll: builders.api(() => {
    return mainApi.delete("/image");
  }),
};
