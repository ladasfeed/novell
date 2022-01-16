export declare namespace ImageApiDTO {
  type imageType = "character" | "background";
  type createImage = {
    value: string;
    name: string;
    type: imageType;
  };
  type getImages = {
    type: imageType;
  };
}
