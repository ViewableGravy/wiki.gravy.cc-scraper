import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function publishToWikiGravy(siteHTML: string, slug: string) {
  await axios
    .post(process.env.WIKI_GRAVY_CC_SERVER_URL ?? "", {
      password: process.env.WIKI_GRAVY_CC_SERVER_PASSWORD,
      path: `wiki/${slug}.html`,
      file: siteHTML,
    })
    .catch((error) => {
      console.log(error);
    });
}
