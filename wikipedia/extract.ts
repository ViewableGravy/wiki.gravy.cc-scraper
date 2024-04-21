/**
 * Common Patterns
 *
 * Basic Title With Paragraph
 *
 *
 * Hero Banner
 * - Main Page Title
 * - First Image in the content as background
 * - First Paragraph as description
 * - If there are more paragraphs before next delimiter, Treat them as seperate section
 * - default image if one does not exist on the page: `https://sadsexy.fun/images/videoframe_5546.png`
 *
 * Multiple figures directly after a delimiter
 * - Services List with Image Grid
 * - Delimiter for the section title
 * - First Paragraph goes in description
 * - figure caption in image Description
 * - If there are more paragraphs before next delimiter, Treat them as seperate section
 *
 * Any Ordered/Unordered Lists should be testimonials
 * - The Secondary Text should be the paragraph prior
 * - the head line should be invisible
 *
 * Spare Sections, what to do with??
 *
 * Delete Empty Tags (Empty Tags are not useful) - Make sure they don't have the special characters
 */

import { wikipediaContentIndex } from "./consts";
import { isTag } from "./isTag";
import { isElementEmpty } from "./isElementEmpty";
import { $ } from "../cheerio";

const filterNonEmptyNode = (node: cheerio.Element) => {
  if (!isTag(node)) {
    return false;
  }

  if (["p", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)) {
    return isElementEmpty(node);
  }

  return true;
};

export function extractNodes() {
  let sectionNumber = 0;

  const elements = $(".mw-content-ltr > *").toArray();
  const nonEmptyElements = elements.filter((element) => {
    return filterNonEmptyNode(element);
  });
  const [mainTitle] = $("h1").toArray();

  const finalNodes = nonEmptyElements.reduce<Array<Array<cheerio.TagElement>>>(
    (acc, val) => {
      if (isTag(val)) {
        if (val.name === wikipediaContentIndex["Main Section Delimiter"]) {
          sectionNumber++;
          acc[sectionNumber] = [val];
          return acc;
        }

        acc[sectionNumber].push(val);
      }

      return acc;
    },
    [[]]
  );

  if (isTag(mainTitle)) {
    finalNodes[0].unshift(mainTitle);
  }
  return finalNodes;
}
