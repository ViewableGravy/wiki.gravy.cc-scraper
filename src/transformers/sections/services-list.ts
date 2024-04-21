import { times } from "lodash-es";
import { createImageAttachment } from "../createImageAttachment";

export function createServicesListData({ numberOfServices = 1 }) {
  return {
    properties: {
      colour_style: "standard",
      title: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
      description: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
      services: times(numberOfServices, () => ({
        heading: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
        description:
          "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
        image: createImageAttachment(),
      })),
    },
    style: "masonry_with_images",
    section_id: "katana.v1.services",
  };
}
