import { generateSectionContextSelector } from "../transformers/sectionContentSelector";
import {
  createAboutUsData,
  createAboutUsSectionData,
  singleParagraphTransformer,
} from "../transformers/sections/about-us";
import {
  createHeroBannerData,
  createHeroBannerSectionData,
  firstSectionHeroBannerTransformer,
} from "../transformers/sections/hero-banner";
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
          return createHeroBannerSectionData(nodes, {
            contextSelector,
            transformer: firstSectionHeroBannerTransformer,
          });
        case "singleParagraph":
          return createAboutUsSectionData(nodes, {
            contextSelector,
            transformer: singleParagraphTransformer,
          });
        default:
          return null as any;
      }
    })
    .filter(Boolean);
  return katanaSectionData;
};
