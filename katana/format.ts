import { createHeroBannerData } from "../transformers/sections/hero-banner";
import { extractWikipediaPage } from "../wikipedia/extract";

/**
 * Takes the cheerio object of relevant data and generates a structure that is appropriate
 * for katana
 */
export const formatForKatana = (
  data: ReturnType<typeof extractWikipediaPage>
) => {
  return createHeroBannerData(data);
};
