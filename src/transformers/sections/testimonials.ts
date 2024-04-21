import { times } from "lodash-es";
import type {
  ContextSelector,
  CreateFunction,
  TransformerMethod,
} from "./types";
import { $ } from "../../cheerio";
import { getElementContent } from "../../wikipedia/getElementContent";
import { sanitiseElementsInChildren } from "../sanitiseElementsInChildren";
import { isTag } from "../../wikipedia/isTag";

type TestimonialData = ReturnType<typeof createTestimonialData>;

export const createTestimonialData = (
  contextSelector: ContextSelector,
  [title, list]: cheerio.TagElement[]
) => {
  const numberOfEntries = $(list).find("li").length;
  return {
    properties: {
      colour_style: "white",
      title: contextSelector("title"),
      subtext: contextSelector("subtext"),
      testimonials: times(numberOfEntries, (index) => ({
        quote: contextSelector(`quote--${index}`),
        name: contextSelector(`name--${index}`),
        company_or_position: contextSelector(`company_or_position--${index}`),
      })),
    },
    section_id: "katana.v1.testimonials",
  };
};

type TestimonialTransformers = {
  Ambiguous: TransformerMethod<TestimonialData>;
};

export const TestimonialTransformers: TestimonialTransformers = {
  Ambiguous(html, data, nodes) {
    const [title, list] = nodes;

    html = html.replace(data.properties.title, getElementContent(title));
    html = html.replace(data.properties.subtext, "");

    $(list)
      .find("> li")
      .toArray()
      .forEach((li, index) => {
        const entry = data.properties.testimonials[index];
        if (!isTag(li)) return;
        const sanitised = sanitiseElementsInChildren(li, "ul", "span");
        const sanitisedCheerio = $(sanitised);
        const aTag = sanitisedCheerio.find("a").first();
        const aTagHTML = aTag.html()?.trim();
        aTag.remove();
        html = html.replace(
          entry.quote,
          sanitisedCheerio.html()?.trim()?.replace(/^, /, "") ?? ""
        );

        html = html.replace(entry.name, aTagHTML ?? "");
        html = html.replace(entry.company_or_position, "");
      });

    return html;
  },
};

export const createTestimonialsSectionData: CreateFunction<TestimonialData> = (
  nodes,
  { contextSelector, transformer }
) => {
  const data = createTestimonialData(contextSelector, nodes);
  return [data, (html) => transformer(html, data, nodes)];
};
