import { VIPrequest } from "./VIPrequest";
import { vipsites_urls } from "./vipsites";

export async function createSection(sectionData: Object) {
  return await VIPrequest.post(vipsites_urls.sections, sectionData).catch(
    (error) => {
      console.log(error);
      return { error };
    }
  );
}
