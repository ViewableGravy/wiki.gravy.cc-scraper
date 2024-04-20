import { times } from "lodash-es";
import { createImageAttachment } from "../createImageAttachment";

export function createTeamData({ numberOfTeamMembers = 1 }) {
  return {
    properties: {
      colour_style: "standard",
      title: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
      description: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
      team_members: times(numberOfTeamMembers, () => ({
        image: createImageAttachment(),
        name: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
        job_title: "<<<DEEZ_NUTSThe content;;;https:ventraip.com.auDEEZ_NUTS>>",
      })),
    },
    style: "default_square_images",
    section_id: "katana.v1.team",
  };
}
