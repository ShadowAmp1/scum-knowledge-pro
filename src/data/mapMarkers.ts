export type MapMarkerCategory =
  | "bunker"
  | "abandonedBunker"
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
  bunker: "Обычные бункеры",
  abandonedBunker: "Заброшенные бункеры",
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
    linkedHref: `/bunkers/${sector.toLowerCase()}-regular-bunker`,
  };
}

function abandonedBunker(
  sector: string,
  x: number,
  y: number,
  note: string
): MapMarker {
  return {
    id: `${sector.toLowerCase()}-abandoned-bunker`,
    name: `Заброшенный бункер ${sector}`,
    category: "abandonedBunker",
    sector,
    x,
    y,
    risk: "Экстрим",
    lootTier: "T4",
    short: `Заброшенный бункер в секторе ${sector}.`,
    description:
      `Заброшенный бункер ${sector}. Координата выставлена по присланному тобой квадрату карты: ${note}. Подходит для опасных рейдов, военного лута и редких расходников.`,
    bestFor: ["Топовый лут", "Редкие предметы", "Опасный рейд", "Командный заход"],
    recommendedKit: [
      "автомат/ПП с глушителем и запасом патронов",
      "бронежилет, шлем, бинты и обезболивающее",
      "ночное видение/фонарь, еда и вода",
      "отмычки, отвертки и место в рюкзаке",
      "план отхода и транспорт недалеко от входа",
    ],
    linkedHref: `/bunkers/${sector.toLowerCase()}-abandoned-bunker`,
  };
}


function trader(
  sector: string,
  x: number,
  y: number,
  name: string,
  note: string
): MapMarker {
  return {
    id: `${sector.toLowerCase()}-trader`,
    name,
    category: "trader",
    sector,
    x,
    y,
    risk: "Низкий",
    lootTier: "T2",
    short: `Торговец / safe zone в секторе ${sector}.`,
    description:
      `${name}. Точка добавлена по твоему скрину карты: ${note}. Это безопасная торговая зона, где можно продавать лут, покупать снаряжение и использовать её как ориентир для маршрутов.`,
    bestFor: ["Продажа лута", "Покупка снаряжения", "Безопасная зона", "Ориентир для маршрутов"],
    recommendedKit: [
      "лут на продажу",
      "деньги / банковская карта персонажа",
      "список нужных покупок",
      "место в машине или рюкзаке под закупку",
    ],
  };
}

export const mapMarkers: MapMarker[] = [
  // Обычные бункеры — оставлены только те точки, которые были присланы скриншотами.
  bunker("Z0", 86.7, 92.6, "Экстрим", "T4"),
  bunker("Z2", 53.9, 83.0, "Высокий", "T4"),
  bunker("A2", 43.4, 62.0, "Высокий", "T4"),
  bunker("B0", 93.7, 46.5, "Высокий", "T3"),
  bunker("B4", 11.6, 41.5, "Высокий", "T3"),
  bunker("C1", 66.5, 26.3, "Высокий", "T4"),
  bunker("D0", 97.8, 1.5, "Высокий", "T3"),
  bunker("D3", 31.3, 4.7, "Высокий", "T3"),

  // Заброшенные бункеры — оставлены только те точки, которые были присланы скриншотами.
  abandonedBunker("A1", 63.5, 71.4, "юго-запад сектора A1, рядом с береговой дорогой"),
  abandonedBunker("A3", 25.5, 69.9, "юго-западная часть сектора A3, у поселения возле белой дороги"),
  abandonedBunker("C4", 11.4, 24.1, "северо-восточная часть сектора C4, возле белой дороги и малого комплекса"),
  abandonedBunker("D1", 76.0, 5.1, "северо-восточная часть сектора D1, рядом с озером и желтой дорогой"),

  // Торговцы / safe zones — добавлены по присланным скринам карты.
  trader("A4", 6.3, 55.8, "Торговец A4", "островная safe zone на юго-западе карты; координата подправлена по твоим скринам"),
  trader("C2", 52.8, 22.4, "Торговец C2", "островная safe zone на озере в секторе C2; маркер сдвинут по стрелке на твоем скрине"),
  trader("Z2", 43.8, 84.4, "Торговец Z2", "северная safe zone в секторе Z2; координата подправлена по твоим скринам"),
  trader("Z0", 82.6, 75.1, "Торговец Z0", "островная safe zone в южной части карты; маркер сдвинут по стрелке на твоем скрине"),
];
