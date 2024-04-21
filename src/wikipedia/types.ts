import type { OutputSections } from "./patternMatcher";

export type Nodes = Array<Array<cheerio.TagElement>>;
export type Matcher = (input: Nodes, output: OutputSections) => boolean;
