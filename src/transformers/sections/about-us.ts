import { sample } from "lodash-es";
import { getElementContent } from "../../wikipedia/getElementContent";
import type {
  ContextSelector,
  CreateFunction,
  TransformerMethod,
} from "./types";
import { splitParagraphsToContent } from "../splitParagraphsToContent";

export const createAboutUsData = (contextSelector: ContextSelector) => {
  return {
    properties: {
      colour_style: sample(["white", "black", "dark", "light"]),
      title: contextSelector("title"),
      description: contextSelector("description"),
    },
    style: "no_image",
    section_id: "katana.v1.about",
  };
};

type AboutUsData = ReturnType<typeof createAboutUsData>;

export const singleParagraphTransformer: TransformerMethod<AboutUsData> = (
  html,
  data,
  paragraphs
) => {
  html = html.replace(data.properties.title, "");

  const combinedParagraphs = splitParagraphsToContent(paragraphs)

  html = html.replace(data.properties.description, combinedParagraphs);

  return html;
};

export const H2SectionWithOnlyParagraphsTransformer: TransformerMethod<
  AboutUsData
> = (html, data, [title, ...paragraphs]) => {
  const combinedParagraphs = paragraphs
    .map(getElementContent)
    .join("<br/><br/><br/>");

  html = html.replace(data.properties.title, getElementContent(title));
  html = html.replace(data.properties.description, combinedParagraphs);

  return html;
};

export const createAboutUsSectionData: CreateFunction<AboutUsData> = (
  nodes,
  { contextSelector, transformer }
) => {
  const data = createAboutUsData(contextSelector);

  return [data, (html) => transformer(html, data, nodes)];
};
