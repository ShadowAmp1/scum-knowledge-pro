import fs from "node:fs";
import path from "node:path";

if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL не задан — seed пропущен.");
  process.exit(0);
}

const pg = await import("pg");
const { Pool } = pg.default ?? pg;
const root = process.cwd();

const entityConfigs = {
  weapons: { file: "src/data/weapons.ts", constName: "weapons", key: "slug" },
  attachments: {
    file: "src/data/attachments.ts",
    constName: "attachments",
    key: "slug",
  },
  loot: { file: "src/data/loot.ts", constName: "lootItems", key: "slug" },
  missions: { file: "src/data/missions.ts", constName: "missions", key: "slug" },
  guides: { file: "src/data/guides.ts", constName: "guides", key: "slug" },
  mapMarkers: {
    file: "src/data/mapMarkers.ts",
    constName: "mapMarkers",
    key: "id",
  },
};

function extractArray(source, constName) {
  const start = source.indexOf(`export const ${constName}`);
  if (start === -1) throw new Error(`Не найден массив ${constName}`);
  const eq = source.indexOf("=", start);
  const bracket = source.indexOf("[", eq);
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = bracket; i < source.length; i += 1) {
    const ch = source[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === "[") depth += 1;
    if (ch === "]") {
      depth -= 1;
      if (depth === 0) return JSON.parse(source.slice(bracket, i + 1));
    }
  }
  throw new Error(`Не найден конец массива ${constName}`);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

try {
  let total = 0;
  for (const [entity, config] of Object.entries(entityConfigs)) {
    const items = extractArray(
      fs.readFileSync(path.join(root, config.file), "utf8"),
      config.constName,
    );
    for (const item of items) {
      const key = String(item?.[config.key] ?? "").trim();
      if (!key) throw new Error(`${entity}: элемент без ключа ${config.key}`);
      await pool.query(
        `INSERT INTO content_items(entity, key, data) VALUES ($1, $2, $3::jsonb)
         ON CONFLICT (entity, key) DO UPDATE SET data = EXCLUDED.data`,
        [entity, key, JSON.stringify(item)],
      );
      total += 1;
    }
    console.log(`Seed ${entity}: ${items.length}`);
  }
  await pool.query(
    "INSERT INTO admin_audit_log(action, meta) VALUES ($1, $2::jsonb)",
    ["seed", JSON.stringify({ total, source: "src/data/*.ts" })],
  );
  console.log(`Готово: ${total} записей в PostgreSQL.`);
} catch (error) {
  console.error(error);
  process.exit(1);
} finally {
  await pool.end();
}
