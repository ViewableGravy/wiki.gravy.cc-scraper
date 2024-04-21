import { VIPrequest } from "./VIPrequest";
import { vipsites_urls } from "./vipsites";

export const applySectionOrder = async (sectionIDs: number[]) => {
  return VIPrequest.post(vipsites_urls.reorderSections, {
    attributes: {
      section_ids: sectionIDs,
    },
  });
};
