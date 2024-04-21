import { concat, filter } from "lodash-es";
import fs from "node:fs";

let scrapedSlugs: string[] = [];

const filePath = `${process.cwd()}/scraped.txt`;

export async function updateScrapedSlugsList() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    if (!!data) {
      scrapedSlugs = filter(JSON.parse(data), Boolean);
      // console.log("scrapedSlugs", scrapedSlugs);
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
  // console.log("scrapedSlugs", scrapedSlugs);
  return fs.writeFileSync(filePath, JSON.stringify(scrapedSlugs), "utf8");
}

export async function scrapeSlug(slug = "test") {
  const isScraped = await isSlugScraped(slug);

  if (isScraped) {
    return true;
  } else {
    await markSlugAsScraped(slug);
  }

  return false;
}
