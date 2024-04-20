export function getBaseSiteData({
  pageTitle = "Wiki.Gravy.cc",
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
      favicon:
        "https://upload.wikimedia.org/wikipedia/commons/d/de/Wikipedia_Logo_1.0.png",
      renderer: "sections",
      status: "published",
    },
  };
}
