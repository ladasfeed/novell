export declare namespace ImageApiDTO {
  type imageType = "character" | "background";
  type createImage = {
    value: string;
    name: string;
    type: imageType;
    novell_id: string;
  };
  type getImages = {
    type: imageType;
    novell_id: string;
  };
}
