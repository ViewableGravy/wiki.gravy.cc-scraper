import { chunk } from "lodash-es";
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
  if (rows.length > 20) {
    console.log("THIS HAS MORE THAN 20");
  }

  chunk(rows, 20).forEach((chunkedRows, index) => {
    output.push([
      "infoBox",
      [
        index === 0 ? selectorTitle : (undefined as any),
        undefined as any,
        ...chunkedRows,
      ],
    ]);
  });
  removeNodesByReference(input, 0, [selectorTitle, selectorBox]);

  return true;
};
