import { concat, filter } from "lodash-es";
import fs from "node:fs";

let scrapedSlugs: string[] = [];

export async function updateScrapedSlugsList() {
  try {
    const data = fs.readFileSync("./scraped.txt", "utf8");
    console.log("data", data);
    if (!!data) {
      scrapedSlugs = filter(concat(scrapedSlugs, JSON.parse(data)), Boolean);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function isSlugScraped(slug: string) {
  await updateScrapedSlugsList();
  return scrapedSlugs.includes(slug);
}

export async function markSlugAsScraped(slug: string) {
  scrapedSlugs.push(slug);
  console.log("scrapedSlugs", scrapedSlugs);
  return fs.writeFileSync(
    "./scraped.txt",
    JSON.stringify(scrapedSlugs),
    "utf8"
  );
}

export async function scrapeSlugTest(slug = "test") {
  const isScraped = await isSlugScraped(slug);

  if (isScraped) {
    console.log("Scraped: ", slug);
  } else {
    await markSlugAsScraped(slug);
  }
}
