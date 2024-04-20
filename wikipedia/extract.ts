export const extractWikipediaPage = (cheerio: cheerio.Root) => {

  console.log({
    title: cheerio(".mw-page-title-main").first().text(),
  });

  return {
    title: cheerio(".mw-page-title-main").first().text(),
  }
}