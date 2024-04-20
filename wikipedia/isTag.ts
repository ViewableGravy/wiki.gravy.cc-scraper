export const isTag = (
  element: cheerio.Element
): element is cheerio.TagElement => {
  return element?.type === "tag";
};
