import { createImageAttachment } from "../createImageAttachment";

export function createBiographyData() {
  return {
    properties: {
      colour_style: "standard",
      image: createImageAttachment(),
      title: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
      biography_information: {
        heading: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
        content: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
      },
    },
    style: "image_right",
    section_id: "katana.v1.biography",
  };
}
