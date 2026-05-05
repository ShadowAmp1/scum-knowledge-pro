import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { dbQuery, hasDatabaseUrl } from "@/lib/database";
import { ensureContentTables } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Entity = "weapons" | "attachments" | "loot" | "missions" | "guides" | "mapMarkers";
type Config = {
  file: string;
  constName: string;
  typeName: string;
  key: "slug" | "id";
  required: string[];
};
const configs: Record<Entity, Config> = {
  weapons: {
    file: "src/data/weapons.ts",
    constName: "weapons",
    typeName: "Weapon[]",
    key: "slug",
    required: ["slug", "name", "category", "summary", "shortRole"],
  },
  attachments: {
    file: "src/data/attachments.ts",
    constName: "attachments",
    typeName: "Attachment[]",
    key: "slug",
    required: ["slug", "name", "category", "role", "summary"],
  },
  loot: {
    file: "src/data/loot.ts",
    constName: "lootItems",
    typeName: "LootItem[]",
    key: "slug",
    required: ["slug", "name", "category", "usage", "keepOrSell"],
  },
  missions: {
    file: "src/data/missions.ts",
    constName: "missions",
    typeName: "Mission[]",
    key: "slug",
    required: ["slug", "title", "trader", "tier", "category", "short", "description"],
  },
  guides: {
    file: "src/data/guides.ts",
    constName: "guides",
    typeName: "Guide[]",
    key: "slug",
    required: ["slug", "title", "category", "summary", "intro"],
  },
  mapMarkers: {
    file: "src/data/mapMarkers.ts",
    constName: "mapMarkers",
    typeName: "MapMarker[]",
    key: "id",
    required: [
      "id",
      "name",
      "category",
      "sector",
      "x",
      "y",
      "short",
      "description",
    ],
  },
};
function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function validate(entity: Entity, items: unknown) {
  const config = configs[entity];
  if (!Array.isArray(items)) throw new Error("Ожидался массив элементов");
  const seen = new Set<string>();
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (!isRecord(item))
      throw new Error(`Элемент #${i + 1} должен быть объектом`);
    for (const field of config.required) {
      if (field === "x" || field === "y") {
        const n = Number(item[field]);
        if (!Number.isFinite(n) || n < 0 || n > 100)
          throw new Error(`Маркер #${i + 1}: ${field} должен быть от 0 до 100`);
      } else if (!String(item[field] ?? "").trim())
        throw new Error(`Элемент #${i + 1}: пустое поле ${field}`);
    }
    const key = String(item[config.key] ?? "").trim();
    if (seen.has(key)) throw new Error(`Дубль ${config.key}: ${key}`);
    seen.add(key);
  }
}
function replaceArray(source: string, config: Config, items: unknown) {
  const pattern = new RegExp(
    `export const ${config.constName}: [^=]+ = \\[\\n[\\s\\S]*?\\n\\];`,
  );
  if (!pattern.test(source))
    throw new Error(`Не найден массив ${config.constName}`);
  return source.replace(
    pattern,
    `export const ${config.constName}: ${config.typeName} = ${JSON.stringify(items, null, 2)};`,
  );
}

async function saveToDatabase(
  entity: Entity,
  items: Record<string, unknown>[],
  username?: string,
) {
  const config = configs[entity];
  const keys = items.map((item) => String(item[config.key] ?? "").trim());

  for (const item of items) {
    const key = String(item[config.key] ?? "").trim();
    await dbQuery(
      `INSERT INTO content_items(entity, key, data)
       VALUES ($1, $2, $3::jsonb)
       ON CONFLICT (entity, key)
       DO UPDATE SET data = EXCLUDED.data`,
      [entity, key, JSON.stringify(item)],
    );
  }

  await dbQuery(
    "DELETE FROM content_items WHERE entity = $1 AND NOT (key = ANY($2::text[]))",
    [entity, keys],
  );

  await dbQuery(
    "INSERT INTO admin_audit_log(action, entity, username, meta) VALUES ($1, $2, $3, $4::jsonb)",
    [
      "save-from-admin",
      entity,
      username ?? "unknown",
      JSON.stringify({ count: items.length, keys }),
    ],
  );
}

export async function PUT(request: Request) {
  const session = getAdminSession();
  if (!session)
    return NextResponse.json(
      { ok: false, message: "Нужен вход в админ-панель" },
      { status: 401 },
    );
  const body = (await request.json().catch(() => null)) as {
    entity?: Entity;
    items?: unknown;
  } | null;
  if (!body?.entity || !configs[body.entity])
    return NextResponse.json(
      { ok: false, message: "Неизвестная вкладка данных" },
      { status: 400 },
    );
  try {
    validate(body.entity, body.items);
    const items = body.items as Record<string, unknown>[];
    if (hasDatabaseUrl()) {
      await ensureContentTables();
      await saveToDatabase(body.entity, items, session.username);
      return NextResponse.json({
        ok: true,
        storage: "database",
        count: items.length,
      });
    }
    const config = configs[body.entity];
    const file = path.join(process.cwd(), config.file);
    fs.writeFileSync(
      file,
      replaceArray(fs.readFileSync(file, "utf8"), config, body.items),
      "utf8",
    );
    return NextResponse.json({
      ok: true,
      storage: "files",
      count: Array.isArray(body.items) ? body.items.length : 0,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Ошибка сохранения",
      },
      { status: 400 },
    );
  }
}
