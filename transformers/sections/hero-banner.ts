import { isTag } from "../../wikipedia/isTag";
import { getElementContent } from "../../wikipedia/getElementContent";
import { getOriginalImageSource } from "../../wikipedia/getOriginalImageSource";
import type {
  ContextSelector,
  CreateFunction,
  TransformerMethod,
} from "./types";
import { createImageAttachment } from "../createImageAttachment";
import { sample } from "lodash-es";

/***** TYPE DEFINITIONS *****/
type HeroBannerData = ReturnType<typeof createHeroBannerData>;

export const createHeroBannerData = (contextSelector: ContextSelector) => {
  return {
    properties: {
      content_layout: "left_aligned",
      colour_style: "black",
      // colour_style: sample(["dark", "black"]),
      title: contextSelector("title"),
      subtitle: contextSelector("subtitle"),
      call_to_action: {
        type: "link",
        text: contextSelector("call_to_action.text"),
        value: "en.wikipedia.org",
        enabled: false,
      },
      image: createImageAttachment(contextSelector.image("image")),
    },
    style: "photo_background",
    section_id: "katana.v1.hero",
  };
};

export const firstSectionHeroBannerTransformer: TransformerMethod<
  HeroBannerData
> = (html, data, [title, paragraph, imageElement]) => {
  if (isTag(title)) {
    html = html.replace(data.properties.title, getElementContent(title));
  }
  if (isTag(paragraph)) {
    html = html.replace(data.properties.subtitle, getElementContent(paragraph));
  }

  if (isTag(imageElement)) {
    const imageSource = getOriginalImageSource(imageElement?.attribs?.src);
    html = html.replace(data.properties.image.url, imageSource);
  }

  return html;
};

export const createHeroBannerSectionData: CreateFunction<HeroBannerData> = (
  nodes,
  { contextSelector, transformer }
) => {
  const data = createHeroBannerData(contextSelector);
  return [data, (html) => transformer(html, data, nodes)];
};
