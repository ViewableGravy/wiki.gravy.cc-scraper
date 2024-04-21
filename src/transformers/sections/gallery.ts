import { times } from "lodash-es";
import { createImageAttachment } from "../createImageAttachment";

export function createGalleryData({
  numberOfImages = 1,
  numberOfProjects = 1,
}) {
  return {
    properties: {
      content_layout: "centered",
      colour_style: "standard",
      title: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
      work_project: times(numberOfProjects, () => ({
        title: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
        description:
          "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
        featured_image: {
          type: "attachment",
          attachment: { id: 1859237558 },
        },
        images: times(numberOfImages, () => createImageAttachment),
      })),
    },
    section_id: "katana.v1.gallery",
  };
}
