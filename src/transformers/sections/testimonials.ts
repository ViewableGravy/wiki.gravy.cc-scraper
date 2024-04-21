import { times } from "lodash-es";

export function createTestimonialData({ numberOfTeamMembers = 1 }) {
  return {
    properties: {
      colour_style: "white",
      title: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
      subtext: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
      testimonials: times(numberOfTeamMembers, () => ({
        quote: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
        name: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
        company_or_position:
          "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
      })),
    },
    section_id: "katana.v1.testimonials",
  };
}
