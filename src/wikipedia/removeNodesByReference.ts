import type { Nodes } from "./types";

export const removeNodesByReference = (
  input: Nodes,
  index: number,
  nodesToRemove: Array<cheerio.TagElement>
) => {
  input[index] = input[index].filter(
    (node) => nodesToRemove.includes(node) === false
  );
};
