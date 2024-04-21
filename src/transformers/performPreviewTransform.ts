import cheerio from "cheerio";
import type { CreateSectionsData } from "./sections/types";
import { getElementContent } from "../wikipedia/getElementContent";
import { isTag } from "../wikipedia/isTag";
import type { FinalisedSectionData } from "../types";

const addStyles = (html: string) => {
  const $ = cheerio.load(html);
  const anhorStyles = `
    <style>
      a {
        color: #1c94ff;
      }
      
      a:hover {
        text-decoration: underline;
      }
    </style>
  `;

  $("body").append(anhorStyles);
  return $.html();
};

const removeEmptyTags = (html: string) => {
  const $ = cheerio.load(html);
  $("p, h1, h2, h3, h4, h5, h6").each((_, element) => {
    if (!isTag(element)) return;
    const isEmpty = !Boolean(getElementContent(element).trim());
    if (isEmpty) {
      $(element).remove();
    }
  });
  return $.html();
};

const compressMultipleFAQSections = (
  html: string,
  createSectionData: CreateSectionsData,
  sectionIDData: FinalisedSectionData[]
): string => {
  const infoBoxSuccessions: Array<Array<number>> = [];
  let currentTracker: Array<number> = [];
  sectionIDData.forEach(({}, index) => {
    if (createSectionData[index].sectionName === "infoBox") {
      currentTracker.push(index);
    } else {
      if (currentTracker.length > 1) {
        infoBoxSuccessions.push(currentTracker);
      }
      currentTracker = [];
    }
  });

  if (currentTracker.length > 1) {
    infoBoxSuccessions.push(currentTracker);
  }

  const $ = cheerio.load(html);

  infoBoxSuccessions.forEach((arrayOfIndexes) => {
    const [startIndex, ...remainingIndexes] = arrayOfIndexes;
    const startElementIdentifier = sectionIDData[startIndex].identifier;

    const startElementGrid = $(`#${startElementIdentifier}`).find(
      "> div > .grid"
    );

    remainingIndexes.forEach((index) => {
      const indexElementIdentifier = sectionIDData[index].identifier;
      const pulledInfoBox = $(`#${indexElementIdentifier}`);
      const spareFAQs = pulledInfoBox.find("> div > .grid").html();
      if (!spareFAQs) return;
      startElementGrid.append(spareFAQs);
      pulledInfoBox.remove();
    });
  });

  return $.html();
};

const compressMultipleTestimonialSections = (
  html: string,
  createSectionData: CreateSectionsData,
  sectionIDData: FinalisedSectionData[]
): string => {
  const ambiguousPageSuccessions: Array<Array<number>> = [];
  let currentTracker: Array<number> = [];
  sectionIDData.forEach(({}, index) => {
    if (createSectionData[index].sectionName === "ambiguousPage") {
      currentTracker.push(index);
    } else {
      if (currentTracker.length > 1) {
        ambiguousPageSuccessions.push(currentTracker);
      }
      currentTracker = [];
    }
  });

  if (currentTracker.length > 1) {
    ambiguousPageSuccessions.push(currentTracker);
  }

  const $ = cheerio.load(html);

  ambiguousPageSuccessions.forEach((arrayOfIndexes) => {
    const [startIndex, ...remainingIndexes] = arrayOfIndexes;
    const startElementIdentifier = sectionIDData[startIndex].identifier;

    const startElementSlides = $(`#${startElementIdentifier}`).find(
      ".swiper-wrapper"
    );

    remainingIndexes.forEach((index) => {
      const indexElementIdentifier = sectionIDData[index].identifier;
      const testimonialBox = $(`#${indexElementIdentifier}`);
      const spareSlides = testimonialBox.find(".swiper-slide").toArray();
      // console.log("spareSlides", spareSlides);
      if (!spareSlides.length) return;
      spareSlides.forEach((slide) => {
        startElementSlides.append(slide);
      });
      testimonialBox.remove();
    });
  });

  return $.html();
};

function applySectionDataNameToSectionIdentifier(
  html: string,
  createSectionData: CreateSectionsData,
  sectionIDData: FinalisedSectionData[]
) {
  const $ = cheerio.load(html);
  sectionIDData.forEach(({ identifier }, index) => {
    const sectionName = createSectionData[index].sectionName;
    $(`#${identifier}`).attr("data-section-name", sectionName);
  });
  return $.html();
}

function modifyAllSluggedLinks(html: string) {
  return html
    .replace("disable-hrefs", "")
    .replaceAll('href="/wiki', 'href="https://wiki.gravy.cc/wiki');
}

/**
 * Performs the final HTML transform to populate the html with the html from wikipedia
 */
export function performPreviewTransform(
  html: string,
  createSectionData: CreateSectionsData,
  sectionIDData: FinalisedSectionData[]
) {
  html = createSectionData.reduce(
    (html, { sectionData: [_, transformHTML] }) => transformHTML(html),
    html
  );

  html = compressMultipleFAQSections(html, createSectionData, sectionIDData);

  html = compressMultipleTestimonialSections(
    html,
    createSectionData,
    sectionIDData
  );

  html = applySectionDataNameToSectionIdentifier(
    html,
    createSectionData,
    sectionIDData
  );
  html = addStyles(html);
  html = removeEmptyTags(html);
  html = modifyAllSluggedLinks(html);

  return html;
}
