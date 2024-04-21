import { getElementContent } from "../wikipedia/getElementContent";

export const splitParagraphsToContent = (paragraphs: cheerio.TagElement[]) => {
  return paragraphs.map(getElementContent).join("<br/><br/><br/>");
};
