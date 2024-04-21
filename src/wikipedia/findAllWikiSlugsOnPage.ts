import { uniq } from "lodash-es";
import { $ } from "../cheerio";
import { isTag } from "./isTag";

const restrictedWikiSlugs = [
  "File:",
  "Help:",
  "Template:",
  "Template_talk:",
  "Special:",
  "Portal:",
  "Wikipedia:",
];

export const findAllWikiSlugsOnCurrentPage = async () => {
  const availableAdditionalPageSlugs = $("#mw-content-text a")
    .filter((_, entry) => {
      if (!isTag(entry) || !entry.attribs.href) {
        return false;
      }
      const href = entry.attribs.href;

      return (
        href.includes("/wiki/") &&
        !restrictedWikiSlugs.some((restrictedSlug) =>
          href.includes(restrictedSlug)
        ) &&
        !href.startsWith("#")
      );
    })
    .toArray()
    .map((el) => {
      return (el as cheerio.TagElement).attribs.href.split("/wiki/")[1];
    });

  return uniq(availableAdditionalPageSlugs);
};
