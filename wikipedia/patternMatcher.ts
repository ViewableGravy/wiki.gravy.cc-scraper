import $ from "cheerio";
import { remove } from "lodash-es";
import { isTag } from "./isTag";

type Nodes = Array<Array<cheerio.TagElement>>;

export type SectionNames = "heroBanner";
export type OutputSection = [
  sectionName: SectionNames,
  nodes: Array<cheerio.TagElement>
];
export type OutputSections = Array<OutputSection>;

export function matchElementPattern(input: Nodes) {
  const mutableInput = [...input];
  const output: OutputSections = [];

  while (mutableInput.length > 0) {
    if (matchHeroBanner(mutableInput, output)) continue;
    if (matchFirstParagraph(mutableInput, output)) continue;

    break;
  }

  return output;
}

const removeNodesByReference = (
  input: Nodes,
  index: number,
  nodesToRemove: Array<cheerio.TagElement>
) => {
  input[index] = input[index].filter((node) => nodesToRemove.includes(node) === false);
};

/**
 * Must be run first
 */
const matchHeroBanner = (input: Nodes, output: OutputSections): boolean => {
  const [firstSection] = input;

  if (!firstSection) {
    throw new Error("Something went horribly wrong");
  }

  const firstElement = firstSection[0];

  if (firstElement.tagName === "h1") {
    const firstParagraph = firstSection.find((node) => node.tagName === "p");

    const [firstImage] = input
      .flat()
      .reduce<Array<cheerio.TagElement>>((acc, node) => {
        const [image] = $(node).find("img.mw-file-element")?.toArray();

        if (!isTag(image)) return acc;
        if (image) acc.push(image);

        return acc;
      }, [] as cheerio.TagElement[]);

    if (firstParagraph && firstImage) {
      output.push(["heroBanner", [firstElement, firstParagraph, firstImage]]);

      removeNodesByReference(input, 0, [
        firstElement,
        firstParagraph,
      ]);

      return true;
    }
  }

  return false;
};

const matchFirstParagraph = (input: Nodes, output: OutputSections): boolean => {
  const [section] = input;

  const hasSectionDelimiter = section.some((node) => {
    return ["h2", "h1"].includes(node.tagName);
  });

  if (hasSectionDelimiter) {
    return false;
  }

  const paragraphs = section.filter((node) => node.tagName === "p");

  return false;
};
