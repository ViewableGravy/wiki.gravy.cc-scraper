import { extractNodes } from "./extract";
import { fetchWikipediaPage } from "./fetch";
import { matchElementPattern } from "./patternMatcher";

export async function processSlug(wikiSlug: string) {
  const pageData = await fetchWikipediaPage(wikiSlug);

  const nodeList = extractNodes(pageData);

  const matchedElementPatterns = matchElementPattern(nodeList);

  return matchedElementPatterns;
}
