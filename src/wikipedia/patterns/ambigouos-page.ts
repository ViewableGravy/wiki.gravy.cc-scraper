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
  returnNodes.push(nodes[ulIndex]);

  removeNodesByReference(_nodes, 0, returnNodes);
  output.push(["ambiguousPage", returnNodes]);

  return true;
};
