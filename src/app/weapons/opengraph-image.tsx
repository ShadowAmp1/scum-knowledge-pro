import { createOgImage } from "@/lib/og-card";

export const runtime = "edge";

export const alt = "SCUM DB PRO Weapons";
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    variant: "weapons",
    eyebrow: "SCUM DB PRO",
    title: "ОРУЖИЕ\nSCUM",
    subtitle: "Лучшие билды, обвесы, прицелы, магазины, глушители и PvP/PvE сборки.",
    tags: ["AK", "M82", "SVD", "MP5", "PvP", "PvE"]
  });
}
