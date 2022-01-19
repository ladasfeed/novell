import { NovellType } from "types";

export declare namespace NovellApiDTO {
  export type createNovellType = NovellType;
  export type updateNovellType = NovellType & {
    id: string;
  };
}
