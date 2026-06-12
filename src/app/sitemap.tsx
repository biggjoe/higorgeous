import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.higorgeous.co.uk",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: ["https://www.higorgeous.co.uk/opengraph-image.jpg"],
    },
    {
      url: "https://www.higorgeous.co.uk/about",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      images: ["https://www.higorgeous.co.uk/opengraph-image.jpg"],
    },
    {
      url: "https://www.higorgeous.co.uk/products",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      images: ["https://www.higorgeous.co.uk/opengraph-image.jpg"],
    },
    {
      url: "https://www.higorgeous.co.uk/privacy",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      images: ["https://www.higorgeous.co.uk/opengraph-image.jpg"],
    },
    {
      url: "https://www.higorgeous.co.uk/terms",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
      images: ["https://www.higorgeous.co.uk/opengraph-image.jpg"],
    },
    {
      url: "https://www.higorgeous.co.uk/contact-us",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.higorgeous.co.uk/opengraph-image.jpg"],
    },

    {
      url: "https://www.higorgeous.co.uk/products/v/lumi-rebirth-serum",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: [
        "https://api.higorgeous.co.uk/files/products/lumi-rebirth-serum.jpg",
      ],
    },
    {
      url: "https://www.higorgeous.co.uk/products/v/radiant-glow-lotion",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        "https://api.higorgeous.co.uk/files/products/radiant-glow-lotion.jpg",
      ],
    },
    {
      url: "https://www.higorgeous.co.uk/products/v/barrier-hydralock-serum",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        "https://api.higorgeous.co.uk/files/products/barrier-hydralock-serum.jpg",
      ],
    },
    {
      url: "https://www.higorgeous.co.uk/products/v/color-defense-serum",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        "https://api.higorgeous.co.uk/files/products/color-defense-serum.jpg",
      ],
    },
    {
      url: "https://www.higorgeous.co.uk/products/v/advanced-brightening-lotion",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        "https://api.higorgeous.co.uk/files/products/advanced-brightening-lotion.jpg",
      ],
    },
    {
      url: "https://www.higorgeous.co.uk/products/v/flawless-glow-lotion",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        "https://api.higorgeous.co.uk/files/products/flawless-glow-lotion.jpg",
      ],
    },
    {
      url: "https://www.higorgeous.co.uk/products/v/bright-trio-serum",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        "https://api.higorgeous.co.uk/files/products/the-bright-trio-serum.jpg",
      ],
    },
    {
      url: "https://www.higorgeous.co.uk/products/v/nia-zinc-bright-serum",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        "https://api.higorgeous.co.uk/files/products/nia-zinc-bright-serum.jpg",
      ],
    },
    {
      url: "https://www.higorgeous.co.uk/products/v/night-renewal-emulsion",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        "https://api.higorgeous.co.uk/files/products/night-renewal-emulsion.jpg",
      ],
    },
  ];
}
