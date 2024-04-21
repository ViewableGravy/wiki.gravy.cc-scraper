import { placeholder } from "./consts";

export function createImageAttachment(url: string = placeholder.imageURL) {
  return {
    type: "link",
    url: url?.replace(/^\/\//, "https://"),
  };
}
