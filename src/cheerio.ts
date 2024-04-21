export let $: cheerio.Root;

export const setCheerio = (cheerio: cheerio.Root) => {
  $ = cheerio;
};
