import axios from "axios";
import * as cheerio from "cheerio";
import { $, setCheerio } from "../cheerio";

/**
 * Fetches the wikipedia page. the /wiki/ part of the slug is not required
 */
export const fetchWikipediaPage = async (slug: string) => {
  const response = await axios.get(`https://en.wikipedia.org/wiki/${slug}`);
  setCheerio(cheerio.load(response.data));
  $("style").remove();
};

// Get all page slugs
// Don't include links from .reflist
// Array.from(document.querySelectorAll('#mw-content-text a')).filter((entry)=> entry.href.includes('/wiki/') && !entry.href.includes('#')).map((el)=> el.href.split('/wiki/')[1]);
