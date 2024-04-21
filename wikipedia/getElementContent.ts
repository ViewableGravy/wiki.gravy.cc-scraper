import cheerio from "cheerio";

export function getElementContent(element: cheerio.TagElement) {
  return cheerio.load(element)("*").html() ?? "";
}
