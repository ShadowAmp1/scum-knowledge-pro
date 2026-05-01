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
  trader: "Торговцы",
  loot: "Лут",
  vehicle: "Транспорт",
  base: "Места под базу",
  danger: "Опасные зоны",
  town: "Города",
  military: "Военные зоны",
};

export const mapRows = ["D", "C", "B", "A", "Z"];
export const mapColumns = ["4", "3", "2", "1", "0"];

export const mapMarkers: MapMarker[] = [
  {
    id: "c2-center-island-bunker",
    name: "Остров C2",
    category: "bunker",
    sector: "C2",
    x: 50,
    y: 23,
    risk: "Высокий",
    lootTier: "T4",
    short: "Центральная точка на озере в C2, отмеченная на твоей карте.",
    description:
      "Ключевая центральная точка карты: удобно строить маршруты к северу, югу и в сторону B2/B1. На изображении она отмечена зеленым кругом.",
    bestFor: ["Маршрутный ориентир", "Военный фарм", "Рейд дуо"],
    recommendedKit: ["AKM/AK-15 или MP5", "2-3 магазина", "бронежилет", "бинты", "еда и вода"],
    linkedHref: "/bunkers",
  },
  {
    id: "a4-west-island",
    name: "Остров A4",
    category: "loot",
    sector: "A4",
    x: 3.5,
    y: 53.5,
    risk: "Средний",
    lootTier: "T2",
    short: "Западный остров, отмеченный зеленым кругом.",
    description:
      "Отдельная островная зона на западе. Хороша как ориентир для маршрутов по побережью и спокойного фарма вдали от центра карты.",
    bestFor: ["Островной фарм", "Тайники", "PvE-маршрут"],
    recommendedKit: ["большой рюкзак", "еда", "вода", "лодка/транспорт рядом", "оружие ближней дистанции"],
    linkedHref: "/loot",
  },
  {
    id: "z2-island-point",
    name: "Остров Z2",
    category: "loot",
    sector: "Z2",
    x: 40,
    y: 85,
    risk: "Средний",
    lootTier: "T3",
    short: "Южный остров в секторе Z2, отмеченный зеленым кругом.",
    description:
      "Удобная точка для южного маршрута: можно совмещать фарм острова, побережья и ближайших населенных зон.",
    bestFor: ["Южный маршрут", "Лут", "Тихий фарм"],
    recommendedKit: ["рюкзак", "бинты", "еда/вода", "оружие ближней/средней дистанции"],
    linkedHref: "/loot",
  },
  {
    id: "z0-east-island",
    name: "Остров Z0",
    category: "base",
    sector: "Z0",
    x: 80.5,
    y: 77,
    risk: "Средний",
    lootTier: "T2",
    short: "Восточный остров в Z0, отмеченный зеленым кругом.",
    description:
      "Красивая изолированная зона на юго-востоке. Подойдет для PvE-базы или скрытой базы, если сервер позволяет строиться рядом.",
    bestFor: ["PvE база", "Островная база", "Красивый вид"],
    recommendedKit: ["инструменты", "гвозди", "болты", "ящики", "транспорт для перевозки ресурсов"],
    linkedHref: "/bases",
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
    short: "Крупный город на северо-западе карты.",
    description:
      "Большая городская зона с большим количеством зданий, гаражей и городского лута. Хороша для инструментов, одежды, еды и расходников.",
    bestFor: ["Городской лут", "Инструменты", "Еда", "Детали"],
    recommendedKit: ["рюкзак", "холодное оружие", "бинты", "фонарь"],
    linkedHref: "/loot",
  },
  {
    id: "c0-east-city",
    name: "Восточный город C0",
    category: "town",
    sector: "C0",
    x: 90,
    y: 31,
    risk: "Средний",
    lootTier: "T3",
    short: "Крупная городская зона на востоке.",
    description:
      "Хороший город для длительного фарма: много построек, дорог, гаражей и маршрутов к побережью.",
    bestFor: ["Городской фарм", "Детали", "Ремонт", "Еда"],
    recommendedKit: ["большой рюкзак", "бинты", "еда/вода", "оружие с глушителем"],
    linkedHref: "/loot",
  },
  {
    id: "b2-airfield",
    name: "Аэродром B2/B1",
    category: "military",
    sector: "B2 / B1",
    x: 52.5,
    y: 43,
    risk: "Высокий",
    lootTier: "T4",
    short: "Аэродром в центральной части карты.",
    description:
      "Одна из заметных военных зон на карте. Подходит для оружия, патронов, брони и маршрутов с высоким риском.",
    bestFor: ["Оружие", "Патроны", "Броня", "PvP"],
    recommendedKit: ["AK/SVD", "бронежилет", "много бинтов", "подавитель", "план отхода"],
    linkedHref: "/weapons",
  },
  {
    id: "a1-port-town",
    name: "Порт A1",
    category: "town",
    sector: "A1",
    x: 61.5,
    y: 64,
    risk: "Средний",
    lootTier: "T3",
    short: "Прибрежный город/порт в A1.",
    description:
      "Полезная южная точка с доступом к дорогам, воде и городскому луту. Можно строить маршруты на Z-сектора и восток.",
    bestFor: ["Городской фарм", "Южный маршрут", "Транспорт"],
    recommendedKit: ["рюкзак", "оружие ближней дистанции", "еда", "вода"],
    linkedHref: "/loot",
  },
  {
    id: "z1-red-zone",
    name: "Южная промышленная зона Z1",
    category: "danger",
    sector: "Z1",
    x: 61.5,
    y: 88.5,
    risk: "Высокий",
    lootTier: "T3",
    short: "Красная/промышленная зона на юге карты.",
    description:
      "Заметная зона внизу карты. Подойдет для маршрутов за промышленным лутом, но лучше заходить подготовленным.",
    bestFor: ["Промышленный лут", "Инструменты", "Детали", "Ресурсы"],
    recommendedKit: ["большой рюкзак", "медицина", "оружие", "еда/вода"],
    linkedHref: "/loot",
  },
  {
    id: "a3-west-roads",
    name: "Дороги A3",
    category: "vehicle",
    sector: "A3",
    x: 25,
    y: 59,
    risk: "Средний",
    lootTier: "T2",
    short: "Западные дороги и поселения для проверки транспорта.",
    description:
      "Удобный маршрут для поиска машин, мотоциклов, гаражей, топлива и деталей. Проверяй дороги, заправки и небольшие поселения.",
    bestFor: ["Машины", "Мотоциклы", "Гаражи", "Топливо"],
    recommendedKit: ["канистра", "домкрат", "ремкомплект", "ящик инструментов"],
    linkedHref: "/vehicles",
  },
  {
    id: "b0-east-valley",
    name: "Долина B0",
    category: "base",
    sector: "B0",
    x: 84,
    y: 45,
    risk: "Средний",
    lootTier: "T2",
    short: "Восточная зона для красивой PvE-базы.",
    description:
      "Хороший вариант для базы рядом с водой, дорогами и восточным городом. Удобно, если хочешь жить далеко от центрального шума.",
    bestFor: ["PvE база", "Гараж", "Рыбалка", "Тихий старт"],
    recommendedKit: ["топор", "пила", "гвозди", "болты", "ящики"],
    linkedHref: "/bases",
  },
  {
    id: "d2-snow-route",
    name: "Снежный маршрут D2",
    category: "danger",
    sector: "D2",
    x: 48,
    y: 11,
    risk: "Высокий",
    lootTier: "T3",
    short: "Горная/снежная зона с дорогами и сложной логистикой.",
    description:
      "Северная снежная часть карты требует теплой одежды, еды и продуманного маршрута. Хорошо подходит для опытных игроков.",
    bestFor: ["Опытные игроки", "Маршруты", "Скрытность"],
    recommendedKit: ["теплая одежда", "еда", "вода", "оружие", "транспорт"],
  },
  {
    id: "c1-lake-crossing",
    name: "Перевалы C1",
    category: "vehicle",
    sector: "C1",
    x: 63,
    y: 28,
    risk: "Средний",
    lootTier: "T2",
    short: "Дорожный узел рядом с центральной водой.",
    description:
      "Удобная точка для проверки транспорта и перехода между C2, C1, B2 и B1. Полезна как промежуточный ориентир.",
    bestFor: ["Маршрут", "Транспорт", "Переходы"],
    recommendedKit: ["канистра", "ремкомплект", "еда", "вода"],
    linkedHref: "/vehicles",
  }
];
