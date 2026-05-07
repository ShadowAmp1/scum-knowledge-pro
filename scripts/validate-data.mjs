import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const warnings = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function addError(message) { errors.push(`✕ ${message}`); }
function addWarning(message) { warnings.push(`⚠ ${message}`); }

function walk(relativeDir) {
  const absolute = path.join(root, relativeDir);
  const result = [];
  if (!fs.existsSync(absolute)) return result;
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const full = path.join(absolute, entry.name);
    const relative = path.relative(root, full).replaceAll(path.sep, "/");
    if (entry.isDirectory()) result.push(...walk(relative));
    else result.push(relative);
  }
  return result;
}

function uniqueSlugs(label, slugs) {
  const seen = new Map();
  for (const slug of slugs) {
    if (!slug || !slug.trim()) addError(`${label}: пустой slug`);
    seen.set(slug, (seen.get(slug) ?? 0) + 1);
  }
  for (const [slug, count] of seen.entries()) {
    if (count > 1) addError(`${label}: дубль slug "${slug}" (${count} раза)`);
  }
}

function collectQuotedSlugs(file) {
  const text = read(file);
  return [...text.matchAll(/["']slug["']?\s*:\s*["']([^"']+)["']/g)].map((match) => match[1]);
}

function collectBunkerSlugs() {
  const text = read("src/data/bunkers.ts");
  return [...text.matchAll(/\b(?:regularBunker|abandonedBunker)\(\s*["']([^"']+)["']/g)].map((match) => match[1]);
}

function objectBlocks(file) {
  const text = read(file);
  return [...text.matchAll(/\{\n\s+["']slug["']:\s*["'][^"']+["'],[\s\S]*?\n\s+\}/g)].map((match) => match[0]);
}

function valueOf(block, key) {
  return block.match(new RegExp(`["']${key}["']\\s*:\\s*["']([^"']*)["']`))?.[1] ?? "";
}

function arrayOf(block, key) {
  const match = block.match(new RegExp(`["']${key}["']\\s*:\\s*\\[([\\s\\S]*?)\\]`));
  if (!match) return [];
  return [...match[1].matchAll(/["']([^"']+)["']/g)].map((item) => item[1]);
}

function checkRequiredText(file, fields) {
  for (const block of objectBlocks(file)) {
    const slug = valueOf(block, "slug") || "unknown";
    for (const field of fields) {
      const value = valueOf(block, field);
      if (!value.trim()) addError(`${file}: ${slug}: пустое поле ${field}`);
    }
  }
}

function checkImages() {
  const files = [
    "src/data/bunkers.ts",
    "src/data/mapMarkers.ts",
    "src/components/InteractiveMap.tsx",
    "README.md",
  ];
  const imagePaths = new Set();
  for (const file of files) {
    const text = read(file);
    for (const match of text.matchAll(/["'`](\/images\/[^"'`)]+)["'`]/g)) imagePaths.add(match[1]);
    for (const match of text.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) if (match[1].startsWith("/images/")) imagePaths.add(match[1]);
  }
  for (const imagePath of imagePaths) {
    const diskPath = path.join(root, "public", imagePath.replace(/^\//, ""));
    if (!fs.existsSync(diskPath)) addError(`нет изображения ${imagePath}`);
  }
}

function checkRatings() {
  for (const block of objectBlocks("src/data/weapons.ts")) {
    const slug = valueOf(block, "slug");
    const rating = block.match(/["']rating["']\s*:\s*\{([\s\S]*?)\}/)?.[1];
    if (!rating) { addError(`weapons: ${slug}: нет rating`); continue; }
    for (const key of ["damage", "control", "range", "economy", "bunker", "pvp"]) {
      const value = Number(rating.match(new RegExp(`["']?${key}["']?\\s*:\\s*(\\d+)`))?.[1]);
      if (!Number.isFinite(value) || value < 0 || value > 10) addError(`weapons: ${slug}: рейтинг ${key} должен быть от 0 до 10`);
    }
  }
}

function checkInternalLinks() {
  const existingRoutes = new Set(["/", "/search", "/weapons", "/weapons/compare", "/weapons/attachments", "/loot", "/bunkers", "/map", "/bases", "/vehicles", "/preparation", "/guides", "/admin", "/pro-roadmap"]);
  for (const slug of collectQuotedSlugs("src/data/weapons.ts")) existingRoutes.add(`/weapons/${slug}`);
  for (const slug of collectQuotedSlugs("src/data/attachments.ts")) existingRoutes.add(`/weapons/attachments/${slug}`);
  for (const slug of collectQuotedSlugs("src/data/loot.ts")) existingRoutes.add(`/loot/${slug}`);
  for (const slug of collectQuotedSlugs("src/data/guides.ts")) existingRoutes.add(`/guides/${slug}`);
  for (const slug of collectBunkerSlugs()) existingRoutes.add(`/bunkers/${slug}`);

  const files = [...walk("src/app").filter((file) => file.endsWith(".tsx")), ...walk("src/components").filter((file) => file.endsWith(".tsx")), "src/data/mapMarkers.ts", "src/data/sections.ts"];
  for (const file of files) {
    const text = read(file);
    const links = [
      ...[...text.matchAll(/href=\{?`([^`]+)`\}?/g)].map((m) => m[1]),
      ...[...text.matchAll(/href=["']([^"']+)["']/g)].map((m) => m[1]),
      ...[...text.matchAll(/linkedHref:\s*`([^`]+)`/g)].map((m) => m[1]),
      ...[...text.matchAll(/linkedHref:\s*["']([^"']+)["']/g)].map((m) => m[1]),
    ];
    for (const link of links) {
      if (!link.startsWith("/") || link.includes("${") || link.includes("[")) continue;
      if (!existingRoutes.has(link)) addWarning(`${file}: внутренняя ссылка не найдена в статических маршрутах: ${link}`);
    }
  }
}

function checkCompatibility() {
  const weaponSlugs = new Set(collectQuotedSlugs("src/data/weapons.ts"));
  const attachmentSlugs = new Set(collectQuotedSlugs("src/data/attachments.ts"));

  for (const block of objectBlocks("src/data/attachments.ts")) {
    const slug = valueOf(block, "slug");
    const listedNames = arrayOf(block, "compatibleWeapons");
    const listedSlugs = arrayOf(block, "compatibleWeaponSlugs");
    if (listedNames.length && !listedSlugs.length) addWarning(`attachments: ${slug}: есть текстовая совместимость, но нет slug-связи с оружием`);
    for (const weaponSlug of listedSlugs) {
      if (!weaponSlugs.has(weaponSlug)) addError(`attachments: ${slug}: compatibleWeaponSlugs ссылается на несуществующее оружие "${weaponSlug}"`);
    }
  }

  for (const block of objectBlocks("src/data/weapons.ts")) {
    const slug = valueOf(block, "slug");
    for (const attachmentSlug of arrayOf(block, "recommendedAttachmentSlugs")) {
      if (!attachmentSlugs.has(attachmentSlug)) addError(`weapons: ${slug}: recommendedAttachmentSlugs ссылается на несуществующий обвес "${attachmentSlug}"`);
    }
  }
}

function checkMapData() {
  const text = read("src/data/mapMarkers.ts");
  const bunkerSlugs = new Set(collectBunkerSlugs());
  const labelBlock = text.match(/mapCategoryLabels[\s\S]*?=\s*\{([\s\S]*?)\};/)?.[1] ?? "";
  const categories = [...labelBlock.matchAll(/(\w+):\s*["']/g)].map((match) => match[1]);
  for (const category of categories) {
    const directCount = (text.match(new RegExp(`category:\\s*["']${category}["']`, "g")) ?? []).length;
    const poiCount = (text.match(new RegExp(`poi\\(\\s*\\n\\s*["'][^"']+["'],\\s*\\n\\s*["']${category}["']`, "g")) ?? []).length;
    const factoryCount = category === "bunker" ? (text.match(/^\s*bunker\(/gm) ?? []).length : category === "abandonedBunker" ? (text.match(/^\s*abandonedBunker\(/gm) ?? []).length : 0;
    if (directCount + poiCount + factoryCount <= 0) addWarning(`map: категория ${category} не имеет маркеров и должна скрываться в UI`);
  }
  for (const match of text.matchAll(/bunkerSlug:\s*`\$\{sector\.toLowerCase\(\)\}-(regular|abandoned)-bunker`|bunkerSlug:\s*["']([^"']+)["']/g)) {
    const staticSlug = match[2];
    if (staticSlug && !bunkerSlugs.has(staticSlug)) addError(`map: bunkerSlug ссылается на несуществующий бункер ${staticSlug}`);
  }
  for (const match of text.matchAll(/\bx:\s*(\d+(?:\.\d+)?),\s*\n\s*y:\s*(\d+(?:\.\d+)?)/g)) {
    const x = Number(match[1]); const y = Number(match[2]);
    if (x < 0 || x > 100 || y < 0 || y > 100) addError(`map: координаты маркера вне диапазона 0-100: ${x}, ${y}`);
  }
}


function parseDataArray(file, constName) {
  const text = read(file);
  const match = text.match(new RegExp(String.raw`export const ${constName}: [^=]+ = (\[\n[\s\S]*?\n\]);`));
  if (!match) {
    addError(`${file}: не найден массив ${constName}`);
    return [];
  }
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    addError(`${file}: массив ${constName} не удалось разобрать как JSON: ${error.message}`);
    return [];
  }
}

function checkParsedRelations() {
  const weaponData = parseDataArray("src/data/weapons.ts", "weapons");
  const attachmentData = parseDataArray("src/data/attachments.ts", "attachments");
  const weaponSlugs = new Set(weaponData.map((weapon) => weapon.slug));
  const attachmentSlugs = new Set(attachmentData.map((attachment) => attachment.slug));
  const weaponsWithAttachments = new Set();

  for (const weapon of weaponData) {
    for (const field of ["slug", "name", "summary", "shortRole"]) {
      if (!String(weapon[field] ?? "").trim()) addError(`weapons: ${weapon.slug ?? "unknown"}: пустое поле ${field}`);
    }
    for (const attachmentSlug of weapon.recommendedAttachmentSlugs ?? []) {
      if (!attachmentSlugs.has(attachmentSlug)) addError(`weapons: ${weapon.slug}: recommendedAttachmentSlugs ссылается на несуществующий обвес "${attachmentSlug}"`);
    }
    for (const [ratingKey, ratingValue] of Object.entries(weapon.rating ?? {})) {
      if (!Number.isFinite(ratingValue) || ratingValue < 0 || ratingValue > 10) addError(`weapons: ${weapon.slug}: рейтинг ${ratingKey} должен быть от 0 до 10`);
    }
  }

  for (const attachment of attachmentData) {
    for (const field of ["slug", "name", "summary", "role"]) {
      if (!String(attachment[field] ?? "").trim()) addError(`attachments: ${attachment.slug ?? "unknown"}: пустое поле ${field}`);
    }
    for (const weaponSlug of attachment.compatibleWeaponSlugs ?? []) {
      if (!weaponSlugs.has(weaponSlug)) addError(`attachments: ${attachment.slug}: compatibleWeaponSlugs ссылается на несуществующее оружие "${weaponSlug}"`);
      else weaponsWithAttachments.add(weaponSlug);
    }
    if ((attachment.compatibleWeaponSlugs ?? []).length !== (attachment.compatibleWeapons ?? []).length) {
      addWarning(`attachments: ${attachment.slug}: количество slug-связей и текстовых названий отличается`);
    }
  }

  for (const weapon of weaponData) {
    const normalizedName = String(weapon.name ?? "").toLowerCase();
    const normalizedType = String(weapon.type ?? "").toLowerCase();
    const normalizedAmmo = String(weapon.ammo ?? "").toLowerCase();
    const usuallyNoAttachments =
      ["Ближний бой", "Взрывчатка"].includes(weapon.category) ||
      normalizedName.includes("самодельный") ||
      normalizedName.includes("арбалет") ||
      normalizedAmmo.includes("болт") ||
      normalizedType.includes("обрез") ||
      normalizedType.includes("револьвер");
    if (!usuallyNoAttachments && !weaponsWithAttachments.has(weapon.slug)) {
      addWarning(`weapons: ${weapon.slug}: нет ни одного подходящего обвеса в базе`);
    }
  }
}

function checkDatabaseSetup() {
  const packageJson = JSON.parse(read("package.json"));
  if (!packageJson.dependencies?.pg) addError("package.json: dependency pg отсутствует");
  if (!packageJson.devDependencies?.["@types/pg"]) addWarning("package.json: @types/pg отсутствует в devDependencies");
  for (const script of ["db:migrate", "db:seed"]) {
    if (!packageJson.scripts?.[script]) addError(`package.json: отсутствует script ${script}`);
  }
  for (const file of ["src/lib/database.ts", "scripts/migrate-db.mjs", "scripts/seed-db.mjs", "src/app/api/admin/data/route.ts", "src/app/api/admin/seed/route.ts"]) {
    if (!fs.existsSync(path.join(root, file))) addError(`DB setup: отсутствует файл ${file}`);
  }
  const render = read("render.yaml");
  for (const fragment of ["databases:", "fromDatabase:", "DATABASE_URL", "preDeployCommand", "npm run db:migrate"]) {
    if (!render.includes(fragment)) addError(`render.yaml: отсутствует ${fragment}`);
  }
  const databaseLib = read("src/lib/database.ts");
  if (!databaseLib.includes("pg")) addError("src/lib/database.ts: не найдено подключение pg");
}

function checkArchiveSafety() {
  const gitignore = read(".gitignore");
  if (!gitignore.includes("node_modules")) addError(".gitignore должен исключать node_modules");
  if (!gitignore.includes(".next")) addError(".gitignore должен исключать .next");
  if (!fs.existsSync(path.join(root, "package-lock.json"))) addError("package-lock.json отсутствует");
}

uniqueSlugs("weapons", collectQuotedSlugs("src/data/weapons.ts"));
uniqueSlugs("loot", collectQuotedSlugs("src/data/loot.ts"));
uniqueSlugs("guides", collectQuotedSlugs("src/data/guides.ts"));
uniqueSlugs("attachments", collectQuotedSlugs("src/data/attachments.ts"));
uniqueSlugs("bunkers", collectBunkerSlugs());

checkRequiredText("src/data/weapons.ts", ["name", "summary", "shortRole"]);
checkRequiredText("src/data/attachments.ts", ["name", "summary", "role"]);
checkRequiredText("src/data/loot.ts", ["name", "usage", "keepOrSell"]);
checkRequiredText("src/data/guides.ts", ["title", "summary", "intro"]);
checkRequiredText("src/data/mapMarkers.ts", ["name", "short", "description"]);
checkImages();
checkRatings();
checkCompatibility();
checkParsedRelations();
checkMapData();
checkInternalLinks();
checkArchiveSafety();
checkDatabaseSetup();

if (warnings.length) {
  console.log("Предупреждения:");
  for (const warning of warnings) console.log(warning);
}
if (errors.length) {
  console.error("Ошибки проверки данных:");
  for (const error of errors) console.error(error);
  process.exit(1);
}
console.log("Проверка данных пройдена успешно.");
