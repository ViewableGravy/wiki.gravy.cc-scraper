import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function publishToWikiGravy(siteHTML: string, slug: string) {
  const replaced = siteHTML
    .replace("disable-hrefs", "")
    .replaceAll('href="/wiki', 'href="https://wiki.gravy.cc/wiki');
  await axios
    .post(process.env.WIKI_GRAVY_CC_SERVER_URL ?? "", {
      password: process.env.WIKI_GRAVY_CC_SERVER_PASSWORD,
      path: `wiki/${slug}.html`,
      file: replaced,
    })
    .catch((error) => {
      console.log(error);
    });
}
