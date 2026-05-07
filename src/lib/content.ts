import { attachments as fallbackAttachments, type Attachment } from "@/data/attachments";
import { guides as fallbackGuides, type Guide } from "@/data/guides";
import { lootItems as fallbackLootItems, type LootItem } from "@/data/loot";
import { mapMarkers as fallbackMapMarkers, type MapMarker } from "@/data/mapMarkers";
import { weapons as fallbackWeapons, type Weapon } from "@/data/weapons";
import { dbQuery, hasDatabaseUrl } from "@/lib/database";

export type ContentEntity = "weapons" | "attachments" | "loot" | "guides" | "mapMarkers";
export type ContentState = { weapons: Weapon[]; attachments: Attachment[]; loot: LootItem[]; guides: Guide[]; mapMarkers: MapMarker[] };

const fallbackContent: ContentState = { weapons: fallbackWeapons, attachments: fallbackAttachments, loot: fallbackLootItems, guides: fallbackGuides, mapMarkers: fallbackMapMarkers };
const sortKeys: Record<ContentEntity, "slug" | "id"> = { weapons: "slug", attachments: "slug", loot: "slug", guides: "slug", mapMarkers: "id" };

function sortByKey<T extends Record<string, unknown>>(items: T[], key: string) {
  return [...items].sort((a, b) => String(a[key] ?? "").localeCompare(String(b[key] ?? ""), "ru"));
}

export async function getContent(): Promise<ContentState> {
  if (!hasDatabaseUrl()) return fallbackContent;
  try {
    const result = await dbQuery<{ entity: ContentEntity; data: unknown }>("SELECT entity, data FROM content_items ORDER BY entity ASC, key ASC");
    const content: ContentState = { weapons: [], attachments: [], loot: [], guides: [], mapMarkers: [] };
    for (const row of result.rows) {
      if (row.entity === "weapons") content.weapons.push(row.data as Weapon);
      if (row.entity === "attachments") content.attachments.push(row.data as Attachment);
      if (row.entity === "loot") content.loot.push(row.data as LootItem);
      if (row.entity === "guides") content.guides.push(row.data as Guide);
      if (row.entity === "mapMarkers") content.mapMarkers.push(row.data as MapMarker);
    }
    const hasAnyData = Object.values(content).some((items) => items.length > 0);
    if (!hasAnyData) return fallbackContent;
    return {
      weapons: content.weapons.length ? sortByKey(content.weapons as unknown as Record<string, unknown>[], sortKeys.weapons) as unknown as Weapon[] : fallbackWeapons,
      attachments: content.attachments.length ? sortByKey(content.attachments as unknown as Record<string, unknown>[], sortKeys.attachments) as unknown as Attachment[] : fallbackAttachments,
      loot: content.loot.length ? sortByKey(content.loot as unknown as Record<string, unknown>[], sortKeys.loot) as unknown as LootItem[] : fallbackLootItems,
      guides: content.guides.length ? sortByKey(content.guides as unknown as Record<string, unknown>[], sortKeys.guides) as unknown as Guide[] : fallbackGuides,
      mapMarkers: content.mapMarkers.length ? sortByKey(content.mapMarkers as unknown as Record<string, unknown>[], sortKeys.mapMarkers) as unknown as MapMarker[] : fallbackMapMarkers,
    };
  } catch (error) {
    console.error("Failed to read content_items, fallback to src/data", error);
    return fallbackContent;
  }
}
export async function getWeapons() { return (await getContent()).weapons; }
export async function getAttachments() { return (await getContent()).attachments; }
export async function getLootItems() { return (await getContent()).loot; }
export async function getGuides() { return (await getContent()).guides; }
export async function getMapMarkers() { return (await getContent()).mapMarkers; }
