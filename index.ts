import dotenv from "dotenv";
import { buildVIPsitesWikiPage } from "./src/buildVIPsitesWikiPage";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

dotenv.config();

const startingSlugs = [
  "Taylor_Swift",
  "Rabbit",
  "War_to_End_All_Wars_(album)",
  "The_War_to_End_All_Wars_(album)",
  "The_War_That_Will_End_War",
  "World_War_I",
  "Ideal_(ethics)",
  "Sardonically",
  "World_War_II",
  "Central_Powers",
  "Militarism",
  "Catchphrase",
  "Archibald_Wavell,_1st_Earl_Wavell",
  "Field_marshal",
  "Viceroy_of_India",
  "Paris_Peace_Conference,_1919",
  "The_Bulpington_of_Blup",
  "Walter_Lippmann",
  "Richard_Nixon",
  "Edward_M._Coffman",
  "Russell_Freedman",
  "Adam_Hochschild",
  "Mutual_assured_destruction",
  "Peace_for_our_time",
  "Never_again",
  "Mission_Accomplished_speech",
  "Internet_Archive",
];

async function infinitelyGenerateSites() {
  for (let index = 0; index < startingSlugs.length; index++) {
    const element = startingSlugs[index];

    try {
      const additionalSlugs = await buildVIPsitesWikiPage(element);
      startingSlugs.push(
        ...additionalSlugs.filter((slug) => !startingSlugs.includes(slug))
      );
      console.log("sampleSlugs.length", startingSlugs.length);
    } catch (e) {
      console.error(e);
    }
  }
}

if (argv.slug) {
  console.log("Plunder more riffiwobbles!");
  buildVIPsitesWikiPage(argv.slug).then(() => {
    process.exit(0);
  });
} else {
  infinitelyGenerateSites().then(() => {
    process.exit(0);
  });
}
