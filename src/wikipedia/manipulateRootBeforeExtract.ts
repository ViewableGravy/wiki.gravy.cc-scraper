import { $ } from "../cheerio";

export const manipulateRootBeforeExtract = () => {
  // Remove unwanted Nodes
  $("meta").remove();
  $("style").remove();
  $(".noprint").remove();
};
