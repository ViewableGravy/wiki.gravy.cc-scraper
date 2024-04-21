import type { OutputSections } from "../patternMatcher";
import { removeNodesByReference } from "../removeNodesByReference";
import type { Nodes } from "../types";
import { $ } from "../../cheerio";
import { isTag } from "../isTag";

/**
 * Must be run first
 */
export const matchHeroBanner = (
  input: Nodes,
  output: OutputSections
): boolean => {
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

      removeNodesByReference(input, 0, [firstElement, firstParagraph]);

      return true;
    }
  }

  return false;
};
