import { cleanAllExistingSectionIds } from "./cleanExistingVIPsitesSections";
import { createSection, createSectionsFromSectionData } from "./createSection";
import { generatePreview } from "./generatePreview";
import { formatForKatana } from "./katana/format";
import { publishToWikiGravy } from "./publishToWikiGravy";
import { performPreviewTransform } from "./transformers/performPreviewTransform";
import { processSlug } from "./wikipedia/processSlug";

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

  // Step 2: Extract Sectinos from the wikipedia page
  console.log("Step 2: Extract Sectinos from the wikipedia page");
  const sectionsOutput = await processSlug(wikiSlug);

  // Step 4: Format data into desired VIPsites section format
  console.log("Step 4: Format data into desired VIPsites section format");
  const createSectionsData = formatForKatana(sectionsOutput);
  console.log("createSectionsData", createSectionsData);

  // Step 5: Populate VIPsites sections with formatted data
  console.log("Step 5: Populate VIPsites sections with formatted data");
  await createSectionsFromSectionData(createSectionsData);

  // Step 6: Get the preview site
  console.log("Step 6: Get the preview site");
  const generatedPreview = await generatePreview();
  // console.log("generatedPreview", generatedPreview);

  // Step 7: Transform returned html to contain actual data DUUUHH
  console.log("Step 7: Transform returned html to contain actual data DUUUHH");
  const transformedHTML = performPreviewTransform(
    generatedPreview,
    createSectionsData
  );

  // Step 8: Provide site to server
  console.log("Step 8: Provide site to server");
  await publishToWikiGravy(transformedHTML, wikiSlug);

  // Step 9: Clean up existing VIPsites sections
  console.log("Step 9: Clean up existing VIPsites sections");
  await cleanAllExistingSectionIds();

  // Step 10: Return the all found additional wiki slugs
  console.log("Step 10: Return the all found additional wiki slugs");
  return [];
}
