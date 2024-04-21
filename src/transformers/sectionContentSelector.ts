export const generateSectionContextSelector = (index: number) => {
  const createIt = (content: string) =>
    `$_$_$DEEZ_NUTS#${index}__${content}DEEZ_NUTS$_$_$`;

  const createURL = (content: string) =>
    `https://wiki.gravy.cc/${createIt(content)}`;

  return Object.assign(createIt, {
    image: createURL,
  });
};
