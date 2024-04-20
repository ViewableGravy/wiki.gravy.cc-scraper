import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Fetches the wikipedia page. the /wiki/ part of the slug is not required
 */
export const fetchWikipediaPage = async (slug: string) => {
  const response = await axios.get(`https://en.wikipedia.org/wiki/${slug}`);
  return cheerio.load(response.data);
};
