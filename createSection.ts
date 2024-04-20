import { log } from "scrapfly-sdk";
import type {
  CreateSectionData,
  CreateSectionsData,
} from "./transformers/sections/types";
import { VIPrequest } from "./VIPrequest";
import { vipsites_urls } from "./vipsites";

export async function createSection(sectionData: Object) {
  console.log("sectionData", sectionData);
  return await VIPrequest.post(vipsites_urls.sections, sectionData).catch(
    (error) => {
      console.log(error);
      return { error };
    }
  );
}

export async function createSectionsFromSectionData(
  sectionsData: CreateSectionsData
) {
  for (const [katanaData] of sectionsData) {
    await createSection(katanaData);
  }
}
