import imageUrlBuilder from "@sanity/image-url";
import config from "../../../sanity.config";

const builder = imageUrlBuilder(config);

export const getImageSanity = (source: any) => {
  return builder.image(source).url();
};
