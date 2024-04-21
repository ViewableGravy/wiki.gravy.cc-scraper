import type { OutputSections } from "../patternMatcher";
import { removeNodesByReference } from "../removeNodesByReference";
import type { Nodes } from "../types";

/**
 * This matcher will match a section where there is atleast one heading element and
 * atleast one paragraph element.
 */
export const matchH2SectionWithOnlyParagraphs = (
  input: Nodes,
  output: OutputSections
): boolean => {
  /* TODO - https://en.wikipedia.org/wiki/Rabbit */

  const [firstSection] = input;

  // Should always have an h2/h3/etc and 1 paragraph
  if (!firstSection || firstSection.length <= 1) {
    return false;
  }

  const [headingElement, ...remainingElements] = firstSection;

  if (headingElement.tagName !== "h2") {
    return false;
  }

  const remainingIsOnlyParagraph = remainingElements.every(
    (element) => element.tagName === "p"
  );

  if (!remainingIsOnlyParagraph) {
    return false;
  }

  output.push(["H2SectionWithOnlyParagraphs", firstSection]);
  removeNodesByReference(input, 0, firstSection);

  return false;
};
