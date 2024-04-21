import axios from "axios";
import { loadEnv } from "./loadEnv";
loadEnv();

export async function publishToWikiGravy(siteHTML: string, slug: string) {
  await axios
    .post(process.env.WIKI_GRAVY_CC_SERVER_URL ?? "", {
      password: process.env.WIKI_GRAVY_CC_SERVER_PASSWORD,
      path: `wiki/${slug}.html`,
      file: siteHTML,
    })
    .catch((error) => {
      console.error(error);
    });
}
