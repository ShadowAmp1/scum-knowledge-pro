import { createOgImage } from "@/lib/og-card";

export const runtime = "edge";

export const alt = "SCUM DB PRO Loot";
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    variant: "loot",
    eyebrow: "SCUM DB PRO",
    title: "ЛУТ\nSCUM",
    subtitle: "Редкий лут, лучшие места фарма, ремкомплекты, инструменты и полезные предметы.",
    tags: ["Loot", "Rare", "Farm", "Tools", "Items", "Gear"]
  });
}
