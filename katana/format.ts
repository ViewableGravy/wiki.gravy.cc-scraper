import { generateSectionContextSelector } from "../transformers/sectionContentSelector";
import { createHeroBannerData } from "../transformers/sections/hero-banner";
import type { CreateSectionsData } from "../transformers/sections/types";
import type { OutputSections } from "../wikipedia/patternMatcher";

/**
 * Takes the cheerio object of relevant data and generates a structure that is appropriate
 * for katana
 */
export const formatForKatana = (data: OutputSections) => {
  const katanaSectionData: CreateSectionsData = data
    .map(([sectionName, nodes], index) => {
      const contextSelector = generateSectionContextSelector(index);

      switch (sectionName) {
        case "heroBanner":
          return createHeroBannerData(nodes, { contextSelector });
        default:
          return null as any;
      }
    })
    .filter(Boolean);
  return katanaSectionData;
};
