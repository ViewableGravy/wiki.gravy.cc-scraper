import { isTag } from "../../wikipedia/isTag";
import { createImageAttachment } from "../createImageAttachment";

import cheerio from "cheerio";
import type { CreateSectionData } from "./types";
import { getElementContent } from "../../wikipedia/getElementContent";

export function createHeroBannerData(
  [title, paragraph, figure]: cheerio.TagElement[],
  options: { contextSelector: (content: string) => string }
): CreateSectionData {
  const katanaData = {
    properties: {
      content_layout: "centered",
      colour_style: "standard",
      title: options.contextSelector("title"),
      subtitle: options.contextSelector("subtitle"),
      call_to_action: {
        type: "link",
        text: options.contextSelector("call_to_action.text"),
        value: "en.wikipedia.org",
        enabled: false,
      },
      image: createImageAttachment(figure?.attribs?.src),
    },
    style: "gradient_top",
    section_id: "katana.v1.hero",
  };

  // console.log(katanaData.properties.subtitle);

  const transformHTML = (html: string) => {
    if (isTag(title)) {
      html = html.replace(
        katanaData.properties.title,
        getElementContent(title)
      );
    }
    if (isTag(paragraph)) {
      // console.log("cheerio.html(paragraph)", cheerio.html(paragraph));
      html = html.replace(
        katanaData.properties.subtitle,
        cheerio.html(paragraph)
      );
    }

    return html;
  };

  return [katanaData, transformHTML];
}
