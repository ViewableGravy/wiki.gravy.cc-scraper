import { $ } from "../cheerio";

export const findSingleHatNoteWithLink = (nodes: cheerio.TagElement[]) => {
  return nodes.find(
    (node) =>
      node.tagName === "div" &&
      node.attribs.class &&
      node.attribs.class.includes("hatnote") &&
      $(node).find("a[href]").length
  );
};
