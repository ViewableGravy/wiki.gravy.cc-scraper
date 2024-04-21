import { sample, times } from "lodash-es";
import { createImageAttachment } from "../createImageAttachment";
import {
  type ContextSelector,
  type CreateFunction,
  type TransformerMethod,
} from "./types";
import { getElementContent } from "../../wikipedia/getElementContent";
import { splitParagraphsToContent } from "../splitParagraphsToContent";

/***** TYPE DEFINITIONS *****/
type ServicesListData = ReturnType<typeof createServicesListData>;

export const createServicesListData = (
  contextSelector: ContextSelector,
  nodes: cheerio.TagElement[]
) => {
  const [title, description, heading, ...spareServices] = nodes;
  const numberOfServices = [heading, ...spareServices].filter(
    ({ tagName }) => tagName === heading.tagName
  ).length;

  return {
    properties: {
      colour_style: sample(["light", "dark", "white", "black", "standard"]),
      title: contextSelector("title"),
      description: contextSelector("description"),
      services: times(numberOfServices, (index) => ({
        heading: contextSelector(`heading--${index}`),
        description: contextSelector(`description--${index}`),
        image: createImageAttachment(),
      })),
    },
    style: "stacked",
    section_id: "katana.v1.services",
  };
};

type ServiceListTransformers = {
  h2WithH3AndPDirectSiblings: TransformerMethod<ServicesListData>;
};

export const ServiceListTransformers: ServiceListTransformers = {
  h2WithH3AndPDirectSiblings(html, data, [title, description, ...rest]) {
    // group into groups of [h3, ...p] so indexes match services object

    // const groups = [];
    // let currentGroup = [];
    const groups = rest.reduce<Array<Array<cheerio.TagElement>>>(
      (acc, node) => {
        if (node.tagName === "h3") {
          acc.push([node]);
        }
        if (node.tagName === "p") {
          acc[acc.length - 1].push(node);
        }

        return acc;
      },
      []
    );

    html = html.replace(data.properties.title, getElementContent(title));
    html = html.replace(data.properties.description, "");

    groups.forEach((nodes, index) => {
      const [heading, ...paragraphs] = nodes;
      const currentService = data.properties.services[index];
      html = html.replace(currentService.heading, getElementContent(heading));

      const combinedParagraphs = splitParagraphsToContent(paragraphs);
      html = html.replace(currentService.description, combinedParagraphs);
    });

    return html;
  },
};

export const createServicesListSectionData: CreateFunction<ServicesListData> = (
  nodes,
  { contextSelector, transformer }
) => {
  const data = createServicesListData(contextSelector, nodes);
  return [data, (html) => transformer(html, data, nodes)];
};
