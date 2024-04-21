import cheerio from "cheerio";
import type { CreateSectionsData } from "./sections/types";
import { getElementContent } from "../wikipedia/getElementContent";
import { isTag } from "../wikipedia/isTag";

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

/**
 * Performs the final HTML transform to populate the html with the html from wikipedia
 */
export function performPreviewTransform(
  html: string,
  createSectionData: CreateSectionsData
) {
  for (const [_, transformHTML] of createSectionData) {
    html = transformHTML(html);
  }

  html = addStyles(html);
  html = removeEmptyTags(html);

  return html;
}
