import cheerio from "cheerio";
import type { CreateSectionsData } from "./sections/types";

const addStyles = (html: string) => {
  const $ = cheerio.load(html);
  const anhorStyles = /* css */ `
    <style>
      a {
        color: #36c;
      }
      
      a:hover {
        text-decoration: underline;
      }
    </style>
  `;
  $("body").append(anhorStyles);
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

  // TODO Add style
  return html;
}
