import axios from "axios";
import fs from "fs";
import * as cheerio from "cheerio";

/**
 * Fetches the wikipedia page. the /wiki/ part of the slug is not required
 */
export const fetchWikipediaPage = async (slug: string) => {
  const response = await axios.get(`https://en.wikipedia.org/wiki/${slug}`);
  return cheerio.load(response.data);
};

// Get all page slugs
// Don't include links from .reflist
// Array.from(document.querySelectorAll('#mw-content-text a')).filter((entry)=> entry.href.includes('/wiki/') && !entry.href.includes('#')).map((el)=> el.href.split('/wiki/')[1]);
