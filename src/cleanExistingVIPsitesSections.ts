import { VIPrequest } from "./VIPrequest";
import { vipsites_urls } from "./vipsites";
import { chunk } from "lodash-es";

export function cleanExistingVIPsitesSection(sectionID: number) {
  return VIPrequest.delete(`${vipsites_urls.section}/${sectionID}`).catch(
    (error) => {
      console.log(error);
      throw error;
    }
  );
}

export async function getAllExistingSectionIds() {
  const sectionData: { data: { data: Array<{ id: number }> } } =
    await VIPrequest.get(vipsites_urls.sections);
  return sectionData.data.data.map(({ id }) => id);
}

async function processSectionIds(sectionIds: number[]) {
  return await Promise.all(
    sectionIds.map((sectionId) => cleanExistingVIPsitesSection(sectionId))
  );
}

export async function cleanAllExistingSectionIds() {
  try {
    // Get section ID's
    const sectionIds = await getAllExistingSectionIds();

    // Chunk them into slots of 10
    const chunkedSectionIds = chunk(sectionIds, 10);

    // Process each chunk
    for (const sectionIdsChunk of chunkedSectionIds) {
      await processSectionIds(sectionIdsChunk);
    }
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
}
