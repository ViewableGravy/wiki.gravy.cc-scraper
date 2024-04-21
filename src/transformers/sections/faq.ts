import { isTag } from "../../wikipedia/isTag";
import { getElementContent } from "../../wikipedia/getElementContent";
import { getOriginalImageSource } from "../../wikipedia/getOriginalImageSource";
import type {
  ContextSelector,
  CreateFunction,
  TransformerMethod,
} from "./types";
import { createImageAttachment } from "../createImageAttachment";
import { has, sample, times } from "lodash-es";
import { matchInfoBoxWithKeyValueContentSelectors } from "../../wikipedia/patterns/infobox-key-value";
import { $ } from "../../cheerio";

/***** TYPE DEFINITIONS *****/
type FAQData = ReturnType<typeof createFaqData>;

export function createFaqData(
  contextSelector: ContextSelector,
  nodes: cheerio.TagElement[]
) {
  const [, , ...faqs] = nodes;

  return {
    properties: {
      colour_style: "standard",
      title: contextSelector("title"),
      subtext: contextSelector("subtext"),
      frequently_asked_questions: times(faqs.length, (index) => ({
        question: contextSelector(`question--${index}`),
        answer: contextSelector(`answer--${index}`),
      })),
    },
    section_id: "katana.v1.faq",
  };
}

export const mainInfoBoxTransformer: TransformerMethod<FAQData> = (
  html,
  data,
  [title, subtext, ...faqs]
) => {
  const formattedKeyValues = faqs.map((row) => {
    const selectorLabel = $(row).find(
      matchInfoBoxWithKeyValueContentSelectors.label
    );
    const selectorValue = $(row).find(
      matchInfoBoxWithKeyValueContentSelectors.value
    );

    return {
      key: selectorLabel.html(),
      value: selectorValue.html(),
    };
  });

  html = html.replace(data.properties.title, getElementContent(title));
  html = html.replace(data.properties.subtext, "");

  formattedKeyValues.forEach(({ key, value }, index) => {
    if (!key || !value) return;

    html = html.replace(
      data.properties.frequently_asked_questions[index].question,
      key
    );
    html = html.replace(
      data.properties.frequently_asked_questions[index].answer,
      value
    );
  });

  return html;
};

export const createFaqSectionData: CreateFunction<FAQData> = (
  nodes,
  { contextSelector, transformer }
) => {
  const data = createFaqData(contextSelector, nodes);
  return [data, (html) => transformer(html, data, nodes)];
};
