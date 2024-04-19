import axios from "axios";
import * as cheerio from "cheerio";

const response = await axios.get("https://web-scraping.dev/product/1");
const selector = cheerio.load(response.data);
console.log({
    "name": selector("h3").first().text(),    
    "price": selector(".price>span").text(),    
    "priceFull": selector(".product-price-full").text(),    
    "description": selector(".product-description").text(),    
});