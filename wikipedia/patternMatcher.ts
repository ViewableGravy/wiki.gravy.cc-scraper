import Cheerio from "cheerio";
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

    break;
  }

  return output;
}

/**
 * Must be run first
 */
const matchHeroBanner = (input: Nodes, output: OutputSections): boolean => {
  const [firstSection] = input;
  console.log("input", input);

  if (!firstSection) {
    throw new Error("Something went horribly wrong");
  }

  const firstElement = firstSection[0];

  if (firstElement.tagName === "h1") {
    const firstParagraph = firstSection.find((node) => node.tagName === "p");

    const firstImage = input
      .flat()
      .reduce<undefined | cheerio.TagElement>((acc, node) => {
        const [image] = Cheerio(node).find("img.mw-file-element")?.toArray();
        if (!isTag(image)) return;

        if (image && !acc) {
          acc = image;
        }

        return acc;
      }, undefined);

    console.log("firstImage:", firstImage);

    if (firstParagraph && firstImage) {
      output.push(["heroBanner", [firstElement, firstParagraph, firstImage]]);

      input[0] = input[0].filter(
        (node) => [firstElement, firstParagraph].includes(node) === false
      );

      return true;
    }
  }

  return false;
};
