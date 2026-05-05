import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { dbQuery, hasDatabaseUrl } from "@/lib/database";
import { attachments } from "@/data/attachments";
import { guides } from "@/data/guides";
import { lootItems } from "@/data/loot";
import { missions } from "@/data/missions";
import { mapMarkers } from "@/data/mapMarkers";
import { weapons } from "@/data/weapons";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Entity = "weapons" | "attachments" | "loot" | "missions" | "guides" | "mapMarkers";
type Item = Record<string, unknown>;
const seedData: Record<Entity, { key: "slug" | "id"; items: Item[] }> = {
  weapons: { key: "slug", items: weapons as unknown as Item[] },
  attachments: { key: "slug", items: attachments as unknown as Item[] },
  loot: { key: "slug", items: lootItems as unknown as Item[] },
  missions: { key: "slug", items: missions as unknown as Item[] },
  guides: { key: "slug", items: guides as unknown as Item[] },
  mapMarkers: { key: "id", items: mapMarkers as unknown as Item[] },
};

export async function POST() {
  const session = getAdminSession();
  if (!session)
    return NextResponse.json(
      { ok: false, message: "Нужен вход в админ-панель" },
      { status: 401 },
    );
  if (!hasDatabaseUrl())
    return NextResponse.json(
      {
        ok: false,
        message:
          "DATABASE_URL не задан. На Render подключи PostgreSQL через render.yaml.",
      },
      { status: 400 },
    );
  try {
    let total = 0;
    for (const [entity, config] of Object.entries(seedData) as [
      Entity,
      { key: "slug" | "id"; items: Item[] },
    ][]) {
      for (const item of config.items) {
        const key = String(item[config.key] ?? "").trim();
        if (!key) continue;
        await dbQuery(
          `INSERT INTO content_items(entity, key, data) VALUES ($1, $2, $3::jsonb) ON CONFLICT (entity, key) DO UPDATE SET data = EXCLUDED.data`,
          [entity, key, JSON.stringify(item)],
        );
        total += 1;
      }
    }
    await dbQuery(
      "INSERT INTO admin_audit_log(action, username, meta) VALUES ($1, $2, $3::jsonb)",
      ["seed-from-admin", session.username, JSON.stringify({ total })],
    );
    return NextResponse.json({ ok: true, total });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Ошибка seed",
      },
      { status: 500 },
    );
  }
}
