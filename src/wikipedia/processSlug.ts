import { extractNodes } from "./extract";
import { fetchWikipediaPage } from "./fetch";
import { manipulateRootBeforeExtract } from "./manipulateRootBeforeExtract";
import { matchElementPattern } from "./patternMatcher";

export async function processSlug(wikiSlug: string) {
  await fetchWikipediaPage(wikiSlug);

  manipulateRootBeforeExtract();

  const nodeList = extractNodes();

  const matchedElementPatterns = await matchElementPattern(nodeList, wikiSlug);

  return matchedElementPatterns;
}
