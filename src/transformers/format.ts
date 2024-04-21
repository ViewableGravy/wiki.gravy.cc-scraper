import { generateSectionContextSelector } from "./sectionContentSelector";
import {
  createAboutUsData,
  createAboutUsSectionData,
  H2SectionWithOnlyParagraphsTransformer,
  singleParagraphTransformer,
} from "./sections/about-us";
import {
  createHeroBannerData,
  createHeroBannerSectionData,
  firstSectionHeroBannerTransformer,
} from "./sections/hero-banner";
import type { CreateSectionsData } from "./sections/types";
import type { OutputSections } from "../wikipedia/patternMatcher";
import { createFaqSectionData, mainInfoBoxTransformer } from "./sections/faq";
import {
  createServicesListData,
  createServicesListSectionData,
  ServiceListTransformers,
} from "./sections/services-list";
import {
  createTestimonialsSectionData,
  TestimonialTransformers,
} from "./sections/testimonials";

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
          return {
            sectionName,
            sectionData: createHeroBannerSectionData(nodes, {
              contextSelector,
              transformer: firstSectionHeroBannerTransformer,
            }),
          };
        case "singleParagraph":
          return {
            sectionName,
            sectionData: createAboutUsSectionData(nodes, {
              contextSelector,
              transformer: singleParagraphTransformer,
            }),
          };
        case "H2SectionWithOnlyParagraphs":
          return {
            sectionName,
            sectionData: createAboutUsSectionData(nodes, {
              contextSelector,
              transformer: H2SectionWithOnlyParagraphsTransformer,
            }),
          };

        case "H2WithH3AndPDirectSiblings":
          return {
            sectionName,
            sectionData: createServicesListSectionData(nodes, {
              contextSelector,
              transformer: ServiceListTransformers.h2WithH3AndPDirectSiblings,
            }),
          };
        case "infoBox":
          return {
            sectionName,
            sectionData: createFaqSectionData(nodes, {
              contextSelector,
              transformer: mainInfoBoxTransformer,
            }),
          };
        case "ambiguousPage":
          return {
            sectionName,
            sectionData: createTestimonialsSectionData(nodes, {
              contextSelector,
              transformer: TestimonialTransformers.Ambiguous,
            }),
          };
        default:
          return null as any;
      }
    })
    .filter(Boolean);
  return katanaSectionData;
};
