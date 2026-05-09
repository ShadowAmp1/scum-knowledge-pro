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
  },
  {
    "slug": "quest-mac10-retrieval",
    "title": "Добыть MAC-10",
    "trader": "Armorer",
    "source": "Mobile Phone",
    "tier": 3,
    "category": "Сбор предметов",
    "difficulty": "Сложно",
    "risk": "Высокий",
    "dataStatus": "Готово",
    "short": "Найти и доставить новый пистолет-пулемет MAC-10.",
    "description": "Armorer получил информацию о появлении нового оружия MAC-10 на острове. Нужно найти и доставить этот редкий ПП для изучения.",
    "requirements": [
      { name: "Оружие для зачистки", amount: 1, note: "Автомат или ПП" },
      { name: "Броня", amount: 1, note: "Рекомендуется" },
      { name: "Медикаменты", amount: 2, note: "Бинты и обезболивающее" }
    ],
    "objectives": [
      { title: "Найти MAC-10", description: "Искать в военных зонах и бункерах.", target: "MAC-10", amount: 1, locationHint: "Военные зоны/Бункеры", trackerLabel: "MAC-10 найден" },
      { title: "Доставить оружие", description: "Отнести MAC-10 Armorer в safe zone.", target: "Armorer", amount: 1, locationHint: "Safe zone", trackerLabel: "Оружие доставлено" }
    ],
    "recommendedGear": ["Автомат", "ПП", "Бронежилет", "Шлем", "Аптечка", "Запас патронов"],
    "bestLocations": ["Военные базы", "Бункеры", "Аирдропы", "Элитные локации"],
    "routePlan": ["Подготовить оружие и броню", "Выбрать военную зону", "Зачистить локацию", "Найти MAC-10", "Вернуться в safe zone"],
    "reward": { cash: "Высокая", fame: "Высокий", reputation: "Armorer progression", unlocks: ["Задания на новое оружие"], notes: "Возможны дополнительные награды." },
    "progression": { unlockCondition: "Armorer T2", unlocksNext: "Задания на SCAR-L и обвесы", progressionValue: 50, nextStep: "Изучить новое оружие и подготовиться к сложным миссиям." },
    "tags": ["armorer", "оружие", "mac-10", "военные зоны"],
    "relatedLoot": ["mac-10", "ammo-45-acp", "magazin-mac-10"],
    "relatedSections": ["Оружие", "Обвесы", "Бункеры"],
    "adminNotes": "MAC-10 появился в обновлении 0.96. Редкость может отличаться на серверах.",
    "playerTips": ["MAC-10 эффективен на ближних дистанциях.", "Береги патроны .45 ACP.", "Используй глушитель для скрытности."],
    "mistakes": ["Идти без брони", "Недостаточно патронов", "Игнорировать зомби в локации."]
  },
  {
    "slug": "quest-scar-l-parts",
    "title": "Компоненты SCAR-L",
    "trader": "Mechanic",
    "source": "Notice Board",
    "tier": 3,
    "category": "Сбор предметов",
    "difficulty": "Очень сложно",
    "risk": "Экстремальный",
    "dataStatus": "Готово",
    "short": "Собрать компоненты для сборки SCAR-L.",
    "description": "Mechanic нуждается в редких компонентах для сборки новой штурмовой винтовки SCAR-L. Компоненты разбросаны по опасным локациям.",
    "requirements": [
      { name: "Инструменты", amount: 2, note: "Отвертка, гаечный ключ" },
      { name: "Контейнеры", amount: 3, note: "Для переноса компонентов" },
      { name: "Оружие защиты", amount: 1, note: "Обязательно" }
    ],
    "objectives": [
      { title: "Найти ствол SCAR-L", description: "Искать в элитных военных зонах.", target: "Ствол SCAR-L", amount: 1, locationHint: "Элитные военные базы", trackerLabel: "Ствол найден" },
      { title: "Найти затворную группу", description: "В бункерах высокого уровня.", target: "Затворная группа SCAR-L", amount: 1, locationHint: "Элитные бункеры", trackerLabel: "Затвор найден" },
      { title: "Найти магазин", description: "В военных складах.", target: "Магазин SCAR-L", amount: 1, locationHint: "Военные склады", trackerLabel: "Магазин найден" },
      { title: "Собрать компоненты", description: "Доставить все компоненты Mechanic.", target: "Mechanic", amount: 1, locationHint: "Safe zone", trackerLabel: "Компоненты доставлены" }
    ],
    "recommendedGear": ["Тяжелая броня", "SCAR-L или другое автоматическое оружие", "Множество магазинов", "Аптечка", "Ремкомплект"],
    "bestLocations": ["Элитные военные базы", "Бункеры S+ уровня", "Аирдропы"],
    "routePlan": ["Подготовить тяжелое снаряжение", "Собрать команду", "Выбрать элитную локацию", "Зачистить по частям", "Собрать компоненты"],
    "reward": { cash: "Очень высокая", fame: "Очень высокий", reputation: "Mechanic progression", unlocks: ["Сборка SCAR-L", "Турельные задания"], notes: "Возможна сборка SCAR-L как бонус." },
    "progression": { unlockCondition: "Mechanic T2", unlocksNext: "Задания на турели и защиту базы", progressionValue: 75, nextStep: "Изучить защиту базы и автоматические системы." },
    "tags": ["mechanic", "scar-l", "компоненты", "элитные локации"],
    "relatedLoot": ["scar-l", "magazin-scar-l", "glushitel-scar-l"],
    "relatedSections": ["Оружие", "Обвесы", "Бункеры", "Строительство"],
    "adminNotes": "Сложность может быть настроена сервером. Компоненты могут иметь разный спавн.",
    "playerTips": ["Работай с командой.", "Используй турели для защиты.", "Береги компоненты - они редкие."],
    "mistakes": ["Идти в одиночку", "Недостаточно контейнеров", "Игнорировать защиту базы."]
  },
  {
    "slug": "quest-head-lamp-delivery",
    "title": "Доставка налобных фонарей",
    "trader": "General Goods",
    "source": "Mobile Phone",
    "tier": 2,
    "category": "Доставка",
    "difficulty": "Средне",
    "risk": "Средний",
    "dataStatus": "Готово",
    "short": "Доставить партию налобных фонарей в разные точки.",
    "description": "General Goods получил поставку новых налобных фонарей и нужно доставить их в разные точки острова для местных групп выживших.",
    "requirements": [
      { name: "Налобный фонарь", amount: 5, note: "Нужно сначала получить" },
      { name: "Транспорт", amount: 1, note: "Машина или мотоцикл" },
      { name: "Карта", amount: 1, note: "Для планирования маршрута" }
    ],
    "objectives": [
      { title: "Получить фонари", description: "Забрать 5 налобных фонарей у General Goods.", target: "Налобный фонарь", amount: 5, locationHint: "General Goods", trackerLabel: "Фонари получены" },
      { title: "Доставить в лагерь 1", description: "Доставить 2 фонаря в северный лагерь.", target: "Лагерь выживших", amount: 2, locationHint: "Северный лагерь", trackerLabel: "Лагерь 1 обслужен" },
      { title: "Доставить в лагерь 2", description: "Доставить 2 фонаря в южный лагерь.", target: "Лагерь выживших", amount: 2, locationHint: "Южный лагерь", trackerLabel: "Лагерь 2 обслужен" },
      { title: "Доставить последний", description: "Доставить 1 фонарь в восточную точку.", target: "Торговая точка", amount: 1, locationHint: "Восточная торговая точка", trackerLabel: "Все доставлено" }
    ],
    "recommendedGear": ["Транспорт", "Налобный фонарь", "Карты", "Запас топлива", "Ремонтный комплект"],
    "bestLocations": ["Лагеря выживших", "Торговые точки", "Дороги"],
    "routePlan": ["Получить фонари", "Планировать маршрут", "Использовать транспорт", "Избегать опасных зон", "Доставить по точкам"],
    "reward": { cash: "Средняя", fame: "Средняя", reputation: "General Goods progression", unlocks: ["Задания на электронику"], notes: "Можно оставить себе 1 фонарь." },
    "progression": { unlockCondition: "General Goods T1", unlocksNext: "Задания на электронику и коммуникации", progressionValue: 40, nextStep: "Изучить электронику и системы связи." },
    "tags": ["general-goods", "доставка", "фонари", "транспорт"],
    "relatedLoot": ["head-lamp", "топливо", "ремонтный комплект"],
    "relatedSections": ["Транспорт", "Электроника", "Лагеря"],
    "adminNotes": "Маршруты могут меняться в зависимости от активности на сервере.",
    "playerTips": ["Используй мотоцикл для скорости.", "Избегай городов.", "Проверяй топливо перед выездом."],
    "mistakes": ["Без запаса топлива", "Планировать маршрут через опасные зоны", "Игнорировать ремонт."]
  },
  {
    "slug": "quest-turret-defense",
    "title": "Установка турели",
    "trader": "Mechanic",
    "source": "DEENA Manual",
    "tier": 3,
    "category": "Крафт и ремонт",
    "difficulty": "Очень сложно",
    "risk": "Высокий",
    "dataStatus": "Готово",
    "short": "Собрать и установить турель для защиты базы.",
    "description": "Mechanic поручает собрать и установить автоматическую турель для защиты важной точки. Требуются редкие компоненты и инженерные навыки.",
    "requirements": [
      { name: "Инженерия 5", amount: 1, note: "Обязательный навык" },
      { name: "Компоненты турели", amount: 1, note: "Полный набор" },
      { name: "Инструменты", amount: 3, note: "Молоток, отвертка, паяльник" }
    ],
    "objectives": [
      { title: "Собрать турель", description: "Собрать все компоненты в единую конструкцию.", target: "Турель", amount: 1, locationHint: "Мастерская", trackerLabel: "Турель собрана" },
      { title: "Установить базу", description: "Установить турельную базу в указанной точке.", target: "Турельная база", amount: 1, locationHint: "Точка установки", trackerLabel: "База установлена" },
      { title: "Подключить питание", description: "Подключить турель к источнику питания.", target: "Электропитание", amount: 1, locationHint: "Генератор", trackerLabel: "Питание подключено" },
      { title: "Настроить систему", description: "Откалибровать турель и проверить работу.", target: "Настройка", amount: 1, locationHint: "Пульт управления", trackerLabel: "Система настроена" }
    ],
    "recommendedGear": ["Инженерные инструменты", "Компоненты", "Защита", "Запасные части"],
    "bestLocations": ["База", "Мастерская", "Военные склады"],
    "routePlan": ["Собрать компоненты", "Подготовить инструменты", "Установить базу", "Подключить системы", "Протестировать"],
    "reward": { cash: "Очень высокая", fame: "Экспертный", reputation: "Mechanic max progression", unlocks: ["Продвинутая защита базы", "Автоматические системы"], notes: "Доступ к технологиям турелей." },
    "progression": { unlockCondition: "Mechanic T3 + Инженерия 5", unlocksNext: "Полная автоматизация базы", progressionValue: 100, nextStep: "Создать полностью автоматизированную базу защиты." },
    "tags": ["mechanic", "турель", "инженерия", "защита базы"],
    "relatedLoot": ["turret-base", "электромотор", "электроника"],
    "relatedSections": ["Строительство", "Крафт", "Базы"],
    "adminNotes": "Требует настроек сервера для полноценной функциональности.",
    "playerTips": ["Проверь все соединения.", "Тестируй на безопасных расстояниях.", "Держи запасные компоненты."],
    "mistakes": ["Неправильная сборка", "Игнорировать безопасность", "Недостаточная защита."]
  }
];

export function getMissionBySlug(slug: string) {
  return missions.find((mission) => mission.slug === slug);
}
