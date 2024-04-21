import { cleanAllExistingSectionIds } from "./cleanExistingVIPsitesSections";
import { createSection, createSectionsFromSectionData } from "./createSection";
import { generatePreview } from "./generatePreview";
import { formatForKatana } from "./transformers/format";
import { publishToWikiGravy } from "./publishToWikiGravy";
import { performPreviewTransform } from "./transformers/performPreviewTransform";
import { processSlug } from "./wikipedia/processSlug";
import { applySectionOrder } from "./applySectionOrder";
import { scrapeSlug } from "./slug-utils";
import { $ } from "./cheerio";
import { isTag } from "./wikipedia/isTag";
import { findAllWikiSlugsOnCurrentPage } from "./wikipedia/findAllWikiSlugsOnPage";

export async function buildVIPsitesWikiPage(
  wikiSlug: string
): Promise<string[]> {
  // Step 0: Clean up existing VIPsites sections
  console.log("Step 0: Clean up existing VIPsites sections");

  const cleanSuccess = await cleanAllExistingSectionIds();
  if (!cleanSuccess) {
    console.log("Failed to clean existing VIPsites sections");
    return [];
  } else {
    console.log("Successfully cleaned existing VIPsites sections");
  }

  // Step 1: Extract Sectinos from the wikipedia page
  console.log("Step 1: Extract Sectinos from the wikipedia page");
  const sectionsOutput = await processSlug(wikiSlug);

  const slugs = findAllWikiSlugsOnCurrentPage();

  // Step 2: Check for scrape of slug
  console.log("Step 2: Check for scrape of slug");
  const scrapeMarkResult = await scrapeSlug(wikiSlug);
  if (scrapeMarkResult) {
    console.log("Already scraped this slug, ", wikiSlug);
    return slugs;
  }

  // Step 3: Format data into desired VIPsites section format
  console.log("Step 3: Format data into desired VIPsites section format");
  const createSectionsData = formatForKatana(sectionsOutput);

  // Step 4: Populate VIPsites sections with formatted data
  console.log("Step 4: Populate VIPsites sections with formatted data");
  const sectionIDData = await createSectionsFromSectionData(createSectionsData);

  if (sectionIDData.length === 0) {
    return slugs;
  }
  // Step 5: Apply Section Order
  console.log("Step 5: Apply Section Order");
  await applySectionOrder(sectionIDData.map(({ id }) => id));

  // Step 6: Get the preview site
  console.log("Step 6: Get the preview site");
  const generatedPreview = await generatePreview();

  // Step 7: Transform returned html to contain actual data DUUUHH
  console.log("Step 7: Transform returned html to contain actual data DUUUHH");
  const transformedHTML = performPreviewTransform(
    generatedPreview,
    createSectionsData,
    sectionIDData
  );

  // Step 8: Provide site to server
  console.log("Step 8: Provide site to server");
  await publishToWikiGravy(transformedHTML, wikiSlug);

  // Step 9: Clean up existing VIPsites sections
  console.log("Step 9: Clean up existing VIPsites sections");
  await cleanAllExistingSectionIds();

  // Step 10: Return the all found additional wiki slugs
  console.log("Step 10: Return the all found additional wiki slugs");

  console.log(`URL: https://wiki.gravy.cc/wiki/${wikiSlug}`);
  return slugs;
}
