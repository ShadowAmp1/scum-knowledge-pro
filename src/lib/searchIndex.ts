import { attachments } from "@/data/attachments";
import { bunkers } from "@/data/bunkers";
import { guides } from "@/data/guides";
import { lootItems } from "@/data/loot";
import { mapCategoryLabels, mapMarkers } from "@/data/mapMarkers";
import { raidKits } from "@/data/preparation";
import { vehicles } from "@/data/vehicles";
import { weapons } from "@/data/weapons";

export type SearchKind = "Оружие" | "Обвес" | "Лут" | "Бункер" | "Карта" | "Гайд" | "Транспорт" | "Подготовка" | "Раздел";
export type SearchItem = { id: string; kind: SearchKind; title: string; description: string; href: string; badges: string[]; keywords: string; priority: number };

const join = (parts: Array<string | string[] | undefined | null>) => parts.flatMap((p) => Array.isArray(p) ? p : p ? [p] : []).join(" ").toLowerCase();

export const searchItems: SearchItem[] = [
  { id: "section-search", kind: "Раздел", title: "Поиск по всему сайту", description: "Единый поиск по оружию, обвесам, луту, бункерам, карте, гайдам и транспорту.", href: "/search", badges: ["Global Search"], keywords: "поиск глобальный оружие лут бункеры карта гайды транспорт обвесы", priority: 100 },
  { id: "section-compare", kind: "Раздел", title: "Сравнение оружия", description: "Сравни 2–3 оружия по роли, рейтингу, патронам, билдам, плюсам, минусам и обвесам.", href: "/weapons/compare", badges: ["Compare"], keywords: "сравнение оружия сравнить tier рейтинг патроны билд обвесы", priority: 100 },
  { id: "section-admin", kind: "Раздел", title: "Admin Lite", description: "Локальная админ-панель для черновиков оружия, лута, маркеров карты и гайдов без базы данных.", href: "/admin", badges: ["Admin Lite"], keywords: "админ админка панель добавить оружие лут карту гайд json черновик", priority: 100 },
  ...weapons.map((weapon) => ({ id: `weapon-${weapon.slug}`, kind: "Оружие" as const, title: weapon.name, description: weapon.summary, href: `/weapons/${weapon.slug}`, badges: [weapon.category, `Tier ${weapon.tier}`, weapon.ammo], keywords: join([weapon.name, weapon.type, weapon.ammo, weapon.category, weapon.shortRole, weapon.summary, weapon.bestBuild, weapon.attachments, weapon.whereToFind, weapon.pros, weapon.cons, weapon.tips]), priority: 85 })),
  ...attachments.map((attachment) => ({ id: `attachment-${attachment.slug}`, kind: "Обвес" as const, title: attachment.name, description: attachment.summary, href: `/weapons/attachments/${attachment.slug}`, badges: [attachment.category, attachment.rarity, ...attachment.compatibleWeapons.slice(0, 2)], keywords: join([attachment.name, attachment.category, attachment.subcategory, attachment.role, attachment.summary, attachment.compatibleWeapons, attachment.bestFor, attachment.whereToFind, attachment.tips]), priority: 75 })),
  ...lootItems.map((item) => ({ id: `loot-${item.slug}`, kind: "Лут" as const, title: item.name, description: item.usage, href: `/loot/${item.slug}`, badges: [item.category, item.priority, item.usefulness], keywords: join([item.name, item.category, item.value, item.stage, item.forWhom, item.usage, item.keepOrSell, item.locations, item.bestLocations, item.tips, item.related]), priority: 70 })),
  ...bunkers.map((bunker) => ({ id: `bunker-${bunker.slug}`, kind: "Бункер" as const, title: bunker.name, description: bunker.short, href: `/bunkers/${bunker.slug}`, badges: [bunker.sector, bunker.type, `Риск: ${bunker.risk}`], keywords: join([bunker.name, bunker.sector, bunker.type, bunker.risk, bunker.short, bunker.preparation, bunker.recommendedWeapons, bunker.loot, bunker.enemies, bunker.route, bunker.dangerZones, bunker.soloTips, bunker.duoTips]), priority: 80 })),
  ...mapMarkers.map((marker) => ({ id: `map-${marker.id}`, kind: "Карта" as const, title: marker.name, description: marker.description, href: marker.linkedHref ?? "/map", badges: [marker.sector, mapCategoryLabels[marker.category], `Риск: ${marker.risk}`], keywords: join([marker.name, marker.sector, mapCategoryLabels[marker.category], marker.short, marker.description, marker.bestFor, marker.recommendedKit, marker.searchFor, marker.dangerNotes, marker.playerFit, marker.newbieAdvice]), priority: 65 })),
  ...guides.map((guide) => ({ id: `guide-${guide.slug}`, kind: "Гайд" as const, title: guide.title, description: guide.summary, href: `/guides/${guide.slug}`, badges: [guide.category, guide.difficulty, `${guide.minutes} мин`], keywords: join([guide.title, guide.category, guide.summary, guide.intro, guide.goals, guide.checklist, guide.suitsFor, guide.stepPlan, guide.bring, guide.expectedResult, guide.mistakes, guide.tips, guide.sections.flatMap((section) => [section.heading, section.body, ...section.bullets])]), priority: 70 })),
  ...vehicles.map((vehicle) => ({ id: `vehicle-${vehicle.name}`, kind: "Транспорт" as const, title: vehicle.name, description: vehicle.usage, href: "/vehicles", badges: [vehicle.type], keywords: join([vehicle.name, vehicle.type, vehicle.usage, vehicle.repair, vehicle.tips]), priority: 55 })),
  ...raidKits.map((kit) => ({ id: `kit-${kit.slug}`, kind: "Подготовка" as const, title: kit.title, description: kit.purpose, href: "/preparation", badges: [kit.difficulty], keywords: join([kit.title, kit.purpose, kit.weapons, kit.armor, kit.meds, kit.tools, kit.food, kit.backpack, kit.notes]), priority: 60 })),
];

export const searchKinds: Array<SearchKind | "Все"> = ["Все", "Оружие", "Обвес", "Лут", "Бункер", "Карта", "Гайд", "Транспорт", "Подготовка", "Раздел"];
