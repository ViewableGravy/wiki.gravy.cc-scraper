import { extractNodes } from "./extract";
import { fetchWikipediaPage } from "./fetch";
import { matchElementPattern } from "./patternMatcher";

export async function processSlug(wikiSlug: string) {
  await fetchWikipediaPage(wikiSlug);

  const nodeList = extractNodes();

  const matchedElementPatterns = matchElementPattern(nodeList);

  return matchedElementPatterns;
}
