import type { OutputSections } from "../patternMatcher";
import { removeNodesByReference } from "../removeNodesByReference";
import type { Nodes } from "../types";

export const matchRemainingParagraphs = (
  input: Nodes,
  output: OutputSections
): boolean => {
  const [firstSection] = input;
  if (!firstSection) {
    throw new Error("Something went horribly wrong");
  }

  const hasSectionDelimiter = firstSection.some((node) => {
    return ["h4", "h3", "h2", "h1"].includes(node.tagName);
  });

  if (hasSectionDelimiter) {
    return false;
  }

  const paragraphs = firstSection.filter((node) => node.tagName === "p");

  if (paragraphs.length) {
    output.push(["singleParagraph", paragraphs]);
    removeNodesByReference(input, 0, paragraphs);
    return true;
  }

  return false;
};
