import { $ } from "../../cheerio";
import { isTag } from "../isTag";
import type { OutputSections } from "../patternMatcher";
import { removeNodesByReference } from "../removeNodesByReference";
import type { Nodes } from "../types";

export const matchInfoBoxWithKeyValueContentSelectors = {
  box: "infobox",
  rows: "tr",
  label: ".infobox-label",
  value: ".infobox-data",
  title: "th:first-child",
};

export const matchInfoBoxWithKeyValueContent = (
  input: Nodes,
  output: OutputSections
): boolean => {
  const [firstSection] = input;
  if (!firstSection) {
    throw new Error("Something went horribly wrong");
  }

  const selectorBox = firstSection.find((node) =>
    $(node).hasClass(matchInfoBoxWithKeyValueContentSelectors.box)
  );

  if (!selectorBox) {
    return false;
  }

  const [selectorTitle] = $(selectorBox)
    .find(matchInfoBoxWithKeyValueContentSelectors.title)
    .toArray();
  if (!selectorTitle || !isTag(selectorTitle)) return false;

  const rows = $(selectorBox)
    .find(matchInfoBoxWithKeyValueContentSelectors.rows)
    .toArray()
    .filter((el) => {
      if (!isTag(el)) return false;
      const selectorLabel = $(el).find(
        matchInfoBoxWithKeyValueContentSelectors.label
      );
      if (!selectorLabel.length) return false;
      const selectorValue = $(el).find(
        matchInfoBoxWithKeyValueContentSelectors.value
      );
      if (!selectorValue.length) return false;

      return true;
    }) as Array<cheerio.TagElement>;

  if (!rows.length) return false;

  output.push(["infoBox", [selectorTitle, undefined as any, ...rows]]);
  removeNodesByReference(input, 0, [selectorTitle, selectorBox]);

  return true;
};
