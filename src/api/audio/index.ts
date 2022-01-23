import { builders } from "react-dev-starter-pack/dist";
import { mainApi } from "api/index";
import { AudioTypesDTO } from "api/audio/types";

export const audioApi = {
  create: builders.api(({ novell_id, ...body }: AudioTypesDTO.createAudio) => {
    return mainApi.post(`/audio/${novell_id}`, body);
  }),
  get: builders.api(({ novell_id }: AudioTypesDTO.getAudio) => {
    return mainApi.get(`/audio/${novell_id}`);
  }),
  deleteAll: builders.api(() => {
    return mainApi.delete("/audio");
  }),
};
