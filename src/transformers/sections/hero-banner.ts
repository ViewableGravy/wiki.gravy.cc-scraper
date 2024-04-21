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
import { $ } from "../../cheerio";
import { findSingleHatNoteWithLink } from "../findSingleHatNoteWithLink";
import { sanitiseElementsInChildren } from "../sanitiseElementsInChildren";

/***** TYPE DEFINITIONS *****/
type HeroBannerData = ReturnType<typeof createHeroBannerData>;

export const createHeroBannerData = (
  contextSelector: ContextSelector,
  nodes: cheerio.TagElement[]
) => {
  const hasSingleHatNoteWithLink = findSingleHatNoteWithLink(nodes);
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
        value: contextSelector.url("call_to_action.value"),
        enabled: Boolean(hasSingleHatNoteWithLink),
      },
      image: createImageAttachment(contextSelector.url("image")),
    },
    style: "photo_background",
    section_id: "katana.v1.hero",
  };
};

export const firstSectionHeroBannerTransformer: TransformerMethod<
  HeroBannerData
> = (html, data, [title, paragraph, imageElement, hatnote]) => {
  html = html.replace(data.properties.title, getElementContent(title));
  html = html.replace(data.properties.subtitle, getElementContent(paragraph));

  const imageSource = getOriginalImageSource(imageElement?.attribs?.src);
  html = html.replace(data.properties.image.url, imageSource);

  if (data.properties.call_to_action.enabled && hatnote) {
    const link = $(hatnote).find("a").attr("href") ?? "";
    console.log("link", link);
    html = html.replace(data.properties.call_to_action.value, link);

    const sanitisedHatNote = sanitiseElementsInChildren(hatnote, "a", "span");

    html = html.replace(
      data.properties.call_to_action.text,
      typeof sanitisedHatNote === "string"
        ? sanitisedHatNote
        : getElementContent(sanitisedHatNote)
    );
  }
  return html;
};

export const createHeroBannerSectionData: CreateFunction<HeroBannerData> = (
  nodes,
  { contextSelector, transformer }
) => {
  const data = createHeroBannerData(contextSelector, nodes);
  return [data, (html) => transformer(html, data, nodes)];
};
