import { wikipediaContentIndex } from "./consts";
import { isTag } from "./isTag";
import { isElementEmpty } from "./isElementEmpty";
import { $ } from "../cheerio";

const filterNonEmptyNode = (node: cheerio.Element) => {
  if (!isTag(node)) {
    return false;
  }

  if (["p", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)) {
    return isElementEmpty(node);
  }

  return true;
};

export function extractNodes() {
  let sectionNumber = 0;

  const elements = $(".mw-content-ltr > *").toArray();
  const nonEmptyElements = elements.filter((element) => {
    return filterNonEmptyNode(element);
  });
  const [mainTitle] = $("h1").toArray();

  const finalNodes = nonEmptyElements.reduce<Array<Array<cheerio.TagElement>>>(
    (acc, val) => {
      if (isTag(val)) {
        if (val.tagName === wikipediaContentIndex["Main Section Delimiter"]) {
          sectionNumber++;
          acc[sectionNumber] = [val];
          return acc;
        }

        acc[sectionNumber].push(val);
      }

      return acc;
    },
    [[]]
  );

  if (isTag(mainTitle)) {
    finalNodes[0].unshift(mainTitle);
  }

  return finalNodes;
}
