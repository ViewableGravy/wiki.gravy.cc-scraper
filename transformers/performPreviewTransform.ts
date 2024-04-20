import type { CreateSectionsData } from "./sections/types";

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

  return html;
}
