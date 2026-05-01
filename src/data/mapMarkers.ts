export type MapMarkerCategory =
  | "bunker"
  | "trader"
  | "loot"
  | "vehicle"
  | "base"
  | "danger"
  | "town"
  | "military";

export type MapMarker = {
  id: string;
  name: string;
  category: MapMarkerCategory;
  sector: string;
  x: number;
  y: number;
  risk: "Низкий" | "Средний" | "Высокий" | "Экстрим";
  lootTier: "T1" | "T2" | "T3" | "T4";
  short: string;
  description: string;
  bestFor: string[];
  recommendedKit: string[];
  linkedHref?: string;
};

export const mapCategoryLabels: Record<MapMarkerCategory, string> = {
  bunker: "Бункеры",
  trader: "Торговцы / Safe Zone",
  loot: "Лут",
  vehicle: "Транспорт",
  base: "Места под базу",
  danger: "Опасные зоны",
  town: "Города",
  military: "Военные зоны",
};

export const mapRows = ["D", "C", "B", "A", "Z"];
export const mapColumns = ["4", "3", "2", "1", "0"];

const bunkerKit = [
  "оружие с глушителем: MP5 / AKM / AK-15",
  "2-4 магазина и запас патронов",
  "бронежилет и шлем",
  "бинты, обезболивающее, еда и вода",
  "отмычки/отвертки для закрытых шкафчиков",
];

function bunker(
  sector: string,
  x: number,
  y: number,
  risk: MapMarker["risk"] = "Высокий",
  tier: MapMarker["lootTier"] = "T4"
): MapMarker {
  return {
    id: `${sector.toLowerCase()}-bunker`,
    name: `Бункер ${sector}`,
    category: "bunker",
    sector,
    x,
    y,
    risk,
    lootTier: tier,
    short: `Высокотехнологичный бункер в секторе ${sector}.`,
    description:
      `Бункер ${sector}. Метка выставлена на текущую карту из твоего скрина. Это обычный high-tech bunker: снаружи обычно есть опасная зона, внутри военный лут, шкафчики, оружие, патроны и расходники.`,
    bestFor: ["Военный лут", "Оружие", "Патроны", "Броня", "Рейд"],
    recommendedKit: bunkerKit,
    linkedHref: `/bunkers/${sector.toLowerCase()}`,
  };
}

export const mapMarkers: MapMarker[] = [
  // Все 25 обычных high-tech бункеров: по одному на каждый сектор D/A/Z и 0-4.
  // x/y — проценты относительно изображения карты: x слева направо, y сверху вниз.
  bunker("D4", 8.3, 8.7, "Высокий", "T3"),
  bunker("D3", 29.6, 8.9, "Высокий", "T3"),
  bunker("D2", 48.1, 14.0, "Высокий", "T4"),
  bunker("D1", 68.9, 13.7, "Высокий", "T4"),
  bunker("D0", 92.0, 8.6, "Высокий", "T3"),

  bunker("C4", 8.2, 24.9, "Высокий", "T3"),
  bunker("C3", 28.4, 33.8, "Высокий", "T3"),
  bunker("C2", 50.2, 24.3, "Экстрим", "T4"),
  bunker("C1", 67.9, 29.2, "Высокий", "T4"),
  bunker("C0", 88.6, 28.7, "Высокий", "T3"),

  bunker("B4", 9.1, 52.5, "Высокий", "T3"),
  bunker("B3", 30.6, 51.9, "Высокий", "T3"),
  bunker("B2", 47.0, 45.7, "Экстрим", "T4"),
  bunker("B1", 68.5, 42.0, "Высокий", "T4"),
  bunker("B0", 88.1, 50.3, "Высокий", "T3"),

  bunker("A4", 12.2, 71.4, "Высокий", "T3"),
  bunker("A3", 31.8, 69.5, "Высокий", "T3"),
  bunker("A2", 45.1, 65.9, "Высокий", "T4"),
  bunker("A1", 64.0, 63.2, "Высокий", "T4"),
  bunker("A0", 88.8, 65.7, "Высокий", "T3"),

  bunker("Z4", 10.9, 91.7, "Высокий", "T3"),
  bunker("Z3", 29.4, 86.1, "Высокий", "T3"),
  bunker("Z2", 40.0, 84.8, "Высокий", "T4"),
  bunker("Z1", 64.3, 86.9, "Высокий", "T4"),
  bunker("Z0", 81.3, 77.5, "Экстрим", "T4"),

  // Safe zones / торговцы — зеленые круги на твоей карте.
  {
    id: "safe-zone-c2",
    name: "Safe Zone / торговец C2",
    category: "trader",
    sector: "C2",
    x: 50.2,
    y: 23.5,
    risk: "Низкий",
    lootTier: "T1",
    short: "Зеленая зона на острове в C2.",
    description: "Безопасная зона/торговец на центральном острове C2. Удобная точка для продажи лута и сборки маршрута.",
    bestFor: ["Торговля", "Продажа лута", "Маршрут"],
    recommendedKit: ["деньги", "товары на продажу", "еда/вода"],
  },
  {
    id: "safe-zone-a4",
    name: "Safe Zone / торговец A4",
    category: "trader",
    sector: "A4",
    x: 3.5,
    y: 53.5,
    risk: "Низкий",
    lootTier: "T1",
    short: "Западная зеленая зона A4.",
    description: "Западный safe zone на острове A4. Хорошо подходит для спокойного маршрута через западное побережье.",
    bestFor: ["Торговля", "Островной маршрут"],
    recommendedKit: ["деньги", "еда/вода"],
  },
  {
    id: "safe-zone-z2",
    name: "Safe Zone / торговец Z2",
    category: "trader",
    sector: "Z2",
    x: 40.0,
    y: 85.0,
    risk: "Низкий",
    lootTier: "T1",
    short: "Южная зеленая зона Z2.",
    description: "Safe zone на южном острове в Z2. Удобна для южных маршрутов и торговли после фарма.",
    bestFor: ["Торговля", "Южный маршрут"],
    recommendedKit: ["деньги", "рюкзак"],
  },
  {
    id: "safe-zone-z0",
    name: "Safe Zone / торговец Z0",
    category: "trader",
    sector: "Z0",
    x: 80.5,
    y: 77.0,
    risk: "Низкий",
    lootTier: "T1",
    short: "Восточная зеленая зона Z0.",
    description: "Safe zone на юго-восточном острове Z0. Хорошая точка для торговли и маршрутов по востоку карты.",
    bestFor: ["Торговля", "Восточный маршрут"],
    recommendedKit: ["деньги", "еда/вода"],
  },

  // Несколько важных POI, чтобы карта не была только бункерной.
  {
    id: "b2-airfield",
    name: "Аэродром B2/B1",
    category: "military",
    sector: "B2 / B1",
    x: 52.5,
    y: 43.0,
    risk: "Экстрим",
    lootTier: "T4",
    short: "Крупная военная зона в центре карты.",
    description: "Аэродром — удобная военная зона для патронов, оружия, брони и PvP-маршрутов.",
    bestFor: ["Оружие", "Патроны", "Броня", "PvP"],
    recommendedKit: ["AK/SVD", "бронежилет", "много бинтов", "подавитель", "план отхода"],
    linkedHref: "/weapons",
  },
  {
    id: "d3-big-city",
    name: "Большой город D3/C3",
    category: "town",
    sector: "D3 / C3",
    x: 25.5,
    y: 17.5,
    risk: "Средний",
    lootTier: "T3",
    short: "Крупный город на северо-западе.",
    description: "Большая городская зона для еды, одежды, гаражей, инструментов и расходников.",
    bestFor: ["Городской лут", "Инструменты", "Еда", "Детали"],
    recommendedKit: ["рюкзак", "холодное оружие", "бинты", "фонарь"],
    linkedHref: "/loot",
  },
  {
    id: "c0-east-city",
    name: "Восточный город C0",
    category: "town",
    sector: "C0",
    x: 90.0,
    y: 31.0,
    risk: "Средний",
    lootTier: "T3",
    short: "Крупный город на востоке.",
    description: "Восточный город C0: много построек, дорог, гаражей и точек для городского фарма.",
    bestFor: ["Городской фарм", "Детали", "Ремонт", "Еда"],
    recommendedKit: ["большой рюкзак", "бинты", "еда/вода", "оружие с глушителем"],
    linkedHref: "/loot",
  },
];
