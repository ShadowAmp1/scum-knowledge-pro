import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const warnings = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function addError(message) {
  errors.push(`✕ ${message}`);
}

function addWarning(message) {
  warnings.push(`⚠ ${message}`);
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

function checkRequiredText(file, fields) {
  const text = read(file);
  for (const field of fields) {
    const emptyPattern = new RegExp(`["']?${field}["']?\\s*:\\s*["']\\s*["']`, "g");
    if (emptyPattern.test(text)) addError(`${file}: пустое поле ${field}`);
  }
}

function checkImages() {
  const files = [
    "src/data/bunkers.ts",
    "src/components/InteractiveMap.tsx",
    "README.md",
  ];
  const imagePaths = new Set();

  for (const file of files) {
    const text = read(file);
    for (const match of text.matchAll(/["'`](\/images\/[^"'`)]+)["'`]/g)) {
      imagePaths.add(match[1]);
    }
    for (const match of text.matchAll(/url\('([^']+)'\)/g)) {
      if (match[1].startsWith("/images/")) imagePaths.add(match[1]);
    }
  }

  for (const imagePath of imagePaths) {
    const diskPath = path.join(root, "public", imagePath.replace(/^\/images\//, "images/"));
    if (!fs.existsSync(diskPath)) addError(`нет изображения ${imagePath}`);
  }
}

function checkRatings() {
  const text = read("src/data/weapons.ts");
  const ratingBlocks = [...text.matchAll(/"rating"\s*:\s*\{([\s\S]*?)\}/g)];
  for (const [index, blockMatch] of ratingBlocks.entries()) {
    const numbers = [...blockMatch[1].matchAll(/"?(damage|control|range|economy|bunker|pvp)"?\s*:\s*(\d+)/g)];
    if (numbers.length !== 6) {
      addError(`weapons: рейтинг #${index + 1} содержит не все 6 полей`);
      continue;
    }

    for (const [, key, value] of numbers) {
      const numeric = Number(value);
      if (!Number.isFinite(numeric) || numeric < 0 || numeric > 10) {
        addError(`weapons: рейтинг ${key} должен быть от 0 до 10, получено ${value}`);
      }
    }
  }
}

function checkInternalLinks() {
  const existingRoutes = new Set([
    "/",
    "/weapons",
    "/weapons/attachments",
    "/loot",
    "/bunkers",
    "/map",
    "/bases",
    "/vehicles",
    "/preparation",
    "/guides",
    "/pro-roadmap",
  ]);

  for (const slug of collectQuotedSlugs("src/data/weapons.ts")) existingRoutes.add(`/weapons/${slug}`);
  for (const slug of collectQuotedSlugs("src/data/attachments.ts")) existingRoutes.add(`/weapons/attachments/${slug}`);
  for (const slug of collectQuotedSlugs("src/data/loot.ts")) existingRoutes.add(`/loot/${slug}`);
  for (const slug of collectQuotedSlugs("src/data/guides.ts")) existingRoutes.add(`/guides/${slug}`);
  for (const slug of collectBunkerSlugs()) existingRoutes.add(`/bunkers/${slug}`);

  const files = [
    ...walk("src/app").filter((file) => file.endsWith(".tsx")),
    ...walk("src/components").filter((file) => file.endsWith(".tsx")),
    "src/data/mapMarkers.ts",
    "src/data/sections.ts",
  ];

  for (const file of files) {
    const text = read(file);
    const links = [
      ...[...text.matchAll(/href=\{?`([^`]+)`\}?/g)].map((match) => match[1]),
      ...[...text.matchAll(/href=["']([^"']+)["']/g)].map((match) => match[1]),
      ...[...text.matchAll(/linkedHref:\s*`([^`]+)`/g)].map((match) => match[1]),
      ...[...text.matchAll(/linkedHref:\s*["']([^"']+)["']/g)].map((match) => match[1]),
    ];

    for (const link of links) {
      if (!link.startsWith("/")) continue;
      if (link.includes("${")) continue;
      if (!existingRoutes.has(link)) addWarning(`${file}: внутренняя ссылка не найдена в статических маршрутах: ${link}`);
    }
  }
}

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

uniqueSlugs("weapons", collectQuotedSlugs("src/data/weapons.ts"));
uniqueSlugs("loot", collectQuotedSlugs("src/data/loot.ts"));
uniqueSlugs("guides", collectQuotedSlugs("src/data/guides.ts"));
uniqueSlugs("attachments", collectQuotedSlugs("src/data/attachments.ts"));
uniqueSlugs("bunkers", collectBunkerSlugs());

checkRequiredText("src/data/weapons.ts", ["name", "summary", "shortRole"]);
checkRequiredText("src/data/attachments.ts", ["name", "summary", "role"]);
checkRequiredText("src/data/loot.ts", ["name", "usage", "keepOrSell"]);
checkRequiredText("src/data/guides.ts", ["title", "description"]);
checkRequiredText("src/data/mapMarkers.ts", ["name", "short", "description"]);

checkImages();
checkRatings();
checkInternalLinks();

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
