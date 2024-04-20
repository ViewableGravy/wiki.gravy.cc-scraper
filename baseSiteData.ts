export function getBaseSiteData({
  pageTitle = "Deez Nutz",
  pageDescription = "Nutty Description",
} = {}) {
  return {
    site: {
      title: pageTitle,
      description: pageDescription,
      color: "pink",
      style: {
        fonts: {
          body: "lobster",
          heading: "lobster",
          brand: "lobster",
        },
      },
      keywords: null,
      favicon: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
      renderer: "sections",
      status: "published",
    },
  };
}
