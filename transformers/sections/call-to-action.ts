import { createImageAttachment } from "../createImageAttachment";

export function createCallToActionData() {
  return {
    properties: {
      colour_style: "standard",
      opaque_background: true,
      image: createImageAttachment(),
      title: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
      subtitle: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
      primary_button: {
        type: "link",
        text: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
        value: "https://google.com",
        enabled: true,
      },
      secondary_button: {
        type: "link",
        text: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
        value: "google.com",
        enabled: true,
      },
    },
    style: "left_aligned",
    section_id: "katana.v1.call-to-action",
  };
}
