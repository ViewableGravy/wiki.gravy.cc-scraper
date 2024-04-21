import { $ } from "../cheerio";

export function isElementEmpty(element: cheerio.TagElement) {
  const text = $(element).text().trim();
  return Boolean(text);
}
