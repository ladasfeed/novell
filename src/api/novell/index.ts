import { builders } from "react-dev-starter-pack/dist";
import { NovellApiDTO } from "api/novell/types";
import { mainApi } from "api/index";

export const novellApi = {
  create: builders.api((body: NovellApiDTO.createNovellType) => {
    return mainApi.post("/novell", body);
  }),
  update: builders.api(({ id, ...body }: NovellApiDTO.updateNovellType) => {
    return mainApi.put(`/novell/${id}`, body);
  }),
  get: builders.api(() => {
    return mainApi.get("/novell");
  }),
};
