export function getOriginalImageSource(imageSource: string) {
  if (!imageSource.includes("/thumb/")) return imageSource;
  const splitImageUrl = imageSource.replace(/\/thumb/, "").split("/");
  splitImageUrl.pop();
  return splitImageUrl.join("/");
}
