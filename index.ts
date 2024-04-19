import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import * as cheerio from "cheerio";
import { sectionData, vipsites_urls } from "./vipsites";
import { mock } from "./mockdata";
import { createMock } from "./create-mock";

const response = await axios.get("https://en.wikipedia.org/wiki/World_War_III");
const selector = cheerio.load(response.data);
console.log({
  title: selector(".mw-page-title-main").first().text(),
});

async function isUrlScraped(path: string): Promise<boolean> {
  const response = await axios.get(`http://192.168.20.20:3008/${path}`);
  return response.status === 200;
}
console.log(
  "process.env.VIP_CONTROL_REQUEST_COOKIE",
  process.env.VIP_CONTROL_REQUEST_COOKIE
);
const VIPrequest = axios.create({
  baseURL: "https://vip.ventraip.com.au/api",
  headers: {
    Cookie: process.env.VIP_CONTROL_REQUEST_COOKIE,
    Referer: "https://vip.ventraip.com.au/dashboard",
  },
  withCredentials: true,
});

const newSections = [
  await VIPrequest.post(vipsites_urls.Sections, createMock).catch((error) => {
    console.log(error);
    return { error };
  }),
  await VIPrequest.post(vipsites_urls.Sections, createMock).catch((error) => {
    console.log(error);
    return { error };
  }),
  await VIPrequest.post(vipsites_urls.Sections, createMock).catch((error) => {
    console.log(error);
    return { error };
  }),
  await VIPrequest.post(vipsites_urls.Sections, createMock).catch((error) => {
    console.log(error);
    return { error };
  }),
  await VIPrequest.post(vipsites_urls.Sections, createMock).catch((error) => {
    console.log(error);
    return { error };
  }),
  await VIPrequest.post(vipsites_urls.Sections, createMock).catch((error) => {
    console.log(error);
    return { error };
  }),
];

const result = await VIPrequest.post(vipsites_urls.PreviewSite, mock).catch(
  (error) => {
    console.log(error);
    return { error };
  }
);

await Promise.all(newSections).then((values) => {
  values.forEach((resultCreate) => {
    VIPrequest.delete(
      `${vipsites_urls.Section}/${resultCreate.data.data.id}`
    ).catch((error) => {
      console.log(error);
      return { error };
    });
  });
});

if ("data" in result && typeof result.data === "string") {
  await axios
    .post(process.env.WIKI_GRAVY_CC_SERVER_URL ?? "", {
      password: process.env.WIKI_GRAVY_CC_SERVER_PASSWORD,
      path: "test/index.html",
      file: result.data,
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  console.error("well fuck you");
}

console.log("result", result);

const wikipediaContentIndex = {
  "Main Content Wrapper": "#mw-content-text",
  "Hat Note": ".hatnote",
};

process.exit(0);
