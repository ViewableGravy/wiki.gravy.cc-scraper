import type { SectionNames } from "../../wikipedia/patternMatcher";
import type { generateSectionContextSelector } from "../sectionContentSelector";

export type CreateSectionData = {
  sectionName: SectionNames;
  sectionData: [sectionData: Object, transformHTML: (html: string) => string];
};

export type CreateSectionsData = Array<CreateSectionData>;

export type TransformerMethod<TData> = (
  html: string,
  data: TData,
  nodes: cheerio.TagElement[]
) => string;

export type ContextSelector = ReturnType<typeof generateSectionContextSelector>;
export type CreateFunctionOptions<TData> = {
  contextSelector: ContextSelector;
  transformer: TransformerMethod<TData>;
};

export type CreateFunction<TData> = (
  sections: cheerio.TagElement[],
  options: CreateFunctionOptions<TData>
) => CreateSectionData['sectionData'];
