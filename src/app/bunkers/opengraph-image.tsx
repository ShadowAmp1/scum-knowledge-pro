import { createOgImage } from "@/lib/og-card";

export const runtime = "edge";

export const alt = "SCUM DB PRO Bunkers";
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    variant: "bunkers",
    eyebrow: "SCUM DB PRO",
    title: "Бункеры\nSCUM",
    subtitle: "Обычные и заброшенные бункеры, карты уровней, маршруты, риски и подготовка к рейдам.",
    tags: ["Bunker", "Raid", "Loot", "Maps", "PvE", "Routes"]
  });
}
