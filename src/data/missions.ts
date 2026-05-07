export type MissionTier = 1 | 2 | 3;
export type MissionSource = "Trader Book" | "Notice Board" | "Mobile Phone" | "DEENA Manual";
export type MissionCategory = "Сбор предметов" | "Доставка" | "Зачистка" | "Охота" | "Исследование" | "Взаимодействие" | "Крафт и ремонт" | "Выживание" | "Обучение";
export type MissionTrader = "General Goods" | "Armorer" | "Mechanic" | "Medic" | "Notice Board" | "Mobile Phone" | "DEENA";
export type MissionDifficulty = "Легко" | "Средне" | "Сложно" | "Очень сложно";
export type MissionRisk = "Низкий" | "Средний" | "Высокий" | "Экстремальный";
export type MissionDataStatus = "Готово" | "Требует проверки" | "Шаблон";

export type MissionItemRequirement = { name: string; amount: number; minDurability?: string; minUses?: string; note?: string };
export type MissionObjective = { title: string; description: string; target?: string; amount?: number; locationHint?: string; trackerLabel: string };
export type MissionReward = { cash: string; fame: string; reputation: string; unlocks: string[]; notes: string };
export type MissionProgression = { unlockCondition: string; unlocksNext: string; progressionValue: number; nextStep: string };
export type Mission = {
  slug: string;
  title: string;
  trader: MissionTrader;
  source: MissionSource;
  tier: MissionTier;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  risk: MissionRisk;
  dataStatus: MissionDataStatus;
  short: string;
  description: string;
  requirements: MissionItemRequirement[];
  objectives: MissionObjective[];
  recommendedGear: string[];
  bestLocations: string[];
  routePlan: string[];
  reward: MissionReward;
  progression: MissionProgression;
  tags: string[];
  relatedLoot: string[];
  relatedSections: string[];
  adminNotes: string;
  playerTips: string[];
  mistakes: string[];
};

export const missionCategories: MissionCategory[] = ["Сбор предметов", "Доставка", "Зачистка", "Охота", "Исследование", "Взаимодействие", "Крафт и ремонт", "Выживание", "Обучение"];
export const missionTraders: MissionTrader[] = ["General Goods", "Armorer", "Mechanic", "Medic", "Notice Board", "Mobile Phone", "DEENA"];
export const missionSources: MissionSource[] = ["Trader Book", "Notice Board", "Mobile Phone", "DEENA Manual"];
export const missionDifficulties: MissionDifficulty[] = ["Легко", "Средне", "Сложно", "Очень сложно"];
export const missionRisks: MissionRisk[] = ["Низкий", "Средний", "Высокий", "Экстремальный"];

export const missionCategoryInfo = [
  { category: "Сбор предметов", description: "Найти и сдать предметы с нужным количеством, состоянием или зарядом.", bestFor: "Фарм денег, подготовка склада и прогресс торговцев." },
  { category: "Доставка", description: "Перенести груз или предмет между точками, часто с маршрутом и риском перехвата.", bestFor: "Игроки с транспортом и безопасными дорогами." },
  { category: "Зачистка", description: "Убить puppets, животных или другие цели указанным способом.", bestFor: "Fame, боевой опыт и прокачка Armorer." },
  { category: "Охота", description: "Выследить животное, добыть ресурс или выполнить outdoor objective.", bestFor: "Тихие PvE-маршруты и выживание." },
  { category: "Исследование", description: "Посетить POI, сектор, бункер или специальную точку.", bestFor: "Разведка карты и быстрые задачи." },
  { category: "Взаимодействие", description: "Найти объект и использовать его: ящик, доску, терминал, контейнер или дверь.", bestFor: "Notice board и специальные POI задачи." },
  { category: "Крафт и ремонт", description: "Собрать материалы, создать предмет или отремонтировать экипировку/транспорт.", bestFor: "Базы, транспорт и подготовка к рейдам." },
  { category: "Выживание", description: "Еда, вода, здоровье, бинты и базовые survival-механики.", bestFor: "Новички и старт после вайпа." },
  { category: "Обучение", description: "DEENA/Manual задачи для знакомства с интерфейсом и механиками.", bestFor: "Новые персонажи." }
];

export const missionTierProgression = [
  { tier: 1, title: "Tier 1 — стартовые поручения", description: "Простые задания на сбор, обучение, первую медицину и зачистку одиночных целей.", recommendedPower: "Нож, лук/пистолет, малый рюкзак, бинты, еда и вода.", focus: ["Минимальный риск", "Бытовой лут", "Первые Fame/деньги", "Разведка POI"] },
  { tier: 2, title: "Tier 2 — стабильный фарм", description: "Больше требований, длиннее маршруты, чаще нужны транспорт, инструменты, оружие и безопасный план отхода.", recommendedPower: "Пистолет/SMG/AK, средняя броня, нормальная медицина, транспорт или тайник.", focus: ["Транспорт", "Медицина", "Оружейные комнаты", "Маршруты"] },
  { tier: 3, title: "Tier 3 — высокий риск", description: "Опасные POI, редкие предметы, сложные interactions и награды для поздней игры.", recommendedPower: "Автомат/снайперка, броня, много патронов, advanced медицина, напарник.", focus: ["Военные зоны", "Бункеры", "Редкий лут", "Endgame"] }
];

export const missions: Mission[] = [
  {
    slug: "deena-first-steps",
    title: "DEENA: первые шаги выжившего",
    trader: "DEENA",
    source: "DEENA Manual",
    tier: 1,
    category: "Обучение",
    difficulty: "Легко",
    risk: "Низкий",
    dataStatus: "Готово",
    short: "Открыть журнал, собрать первые ресурсы и создать базовый инструмент.",
    description: "Стартовая обучающая миссия для новых персонажей. Она помогает не потеряться после спавна: открыть журнал, собрать ресурсы, создать простой инструмент и подготовиться к первому POI.",
    requirements: [],
    objectives: [
      { title: "Открой Journal", description: "Проверь активные задачи и Manual.", target: "Journal", amount: 1, locationHint: "TAB меню", trackerLabel: "Журнал открыт" },
      { title: "Собери ресурсы", description: "Подбери камни, ветки или ткань.", target: "Базовые ресурсы", amount: 3, locationHint: "Лес/дорога/дома", trackerLabel: "Ресурсы собраны" },
      { title: "Создай инструмент", description: "Сделай нож или другой стартовый предмет.", target: "Крафт", amount: 1, locationHint: "Crafting", trackerLabel: "Инструмент создан" }
    ],
    recommendedGear: ["Пустые руки", "Любая одежда", "Внимание к метаболизму"],
    bestLocations: ["Стартовый сектор", "Лес", "Ближайшие дома"],
    routePlan: ["Осмотри место спавна", "Собери камни/ветки", "Сделай нож", "Проверь здоровье и карту"],
    reward: { cash: "—", fame: "Обучение", reputation: "Не применяется", unlocks: ["Базовый крафт", "Journal"], notes: "Наличие DEENA и награды зависят от версии/сервера." },
    progression: { unlockCondition: "Новый персонаж или включённая DEENA", unlocksNext: "Выживание и первые POI", progressionValue: 10, nextStep: "Собрать бинты, воду и стартовый рюкзак." },
    tags: ["deena", "tutorial", "manual", "новичок"],
    relatedLoot: ["rag-strips", "knife", "food"],
    relatedSections: ["Гайды", "Подготовка"],
    adminNotes: "Можно заменить objective IDs после сверки с сервером.",
    playerTips: ["Не беги сразу в военную зону.", "Сначала сделай нож и бинты.", "Проверь метаболизм."],
    mistakes: ["Игнорировать Journal.", "Бежать без бинтов.", "Подбирать тяжёлый мусор в первые минуты."]
  },
  {
    slug: "general-t1-household-supplies",
    title: "General Goods T1: бытовые расходники",
    trader: "General Goods",
    source: "Trader Book",
    tier: 1,
    category: "Сбор предметов",
    difficulty: "Легко",
    risk: "Низкий",
    dataStatus: "Шаблон",
    short: "Собрать мыло, батарейку, иголку, изоленту или похожие бытовые предметы.",
    description: "Стартовое поручение торговца на бытовой лут. Лучше выполнять рядом с safe zone в деревнях, домах, магазинах и подсобках.",
    requirements: [
      { name: "Мыло / Soap", amount: 1 },
      { name: "Battery", amount: 1, minUses: "Проверить в задании" },
      { name: "Needle или Duct Tape", amount: 1, note: "Точный список зависит от квеста." }
    ],
    objectives: [
      { title: "Принять миссию", description: "Проверь точный список в книге General Goods.", target: "Trader Book", amount: 1, locationHint: "Safe zone", trackerLabel: "Миссия принята" },
      { title: "Собрать предметы", description: "Лутай дома, магазины, кухни, ванные и подсобки.", target: "Household supplies", amount: 3, locationHint: "Деревни/города", trackerLabel: "Предметы собраны" },
      { title: "Сдать торговцу", description: "Убедись, что состояние и заряд подходят.", target: "General Goods", amount: 1, locationHint: "Safe zone", trackerLabel: "Сдано торговцу" }
    ],
    recommendedGear: ["Малый рюкзак", "Нож", "Бинты", "Пистолет/лук по желанию"],
    bestLocations: ["Деревни", "Жилые дома", "Магазины", "Кухни и ванные"],
    routePlan: ["Проверь список", "Выбери ближайшую деревню", "Проверяй бытовые контейнеры", "Не бери лишний тяжёлый лут", "Сдай"],
    reward: { cash: "Низкая–средняя", fame: "Низкий", reputation: "General Goods progression", unlocks: ["Бытовые T2 поручения"], notes: "Награды зависят от настроек сервера." },
    progression: { unlockCondition: "Доступ к General Goods", unlocksNext: "Доставки и редкий бытовой лут", progressionValue: 25, nextStep: "Завести ящик 'квестовые предметы'." },
    tags: ["general", "t1", "бытовой лут", "safe zone"],
    relatedLoot: ["duct-tape", "sewing-kit", "battery"],
    relatedSections: ["Лут", "Карта"],
    adminNotes: "Шаблон под разные T1 fetch quests.",
    playerTips: ["Не выбрасывай батарейки и иголки.", "Храни бытовой лут отдельно.", "Малые деревни безопаснее больших городов."],
    mistakes: ["Забыть точные требования.", "Сдать предмет с неподходящим uses.", "Забить рюкзак дешёвым мусором."]
  },
  {
    slug: "armorer-t1-bow-puppets",
    title: "Armorer T1: зачистка луком",
    trader: "Armorer",
    source: "Trader Book",
    tier: 1,
    category: "Зачистка",
    difficulty: "Средне",
    risk: "Средний",
    dataStatus: "Шаблон",
    short: "Убить несколько puppets луком или указанным оружием.",
    description: "Тихая боевая миссия для прокачки Armorer. Подходит для деревень, ферм и окраин, где можно выманивать puppets по одному.",
    requirements: [{ name: "Bow", amount: 1 }, { name: "Arrows", amount: 10, note: "Лучше взять запас." }],
    objectives: [
      { title: "Подготовить лук", description: "Проверь стрелы и состояние оружия.", target: "Bow", amount: 1, locationHint: "База/крафт", trackerLabel: "Лук готов" },
      { title: "Убить цели", description: "Убивай одиночных puppets без лишнего шума.", target: "Puppets", amount: 5, locationHint: "Деревни/фермы", trackerLabel: "Цели убиты" },
      { title: "Получить награду", description: "Вернись к Armorer после выполнения objective.", target: "Armorer", amount: 1, locationHint: "Safe zone", trackerLabel: "Награда получена" }
    ],
    recommendedGear: ["Лук", "20+ стрел", "Нож", "Бинты", "Лёгкая броня"],
    bestLocations: ["Фермы", "Деревни", "Окраины городов", "POI без мехов"],
    routePlan: ["Выбери тихую деревню", "Выманивай по одной цели", "Подбирай стрелы", "Не стреляй огнестрелом", "Сдай"],
    reward: { cash: "Низкая–средняя", fame: "Средний", reputation: "Armorer progression", unlocks: ["Боевые T2 задания"], notes: "Количество целей зависит от конкретного задания." },
    progression: { unlockCondition: "Armorer T1", unlocksNext: "Kill quests огнестрелом и задания на патроны", progressionValue: 35, nextStep: "Собрать патроны/магазины для следующих заданий." },
    tags: ["armorer", "лук", "puppets", "тихо"],
    relatedLoot: ["arrows", "emergency-bandage"],
    relatedSections: ["Оружие", "Подготовка"],
    adminNotes: "Уточнить точное количество kills на сервере.",
    playerTips: ["Убей одиночные цели, не толпу.", "Подбирай стрелы.", "Используй заборы и окна."],
    mistakes: ["Не взять запасные стрелы.", "Стрелять по толпе.", "Бежать без выносливости."]
  }
];

export function getMissionBySlug(slug: string) {
  return missions.find((mission) => mission.slug === slug);
}
