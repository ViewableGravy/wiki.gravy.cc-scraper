type HeroBannerData = {
  title: string;
};

export function createHeroBannerData({ title }: HeroBannerData) {
  return {
    properties: {
      content_layout: "centered",
      colour_style: "standard",
      title,
      image: {
        type: "link",
        url: "https://images.unsplash.com/photo-1553181001-f9cf6c45afca?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8TmV3cyAsIE1lZGlhLDEkfXx8fHx8fDE3MTM1MzQ3NzY&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
      },
    },
    style: "standard",
    section_id: "katana.v1.hero",
  };
}
