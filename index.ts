import dotenv from "dotenv";
import { buildVIPsitesWikiPage } from "./buildVIPsitesWikiPage";
dotenv.config();

const wikipediaContentIndex = {
  "Main Content Wrapper": "#mw-content-text",
  "Hat Note": ".hatnote",
};

await buildVIPsitesWikiPage("The_war_to_end_war");

process.exit(0);
