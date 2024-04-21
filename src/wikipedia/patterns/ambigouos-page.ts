import { chunk } from "lodash-es";
import { $ } from "../../cheerio";
import { removeNodesByReference } from "../removeNodesByReference";
import type { Matcher } from "../types";

export const matchAmbiguousPage: Matcher = (_nodes, output) => {
  const [nodes] = _nodes;
  if (!nodes.length) return false;

  const h2Index = nodes?.findIndex(({ tagName }) => tagName === "h2");
  const ulIndex = nodes?.findIndex(({ tagName }) => tagName === "ul");

  if ([h2Index, ulIndex].includes(-1)) return false;

  let returnNodes: Array<cheerio.TagElement> = [];

  returnNodes.push(nodes[h2Index]);
  const ul = nodes[ulIndex];
  const lis = $(ul).find("> li").toArray();

  if (lis.length > 20) {
    console.log("More than 20 entries in ambiguous page!");
  }
  const chunkedlis = chunk(lis, 20);

  chunkedlis.forEach((chunkedRows, index) => {
    output.push([
      "ambiguousPage",
      [index === 0 ? h2Index : (undefined as any), ...chunkedRows],
    ]);
  });

  returnNodes.push(nodes[ulIndex]);

  removeNodesByReference(_nodes, 0, returnNodes);

  return true;
};
