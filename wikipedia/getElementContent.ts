import { $ } from "../cheerio";

export function getElementContent(element: cheerio.TagElement) {
  return $(element).html() ?? "";
}
