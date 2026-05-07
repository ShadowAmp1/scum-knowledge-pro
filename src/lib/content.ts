import { attachments as fallbackAttachments, type Attachment } from "@/data/attachments";
import { guides as fallbackGuides, type Guide } from "@/data/guides";
import { lootItems as fallbackLootItems, type LootItem } from "@/data/loot";
import { mapMarkers as fallbackMapMarkers, type MapMarker } from "@/data/mapMarkers";
import { weapons as fallbackWeapons, type Weapon } from "@/data/weapons";
import { missions as fallbackMissions, type Mission } from "@/data/missions";
import { dbQuery, hasDatabaseUrl } from "@/lib/database";

export type ContentEntity = "weapons" | "attachments" | "loot" | "guides" | "mapMarkers" | "missions";
export type ContentMeta = { source: "files" | "database"; message?: string };
export type ContentState = {
  weapons: Weapon[];
  attachments: Attachment[];
  loot: LootItem[];
  guides: Guide[];
  mapMarkers: MapMarker[];
  missions: Mission[];
  __meta?: ContentMeta;
  _meta?: ContentMeta;
};

const fallbackContent: ContentState = {
  weapons: fallbackWeapons,
  attachments: fallbackAttachments,
  loot: fallbackLootItems,
  guides: fallbackGuides,
  mapMarkers: fallbackMapMarkers,
  missions: fallbackMissions,
  __meta: { source: "files", message: "DATABASE_URL не задан — используются данные из src/data." },
  _meta: { source: "files", message: "DATABASE_URL не задан — используются данные из src/data." },
};

const sortKeys: Record<ContentEntity, "slug" | "id"> = {
  weapons: "slug",
  attachments: "slug",
  loot: "slug",
  guides: "slug",
  mapMarkers: "id",
  missions: "slug",
};

function sortByKey<T extends Record<string, unknown>>(items: T[], key: string) {
  return [...items].sort((a, b) => String(a[key] ?? "").localeCompare(String(b[key] ?? ""), "ru"));
}

function withMeta(content: Omit<ContentState, "__meta" | "_meta">, meta: ContentMeta): ContentState {
  return { ...content, __meta: meta, _meta: meta };
}

export async function getContent(): Promise<ContentState> {
  if (!hasDatabaseUrl()) return fallbackContent;
  try {
    const result = await dbQuery<{ entity: ContentEntity; data: unknown }>("SELECT entity, data FROM content_items ORDER BY entity ASC, key ASC");
    const content: Omit<ContentState, "__meta" | "_meta"> = { weapons: [], attachments: [], loot: [], guides: [], mapMarkers: [], missions: [] };
    for (const row of result.rows) {
      if (row.entity === "weapons") content.weapons.push(row.data as Weapon);
      if (row.entity === "attachments") content.attachments.push(row.data as Attachment);
      if (row.entity === "loot") content.loot.push(row.data as LootItem);
      if (row.entity === "guides") content.guides.push(row.data as Guide);
      if (row.entity === "mapMarkers") content.mapMarkers.push(row.data as MapMarker);
      if (row.entity === "missions") content.missions.push(row.data as Mission);
    }
    const hasAnyData = Object.values(content).some((items) => items.length > 0);
    if (!hasAnyData) {
      return withMeta(
        {
          weapons: fallbackWeapons,
          attachments: fallbackAttachments,
          loot: fallbackLootItems,
          guides: fallbackGuides,
          mapMarkers: fallbackMapMarkers,
          missions: fallbackMissions,
        },
        { source: "files", message: "База подключена, но пока пустая. Нажми Сохранить/Seed в админке или выполни npm run db:seed." },
      );
    }
    return withMeta(
      {
        weapons: content.weapons.length ? (sortByKey(content.weapons as unknown as Record<string, unknown>[], sortKeys.weapons) as unknown as Weapon[]) : fallbackWeapons,
        attachments: content.attachments.length ? (sortByKey(content.attachments as unknown as Record<string, unknown>[], sortKeys.attachments) as unknown as Attachment[]) : fallbackAttachments,
        loot: content.loot.length ? (sortByKey(content.loot as unknown as Record<string, unknown>[], sortKeys.loot) as unknown as LootItem[]) : fallbackLootItems,
        guides: content.guides.length ? (sortByKey(content.guides as unknown as Record<string, unknown>[], sortKeys.guides) as unknown as Guide[]) : fallbackGuides,
        mapMarkers: content.mapMarkers.length ? (sortByKey(content.mapMarkers as unknown as Record<string, unknown>[], sortKeys.mapMarkers) as unknown as MapMarker[]) : fallbackMapMarkers,
        missions: content.missions.length ? (sortByKey(content.missions as unknown as Record<string, unknown>[], sortKeys.missions) as unknown as Mission[]) : fallbackMissions,
      },
      { source: "database" },
    );
  } catch (error) {
    console.error("Failed to read content_items, fallback to src/data", error);
    return withMeta(
      {
        weapons: fallbackWeapons,
        attachments: fallbackAttachments,
        loot: fallbackLootItems,
        guides: fallbackGuides,
        mapMarkers: fallbackMapMarkers,
        missions: fallbackMissions,
      },
      { source: "files", message: `Не удалось прочитать базу, используются src/data: ${error instanceof Error ? error.message : "unknown error"}` },
    );
  }
}

export async function getContentData() { return getContent(); }
export function withoutContentMeta<T extends Record<string, unknown>>(data: T) {
  const { __meta, _meta, ...rest } = data;
  return rest;
}
export async function getWeapons() { return (await getContent()).weapons; }
export async function getAttachments() { return (await getContent()).attachments; }
export async function getLootItems() { return (await getContent()).loot; }
export async function getGuides() { return (await getContent()).guides; }
export async function getMapMarkers() { return (await getContent()).mapMarkers; }
export async function getMissions() { return (await getContent()).missions; }

export type ContentData = ContentState;
