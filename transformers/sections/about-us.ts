import { sample } from "lodash-es";
import { getElementContent } from "../../wikipedia/getElementContent";
import type {
  ContextSelector,
  CreateFunction,
  TransformerMethod,
} from "./types";

export const createAboutUsData = (contextSelector: ContextSelector) => {
  return {
    properties: {
      colour_style: sample(["white", "black", "dark", "standard", "light"]),
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
  [paragraph]
) => {
  html = html.replace(data.properties.title, "");
  html = html.replace(
    data.properties.description,
    getElementContent(paragraph)
  );

  return html;
};

export const createAboutUsSectionData: CreateFunction<AboutUsData> = (
  nodes,
  { contextSelector, transformer }
) => {
  const data = createAboutUsData(contextSelector);
  return [data, (html) => transformer(html, data, nodes)];
};
