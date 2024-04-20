import { getBaseSiteData } from "./baseSiteData";
import { VIPrequest } from "./VIPrequest";
import { vipsites_urls } from "./vipsites";

export async function generatePreview(): Promise<string> {
  const result = await VIPrequest.post(
    vipsites_urls.previewSite,
    getBaseSiteData()
  );

  return result.data;
}
