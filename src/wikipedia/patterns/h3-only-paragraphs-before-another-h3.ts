import { removeNodesByReference } from "../removeNodesByReference";
import type { Matcher } from "../types";

export const matchH3WithOnlyParagraphsBeforeAnotherH3: Matcher = (
  _nodes,
  output
) => {
  const [nodes] = _nodes;
  if (!nodes.length) return false;

  const h2Index = nodes?.findIndex(({ tagName }) => tagName === "h2");
  const h3Index = nodes?.findIndex(({ tagName }) => tagName === "h3");

  if ([h3Index, h2Index].includes(-1)) return false;
  if (h3Index !== h2Index + 1) return false;

  let returnNodes: Array<cheerio.TagElement> = [];

  returnNodes.push(nodes[h2Index]);
  // Description
  returnNodes.push(undefined as any);
  returnNodes.push(nodes[h3Index]);

  let lastTag = "";
  for (let i = h2Index + 1; i < nodes.length; i++) {
    if ([h2Index, h3Index].includes(i)) {
      continue;
    }

    const node = nodes[i];
    const { tagName } = node;

    if (!["p", "h3"].includes(tagName)) {
      if (!returnNodes.filter(Boolean).find(({ tagName }) => tagName === "p")) {
        return false;
      }

      break;
    }

    if (tagName === "p") {
      returnNodes.push(node);
      lastTag = "p";
      continue;
    }

    if (tagName === "h3" && lastTag !== "h3") {
      returnNodes.push(node); // h3
      lastTag = "h3";
      continue;
    } else {
      break;
    }
  }

  if (returnNodes.at(-1)?.tagName === "h3") {
    returnNodes.pop();
  }

  if (!returnNodes.filter(Boolean).find((el) => el.tagName === "p"))
    return false;

  removeNodesByReference(_nodes, 0, returnNodes.filter(Boolean));
  output.push(["H2WithH3AndPDirectSiblings", returnNodes]);

  return true;
};
