import { $ } from "../cheerio";

export const sanitiseElementsInChildren = (
  node: cheerio.TagElement,
  tagName: string,
  targetTagName: string
) => {
  const nodeCheerio = $(node);
  const foundTagNames = nodeCheerio.has(tagName).toArray();
  const hasTagName = Boolean(foundTagNames.length);
  if (!hasTagName) return node;
  const replacedHTML = nodeCheerio
    .html()
    ?.replaceAll(`<${tagName}`, `<${targetTagName}`)
    ?.replaceAll(`</${tagName}>`, `</${targetTagName}>`);
  return replacedHTML ?? node;
};
