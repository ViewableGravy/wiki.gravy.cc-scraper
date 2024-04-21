import { loadEnv } from "./loadEnv";
loadEnv();

export const vipsites_urls = {
  sections: `/katana/site/${process.env.VIP_CONTROL_KATANA_SERVICE_ID}/sections`,
  section: `/katana/site/${process.env.VIP_CONTROL_KATANA_SERVICE_ID}/section`,
  previewSite: `/katana/site/${process.env.VIP_CONTROL_KATANA_SERVICE_ID}/preview/site`,
  previewSection: `/katana/site/${process.env.VIP_CONTROL_KATANA_SERVICE_ID}/preview/site/new`,
  reorderSections: `/katana/site/${process.env.VIP_CONTROL_KATANA_SERVICE_ID}/sections/reorder`,
};

export const sectionData = {
  about: {
    properties: {
      colour_style: "light",
      title:
        "Ensuring that your projects are completed to your exact specifications.",
      description:
        "Whether you need to install a new air conditioning system, repair a faulty wiring system, or replace a damaged transformer, we have the expertise and resources to get the job done. Thank you for considering Masterwatt - we look forward to serving you.",
      image:
        "https://katana.nexigen.digital/images/site/v1/presets/assets/trades2.webp",
    },
    style: "left_aligned",
    section_id: "katana.v1.about",
  },
};
