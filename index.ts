import dotenv from "dotenv";
import { processSlug } from "./wikipedia/processSlug";
import { buildVIPsitesWikiPage } from "./buildVIPsitesWikiPage";

dotenv.config();

const sampleSlugs = [
  "Rabbit",
  "War_to_End_All_Wars_(album)",
  // "The_War_to_End_All_Wars_(album)",
  // "The_War_That_Will_End_War",
  // "World_War_I",
  // "Ideal_(ethics)",
  // "Sardonically",
  // "World_War_II",
  // "Central_Powers",
  // "Militarism",
  // "Catchphrase",
  // "Archibald_Wavell,_1st_Earl_Wavell",
  // "Field_marshal",
  // "Viceroy_of_India",
  // "Paris_Peace_Conference,_1919",
  // "The_Bulpington_of_Blup",
  // "Walter_Lippmann",
  // "Richard_Nixon",
  // "Edward_M._Coffman",
  // "Russell_Freedman",
  // "Adam_Hochschild",
  // "Mutual_assured_destruction",
  // "Peace_for_our_time",
  // "Never_again",
  // "Mission_Accomplished_speech",
  // "Internet_Archive",
];

for (const wikiSlug of sampleSlugs) {
  await buildVIPsitesWikiPage(wikiSlug);
}

process.exit(0);
