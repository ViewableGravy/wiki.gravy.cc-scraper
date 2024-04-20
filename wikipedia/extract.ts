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

export const extractWikipediaPage = (cheerio: cheerio.Root) => {
  console.log({
    title: cheerio(".mw-page-title-main").first().text(),
  });

  return {
    title: cheerio(".mw-page-title-main").first().text(),
  };
};

export function extractNodes(cheerio: cheerio.Root) {
  let sectionNumber = 0;

  const elements = cheerio(".mw-content-ltr > *").toArray();
  const [mainTitle] = cheerio("h1").toArray();

  const finalNodes = elements.reduce<Array<Array<cheerio.TagElement>>>(
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
