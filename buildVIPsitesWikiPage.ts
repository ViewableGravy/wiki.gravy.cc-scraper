import { cleanAllExistingSectionIds } from "./cleanExistingVIPsitesSections";
import { createSection } from "./createSection";
import { generatePreview } from "./generatePreview";
import { formatForKatana } from "./katana/format";
import { publishToWikiGravy } from "./publishToWikiGravy";
import { extractWikipediaPage } from "./wikipedia/extract";
import { fetchWikipediaPage } from "./wikipedia/fetch";

export async function buildVIPsitesWikiPage(
  wikiSlug: string
): Promise<string[]> {
  // Step 1: Clean up existing VIPsites sections
  console.log("Step 1: Clean up existing VIPsites sections");

  const cleanSuccess = await cleanAllExistingSectionIds();
  if (!cleanSuccess) {
    console.log("Failed to clean existing VIPsites sections");
    return [];
  } else {
    console.log("Successfully cleaned existing VIPsites sections");
  }

  // Step 2: Fetch the wikipedia page
  console.log("Step 2: Fetch the wikipedia page");
  const cheerio = await fetchWikipediaPage(wikiSlug);

  // Step 3: Extract all relevenat wiki data
  console.log("Step 3: Extract all relevenat wiki data");
  const extractedPage = extractWikipediaPage(cheerio);

  // Step 4: Format data into desired VIPsites section format
  console.log("Step 4: Format data into desired VIPsites section format");
  const formatted = formatForKatana(extractedPage);

  // Step 5: Populate VIPsites sections with formatted data
  console.log("Step 5: Populate VIPsites sections with formatted data");
  await createSection(formatted);

  // Step 6: Get the preview site
  console.log("Step 6: Get the preview site");
  const generatedPreview = await generatePreview();
  console.log("generatedPreview", generatedPreview);

  // Step 7: Provide site to server
  console.log("Step 7: Provide site to server");
  await publishToWikiGravy(generatedPreview, wikiSlug);

  // Step 8: Return the all found additional wiki slugs
  console.log("Step 8: Return the all found additional wiki slugs");
  return [];
}
