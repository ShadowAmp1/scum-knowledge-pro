import type { MetadataRoute } from "next";
import { attachments } from "@/data/attachments";
import { bunkers } from "@/data/bunkers";
import { guides } from "@/data/guides";
import { lootItems } from "@/data/loot";
import { weapons } from "@/data/weapons";

const baseUrl = "https://scum-knowledge-pro.onrender.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/weapons",
    "/weapons/attachments",
    "/loot",
    "/bunkers",
    "/map",
    "/bases",
    "/vehicles",
    "/preparation",
    "/guides",
    "/pro-roadmap",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...weapons.map((item) => ({
      url: `${baseUrl}/weapons/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...attachments.map((item) => ({
      url: `${baseUrl}/weapons/attachments/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...lootItems.map((item) => ({
      url: `${baseUrl}/loot/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...bunkers.map((item) => ({
      url: `${baseUrl}/bunkers/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...guides.map((item) => ({
      url: `${baseUrl}/guides/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
