import { matchRemainingParagraphs } from "./patterns/match-remaining-paragraphs";
import { matchHeroBanner } from "./patterns/hero-banner";
import { matchInfoBoxWithKeyValueContent } from "./patterns/infobox-key-value";
import type { Nodes } from "./types";
import fs from "fs";
import { matchH2SectionWithOnlyParagraphs } from "./patterns/only-paragraphs";
import { has } from "lodash-es";
import { matchH3WithOnlyParagraphsBeforeAnotherH3 } from "./patterns/h3-only-paragraphs-before-another-h3";
import { matchAmbiguousPage } from "./patterns/ambigouos-page";

export type SectionNames =
  | "heroBanner"
  | "singleParagraph"
  | "infoBox"
  | "H2SectionWithOnlyParagraphs"
  | "ambiguousPage"
  | "H2WithH3AndPDirectSiblings";
export type OutputSection = [
  sectionName: SectionNames,
  nodes: Array<cheerio.TagElement>
];
export type OutputSections = Array<OutputSection>;

type SpareInputData = {
  tagName: string;
  id: string;
  classes: string;
};
const spareMutableInputs: Record<string, Array<Array<SpareInputData>>> = {};
export async function matchElementPattern(input: Nodes, wikiSlug: string) {
  const mutableInput = [...input];
  const output: OutputSections = [];

  while (mutableInput.length > 0) {
    // H1 specificity
    if (matchHeroBanner(mutableInput, output)) continue;
    if (matchInfoBoxWithKeyValueContent(mutableInput, output)) continue;

    // H3 specificity
    if (matchH3WithOnlyParagraphsBeforeAnotherH3(mutableInput, output))
      continue;

    if (matchAmbiguousPage(mutableInput, output)) continue;

    // H2 specificity
    if (matchH2SectionWithOnlyParagraphs(mutableInput, output)) continue;

    // Should go last as a cleaner
    if (matchRemainingParagraphs(mutableInput, output)) continue;

    const shiftedInput = mutableInput.shift();

    if (shiftedInput?.length) {
      if (!has(spareMutableInputs, wikiSlug)) {
        spareMutableInputs[wikiSlug] = [];
      }
      spareMutableInputs[wikiSlug].push(
        shiftedInput.map((element) => ({
          tagName: element.tagName,
          id: element.attribs.id,
          classes: element.attribs.class,
        }))
      );
    }
  }

  // await fs.writeFileSync(
  //   "output.json",
  //   JSON.stringify(spareMutableInputs, null, 2),
  //   "utf-8"
  // );

  return output;
}
