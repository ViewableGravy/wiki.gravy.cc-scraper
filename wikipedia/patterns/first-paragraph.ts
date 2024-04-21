import type { OutputSections } from "../patternMatcher";
import { removeNodesByReference } from "../removeNodesByReference";
import type { Nodes } from "../types";

export const matchFirstParagraph = (
  input: Nodes,
  output: OutputSections
): boolean => {
  const [firstSection] = input;

  if (!firstSection) {
    throw new Error("Something went horribly wrong");
  }

  const hasSectionDelimiter = firstSection.some((node) => {
    return ["h2", "h1"].includes(node.tagName);
  });

  if (hasSectionDelimiter) {
    return false;
  }

  const paragraph = firstSection.find((node) => node.tagName === "p");

  if (paragraph) {
    const outputElements = [paragraph];
    output.push(["singleParagraph", outputElements]);
    removeNodesByReference(input, 0, outputElements);
    return true;
  }

  return false;
};
