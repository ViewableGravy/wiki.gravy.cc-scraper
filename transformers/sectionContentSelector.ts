export const generateSectionContextSelector = (index: number) => {
  return (content: string) => `$_$_$DEEZ_NUTS#${index}__${content}$_$_$`;
};
