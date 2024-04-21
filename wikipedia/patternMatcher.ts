import { matchFirstParagraph } from "./patterns/first-paragraph";
import { matchHeroBanner } from "./patterns/hero-banner";
import type { Nodes } from "./types";

export type SectionNames = "heroBanner" | "singleParagraph";
export type OutputSection = [
  sectionName: SectionNames,
  nodes: Array<cheerio.TagElement>
];
export type OutputSections = Array<OutputSection>;

export function matchElementPattern(input: Nodes) {
  const mutableInput = [...input];
  const output: OutputSections = [];

  while (mutableInput.length > 0) {
    if (matchHeroBanner(mutableInput, output)) continue;
    if (matchFirstParagraph(mutableInput, output)) continue;

    break;
  }

  return output;
}
