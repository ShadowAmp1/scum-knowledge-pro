import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { dbQuery, hasDatabaseUrl } from "@/lib/database";
import { attachments } from "@/data/attachments";
import { guides } from "@/data/guides";
import { lootItems } from "@/data/loot";
import { mapMarkers } from "@/data/mapMarkers";
import { weapons } from "@/data/weapons";
import { missions } from "@/data/missions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Entity = "weapons" | "attachments" | "loot" | "guides" | "mapMarkers" | "missions";
type Item = Record<string, unknown>;
type DataState = Record<Entity, Item[]>;

const fallbackData: DataState = {
  weapons: weapons as unknown as Item[],
  attachments: attachments as unknown as Item[],
  loot: lootItems as unknown as Item[],
  guides: guides as unknown as Item[],
  mapMarkers: mapMarkers as unknown as Item[],
  missions: missions as unknown as Item[],
};
const entityKeys: Record<Entity, "slug" | "id"> = {
  weapons: "slug",
  attachments: "slug",
  loot: "slug",
  guides: "slug",
  mapMarkers: "id",
  missions: "slug",
};

export async function GET() {
  if (!getAdminSession())
    return NextResponse.json(
      { ok: false, message: "Нужен вход в админ-панель" },
      { status: 401 },
    );
  if (!hasDatabaseUrl())
    return NextResponse.json({
      ok: true,
      source: "files",
      data: fallbackData,
      message: "DATABASE_URL не задан — показаны данные из src/data.",
    });
  try {
    const rows = await dbQuery<{ entity: Entity; key: string; data: Item }>(
      "SELECT entity, key, data FROM content_items ORDER BY entity ASC, key ASC",
    );
    const data: DataState = {
      weapons: [],
      attachments: [],
      loot: [],
      guides: [],
      mapMarkers: [],
      missions: [],
    };
    for (const row of rows.rows)
      if (row.entity in data) data[row.entity].push(row.data);
    let hasDbData = false;
    for (const entity of Object.keys(data) as Entity[]) {
      if (data[entity].length > 0) hasDbData = true;
      const key = entityKeys[entity];
      data[entity].sort((a, b) =>
        String(a[key] ?? "").localeCompare(String(b[key] ?? ""), "ru"),
      );
    }
    if (!hasDbData)
      return NextResponse.json({
        ok: true,
        source: "files",
        data: fallbackData,
        message:
          "База подключена, но ещё пустая. Нажми Seed в БД или выполни npm run db:seed.",
      });
    for (const entity of Object.keys(data) as Entity[]) {
      if (data[entity].length === 0) data[entity] = fallbackData[entity];
    }
    return NextResponse.json({ ok: true, source: "database", data });
  } catch (error) {
    return NextResponse.json({
      ok: true,
      source: "files",
      data: fallbackData,
      message: `Не удалось прочитать PostgreSQL, показаны src/data: ${error instanceof Error ? error.message : "unknown error"}`,
    });
  }
}
