import { $ } from "../cheerio";

export function isElementEmpty(element: cheerio.TagElement) {
  const text = $(element).text().trim();
  console.log("text", text);
  return Boolean(text);
}
