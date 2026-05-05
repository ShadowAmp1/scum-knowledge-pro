import { attachments, type Attachment } from "@/data/attachments";
import { guides, type Guide } from "@/data/guides";
import { lootItems, type LootItem } from "@/data/loot";
import { mapMarkers, type MapMarker } from "@/data/mapMarkers";
import { missions, type Mission } from "@/data/missions";
import { weapons, type Weapon } from "@/data/weapons";
import { dbQuery, hasDatabaseUrl } from "@/lib/database";

export type ContentData = { weapons: Weapon[]; attachments: Attachment[]; loot: LootItem[]; missions: Mission[]; guides: Guide[]; mapMarkers: MapMarker[] };
export type EditableEntity = keyof ContentData;
type ContentRow = { entity: EditableEntity; key: string; data: unknown };
export const fallbackContentData: ContentData = { weapons, attachments, loot: lootItems, missions, guides, mapMarkers };

export async function ensureContentTables() {
  if (!hasDatabaseUrl()) return;
  await dbQuery(`CREATE TABLE IF NOT EXISTS content_items (id BIGSERIAL PRIMARY KEY, entity TEXT NOT NULL, key TEXT NOT NULL, data JSONB NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(entity, key)); CREATE INDEX IF NOT EXISTS content_items_entity_idx ON content_items(entity); CREATE TABLE IF NOT EXISTS admin_audit_log (id BIGSERIAL PRIMARY KEY, action TEXT NOT NULL, entity TEXT, key TEXT, username TEXT, meta JSONB, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()); CREATE INDEX IF NOT EXISTS admin_audit_log_created_at_idx ON admin_audit_log(created_at); CREATE INDEX IF NOT EXISTS admin_audit_log_entity_idx ON admin_audit_log(entity); CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql; DROP TRIGGER IF EXISTS content_items_set_updated_at ON content_items; CREATE TRIGGER content_items_set_updated_at BEFORE UPDATE ON content_items FOR EACH ROW EXECUTE FUNCTION set_updated_at();`);
}
function empty(): ContentData { return { weapons: [], attachments: [], loot: [], missions: [], guides: [], mapMarkers: [] }; }
function sorted(data: ContentData): ContentData { data.weapons.sort((a,b)=>a.slug.localeCompare(b.slug)); data.attachments.sort((a,b)=>a.slug.localeCompare(b.slug)); data.loot.sort((a,b)=>a.slug.localeCompare(b.slug)); data.missions.sort((a,b)=>a.slug.localeCompare(b.slug)); data.guides.sort((a,b)=>a.slug.localeCompare(b.slug)); data.mapMarkers.sort((a,b)=>a.id.localeCompare(b.id)); return data; }
export async function getContentData(): Promise<ContentData & { __meta: { source: "database" | "files"; message?: string; updatedAt: string } }> {
  const updatedAt = new Date().toISOString();
  if (!hasDatabaseUrl()) return { ...fallbackContentData, __meta: { source: "files", updatedAt } };
  try {
    await ensureContentTables();
    const rows = await dbQuery<ContentRow>("SELECT entity, key, data FROM content_items ORDER BY entity ASC, key ASC");
    const data = empty();
    for (const row of rows.rows) {
      if (row.entity === "weapons") data.weapons.push(row.data as Weapon);
      if (row.entity === "attachments") data.attachments.push(row.data as Attachment);
      if (row.entity === "loot") data.loot.push(row.data as LootItem);
      if (row.entity === "missions") data.missions.push(row.data as Mission);
      if (row.entity === "guides") data.guides.push(row.data as Guide);
      if (row.entity === "mapMarkers") data.mapMarkers.push(row.data as MapMarker);
    }
    const hasAny = data.weapons.length || data.attachments.length || data.loot.length || data.missions.length || data.guides.length || data.mapMarkers.length;
    if (!hasAny) return { ...fallbackContentData, __meta: { source: "files", updatedAt, message: "База подключена, но пустая. Используются src/data seed-файлы." } };
    return { ...sorted({ weapons: data.weapons.length ? data.weapons : weapons, attachments: data.attachments.length ? data.attachments : attachments, loot: data.loot.length ? data.loot : lootItems, missions: data.missions.length ? data.missions : missions, guides: data.guides.length ? data.guides : guides, mapMarkers: data.mapMarkers.length ? data.mapMarkers : mapMarkers }), __meta: { source: "database", updatedAt } };
  } catch (error) { return { ...fallbackContentData, __meta: { source: "files", updatedAt, message: `PostgreSQL недоступен, используются src/data: ${error instanceof Error ? error.message : "unknown"}` } }; }
}
export function withoutContentMeta(data: ContentData & { __meta: unknown }): ContentData { const { __meta: _m, ...content } = data; return content; }
