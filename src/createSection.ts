import { create } from "domain";
import type { CreateSectionsData } from "./transformers/sections/types";
import { VIPrequest } from "./VIPrequest";
import { vipsites_urls } from "./vipsites";
import { chunk } from "lodash-es";
import type { FinalisedSectionData } from "./types";

/***** TYPE DEFINITIONS *****/

export async function createSection(sectionData: Object) {
  return await VIPrequest.post(vipsites_urls.sections, sectionData).catch(
    (error) => {
      console.log(error);
      return { error };
    }
  );
}

export async function createSectionsFromSectionData(
  createSectionsData: CreateSectionsData
): Promise<FinalisedSectionData[]> {
  const createdSections: FinalisedSectionData[] = Array.from({
    length: createSectionsData.length,
  });
  const indexedSectionData = createSectionsData.map((sectionData, index) => ({
    sectionData,
    index,
  }));
  const chunked = chunk(indexedSectionData, 10);

  for (const chunk of chunked) {
    await Promise.all(
      chunk.map(async ({ sectionData, index }) => {
        const [katanaData] = sectionData.sectionData;
        const createdSection = await createSection(katanaData);

        createdSections[index] = {
          id: (createdSection as any).data.data.id,
          identifier: (createdSection as any).data.data.identifier,
        };
      })
    );
  }
  return createdSections;
}
