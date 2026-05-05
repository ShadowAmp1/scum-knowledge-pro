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
  { "category": "Сбор предметов", "description": "Найти и сдать предметы с нужным количеством, состоянием или зарядом.", "bestFor": "Фарм денег, подготовка склада и прогресс торговцев." },
  { "category": "Доставка", "description": "Перенести груз или предмет между точками, часто с маршрутом и риском перехвата.", "bestFor": "Игроки с транспортом и безопасными дорогами." },
  { "category": "Зачистка", "description": "Убить puppets, животных или другие цели указанным способом.", "bestFor": "Fame, боевой опыт и прокачка Armorer." },
  { "category": "Охота", "description": "Выследить животное, добыть ресурс или выполнить outdoor objective.", "bestFor": "Тихие PvE-маршруты и выживание." },
  { "category": "Исследование", "description": "Посетить POI, сектор, бункер или специальную точку.", "bestFor": "Разведка карты и быстрые задачи." },
  { "category": "Взаимодействие", "description": "Найти объект и использовать его: ящик, доску, терминал, контейнер или дверь.", "bestFor": "Notice board и специальные POI задачи." },
  { "category": "Крафт и ремонт", "description": "Собрать материалы, создать предмет или отремонтировать экипировку/транспорт.", "bestFor": "Базы, транспорт и подготовка к рейдам." },
  { "category": "Выживание", "description": "Еда, вода, здоровье, бинты и базовые survival-механики.", "bestFor": "Новички и старт после вайпа." },
  { "category": "Обучение", "description": "DEENA/Manual задачи для знакомства с интерфейсом и механиками.", "bestFor": "Новые персонажи." }
];

export const missionTierProgression = [
  { "tier": 1, "title": "Tier 1 — стартовые поручения", "description": "Простые задания на сбор, обучение, первую медицину и зачистку одиночных целей.", "recommendedPower": "Нож, лук/пистолет, малый рюкзак, бинты, еда и вода.", "focus": ["Минимальный риск", "Бытовой лут", "Первые Fame/деньги", "Разведка POI"] },
  { "tier": 2, "title": "Tier 2 — стабильный фарм", "description": "Больше требований, длиннее маршруты, чаще нужны транспорт, инструменты, оружие и безопасный план отхода.", "recommendedPower": "Пистолет/SMG/AK, средняя броня, нормальная медицина, транспорт или тайник.", "focus": ["Транспорт", "Медицина", "Оружейные комнаты", "Маршруты"] },
  { "tier": 3, "title": "Tier 3 — высокий риск", "description": "Опасные POI, редкие предметы, сложные interactions и награды для поздней игры.", "recommendedPower": "Автомат/снайперка, броня, много патронов, advanced медицина, напарник.", "focus": ["Военные зоны", "Бункеры", "Редкий лут", "Endgame"] }
];

export const missions: Mission[] = [
  {
    "slug": "deena-first-steps",
    "title": "DEENA: первые шаги выжившего",
    "trader": "DEENA",
    "source": "DEENA Manual",
    "tier": 1,
    "category": "Обучение",
    "difficulty": "Легко",
    "risk": "Низкий",
    "dataStatus": "Готово",
    "short": "Открыть журнал, собрать первые ресурсы и создать базовый инструмент.",
    "description": "Стартовая обучающая карточка для новых персонажей. Она помогает игроку не потеряться после спавна: открыть журнал, собрать ресурсы, создать простой инструмент и подготовиться к первому POI.",
    "requirements": [],
    "objectives": [
      { "title": "Открой Journal", "description": "Проверь активные задачи и Manual.", "target": "Journal", "amount": 1, "locationHint": "TAB меню", "trackerLabel": "Журнал открыт" },
      { "title": "Собери ресурсы", "description": "Подбери камни, ветки или ткань.", "target": "Базовые ресурсы", "amount": 3, "locationHint": "Лес/дорога/дома", "trackerLabel": "Ресурсы собраны" },
      { "title": "Создай инструмент", "description": "Сделай нож или другой стартовый предмет.", "target": "Крафт", "amount": 1, "locationHint": "Crafting", "trackerLabel": "Инструмент создан" }
    ],
    "recommendedGear": ["Пустые руки", "Любая одежда", "Внимание к метаболизму"],
    "bestLocations": ["Стартовый сектор", "Лес", "Ближайшие дома"],
    "routePlan": ["Осмотри место спавна", "Собери камни/ветки", "Сделай нож", "Проверь здоровье и карту"],
    "reward": { "cash": "—", "fame": "Обучение", "reputation": "Не применяется", "unlocks": ["Базовый крафт", "Journal"], "notes": "Наличие DEENA и награды зависят от версии/сервера." },
    "progression": { "unlockCondition": "Новый персонаж или включённая DEENA", "unlocksNext": "Выживание и первые POI", "progressionValue": 10, "nextStep": "Собрать бинты, воду и стартовый рюкзак." },
    "tags": ["deena", "tutorial", "manual", "новичок"],
    "relatedLoot": ["rag-strips", "knife", "food"],
    "relatedSections": ["Гайды", "Подготовка"],
    "adminNotes": "Можно заменить objective IDs после сверки с сервером.",
    "playerTips": ["Не беги сразу в военную зону.", "Сначала сделай нож и бинты.", "Проверь метаболизм."],
    "mistakes": ["Игнорировать Journal.", "Бежать без бинтов.", "Подбирать тяжёлый мусор в первые минуты."]
  },
  {
    "slug": "general-t1-household-supplies",
    "title": "General Goods T1: бытовые расходники",
    "trader": "General Goods",
    "source": "Trader Book",
    "tier": 1,
    "category": "Сбор предметов",
    "difficulty": "Легко",
    "risk": "Низкий",
    "dataStatus": "Шаблон",
    "short": "Собрать мыло, батарейку, иголку, изоленту или похожие бытовые предметы.",
    "description": "Стартовое поручение торговца на бытовой лут. Лучше выполнять рядом с safe zone в деревнях, домах, магазинах и подсобках.",
    "requirements": [
      { "name": "Мыло / Soap", "amount": 1 },
      { "name": "Battery", "amount": 1, "minUses": "Проверить в задании" },
      { "name": "Needle или Duct Tape", "amount": 1, "note": "Точный список зависит от квеста." }
    ],
    "objectives": [
      { "title": "Принять миссию", "description": "Проверь точный список в книге General Goods.", "target": "Trader Book", "amount": 1, "locationHint": "Safe zone", "trackerLabel": "Миссия принята" },
      { "title": "Собрать предметы", "description": "Лутай дома, магазины, кухни, ванные и подсобки.", "target": "Household supplies", "amount": 3, "locationHint": "Деревни/города", "trackerLabel": "Предметы собраны" },
      { "title": "Сдать торговцу", "description": "Убедись, что состояние и заряд подходят.", "target": "General Goods", "amount": 1, "locationHint": "Safe zone", "trackerLabel": "Сдано торговцу" }
    ],
    "recommendedGear": ["Малый рюкзак", "Нож", "Бинты", "Пистолет/лук по желанию"],
    "bestLocations": ["Деревни", "Жилые дома", "Магазины", "Кухни и ванные"],
    "routePlan": ["Проверь список", "Выбери ближайшую деревню", "Проверяй бытовые контейнеры", "Не бери лишний тяжёлый лут", "Сдай"],
    "reward": { "cash": "Низкая–средняя", "fame": "Низкий", "reputation": "General Goods progression", "unlocks": ["Бытовые T2 поручения"], "notes": "Награды зависят от настроек сервера." },
    "progression": { "unlockCondition": "Доступ к General Goods", "unlocksNext": "Доставки и редкий бытовой лут", "progressionValue": 25, "nextStep": "Завести ящик 'квестовые предметы'." },
    "tags": ["general", "t1", "бытовой лут", "safe zone"],
    "relatedLoot": ["duct-tape", "sewing-kit", "battery"],
    "relatedSections": ["Лут", "Карта"],
    "adminNotes": "Шаблон под разные T1 fetch quests. Точный список можно разнести на отдельные карточки.",
    "playerTips": ["Не выбрасывай батарейки и иголки.", "Храни бытовой лут отдельно.", "Малые деревни безопаснее больших городов."],
    "mistakes": ["Забыть точные требования.", "Сдать предмет с неподходящим uses.", "Забить рюкзак дешёвым мусором."]
  },
  {
    "slug": "armorer-t1-bow-puppets",
    "title": "Armorer T1: зачистка луком",
    "trader": "Armorer",
    "source": "Trader Book",
    "tier": 1,
    "category": "Зачистка",
    "difficulty": "Средне",
    "risk": "Средний",
    "dataStatus": "Шаблон",
    "short": "Убить несколько puppets луком или указанным оружием.",
    "description": "Тихая боевая миссия для прокачки Armorer. Подходит для деревень, ферм и окраин, где можно выманивать puppets по одному.",
    "requirements": [
      { "name": "Bow", "amount": 1 },
      { "name": "Arrows", "amount": 10, "note": "Лучше взять запас." }
    ],
    "objectives": [
      { "title": "Подготовить лук", "description": "Проверь стрелы и состояние оружия.", "target": "Bow", "amount": 1, "locationHint": "База/крафт", "trackerLabel": "Лук готов" },
      { "title": "Убить цели", "description": "Убивай одиночных puppets без лишнего шума.", "target": "Puppets", "amount": 5, "locationHint": "Деревни/фермы", "trackerLabel": "Цели убиты" },
      { "title": "Получить награду", "description": "Вернись к Armorer после выполнения objective.", "target": "Armorer", "amount": 1, "locationHint": "Safe zone", "trackerLabel": "Награда получена" }
    ],
    "recommendedGear": ["Лук", "20+ стрел", "Нож", "Бинты", "Лёгкая броня"],
    "bestLocations": ["Фермы", "Деревни", "Окраины городов", "POI без мехов"],
    "routePlan": ["Выбери тихую деревню", "Выманивай по одной цели", "Подбирай стрелы", "Не стреляй огнестрелом", "Сдай"],
    "reward": { "cash": "Низкая–средняя", "fame": "Средний", "reputation": "Armorer progression", "unlocks": ["Боевые T2 задания"], "notes": "Количество целей зависит от конкретного задания." },
    "progression": { "unlockCondition": "Armorer T1", "unlocksNext": "Kill quests огнестрелом и задания на патроны", "progressionValue": 35, "nextStep": "Собрать патроны/магазины для следующих заданий." },
    "tags": ["armorer", "лук", "puppets", "тихо"],
    "relatedLoot": ["arrows", "emergency-bandage"],
    "relatedSections": ["Оружие", "Подготовка"],
    "adminNotes": "Уточнить точное количество kills на сервере.",
    "playerTips": ["Убей 5 одиночных целей, не толпу.", "Подбирай стрелы.", "Используй заборы и окна."],
    "mistakes": ["Не взять запасные стрелы.", "Стрелять по толпе.", "Бежать без выносливости."]
  },
  {
    "slug": "mechanic-t2-vehicle-repair-kit",
    "title": "Mechanic T2: ремонт транспорта",
    "trader": "Mechanic",
    "source": "Trader Book",
    "tier": 2,
    "category": "Крафт и ремонт",
    "difficulty": "Средне",
    "risk": "Средний",
    "dataStatus": "Шаблон",
    "short": "Найти Vehicle Repair Kit, Tire Repair Kit, батарею, канистру или автоинструменты.",
    "description": "Средний квест механика. Лучше выполнять с машиной или тайником, потому что инструменты и ремкомплекты могут быть тяжёлыми.",
    "requirements": [
      { "name": "Vehicle Repair Kit", "amount": 1, "minUses": "Проверить uses" },
      { "name": "Tire Repair Kit", "amount": 1, "minUses": "Проверить uses" },
      { "name": "Fuel Canister", "amount": 1, "note": "Может требоваться заполненная." }
    ],
    "objectives": [
      { "title": "Подготовить транспорт", "description": "Проверь топливо и место в багажнике.", "target": "Vehicle", "amount": 1, "locationHint": "База/safe zone", "trackerLabel": "Транспорт готов" },
      { "title": "Собрать детали", "description": "Обыскивай гаражи, заправки и промзоны.", "target": "Repair items", "amount": 3, "locationHint": "Гаражи/заправки", "trackerLabel": "Детали собраны" },
      { "title": "Сдать Mechanic", "description": "Проверь состояние и uses перед сдачей.", "target": "Mechanic", "amount": 1, "locationHint": "Safe zone", "trackerLabel": "Сдано" }
    ],
    "recommendedGear": ["Машина/мотоцикл", "Пистолет/SMG", "Бинты", "Запас воды", "Свободное место"],
    "bestLocations": ["Заправки", "Гаражи", "Промышленные зоны", "Склады"],
    "routePlan": ["Выбери 2–3 гаража", "Лутай только авто-контейнеры", "Грузи тяжёлое в транспорт", "Возвращайся безопасной дорогой", "Сдай"],
    "reward": { "cash": "Средняя–высокая", "fame": "Средний", "reputation": "Mechanic progression", "unlocks": ["T3 vehicle quests"], "notes": "Не сдавай последний ремкомплект, если машина далеко от базы." },
    "progression": { "unlockCondition": "После Mechanic T1", "unlocksNext": "Редкие детали и доставки", "progressionValue": 55, "nextStep": "Создать гаражный склад на базе." },
    "tags": ["mechanic", "vehicle", "repair", "t2"],
    "relatedLoot": ["vehicle-repair-kit", "tire-repair-kit", "fuel-canister"],
    "relatedSections": ["Транспорт", "Лут", "Карта"],
    "adminNotes": "Добавить точные варианты по предметам после сверки.",
    "playerTips": ["Один ремкомплект держи в машине.", "Гаражный маршрут лучше делать днём.", "Следи за весом toolbox."],
    "mistakes": ["Сдать последний repair kit.", "Путать tire и vehicle repair kit.", "Ехать без топлива."]
  },
  {
    "slug": "medic-t2-antibiotics-run",
    "title": "Medic T2: антибиотики и редкая медицина",
    "trader": "Medic",
    "source": "Trader Book",
    "tier": 2,
    "category": "Сбор предметов",
    "difficulty": "Средне",
    "risk": "Средний",
    "dataStatus": "Шаблон",
    "short": "Собрать antibiotics, painkillers, vitamins или другой редкий medical item.",
    "description": "Медицинская миссия среднего уровня. Требует маршрута по больницам, аптекам, клиникам или медкомнатам и аккуратной проверки uses.",
    "requirements": [
      { "name": "Antibiotics", "amount": 1, "minUses": "Проверить количество" },
      { "name": "Advanced medical item", "amount": 1, "note": "Зависит от миссии." }
    ],
    "objectives": [
      { "title": "Сверить список", "description": "Проверь точные названия и uses.", "target": "Medic book", "amount": 1, "locationHint": "Safe zone", "trackerLabel": "Список проверен" },
      { "title": "Найти медицину", "description": "Лутай больницы, клиники и аптеки.", "target": "Rare medicine", "amount": 2, "locationHint": "Medical POI", "trackerLabel": "Медицина найдена" },
      { "title": "Сдать врачу", "description": "Не используй нужные предметы перед сдачей.", "target": "Medic", "amount": 1, "locationHint": "Safe zone", "trackerLabel": "Сдано" }
    ],
    "recommendedGear": ["Пистолет/SMG", "Бинты", "Painkillers", "Средний рюкзак"],
    "bestLocations": ["Больницы", "Клиники", "Аптеки", "Медицинские палатки", "Аирдропы"],
    "routePlan": ["Проверь список", "Иди в клинику/больницу", "Лутай только медконтейнеры", "Не трать quest item", "Сдай"],
    "reward": { "cash": "Средняя–высокая", "fame": "Средний", "reputation": "Medic progression", "unlocks": ["T3 medical quests"], "notes": "Последнюю редкую медицину иногда лучше оставить себе." },
    "progression": { "unlockCondition": "После Medic T1", "unlocksNext": "Опасные medical routes и T3", "progressionValue": 55, "nextStep": "Вести medical storage на базе." },
    "tags": ["medic", "antibiotics", "t2", "редкий лут"],
    "relatedLoot": ["antibiotics", "vitamins", "painkillers"],
    "relatedSections": ["Лут", "Карта"],
    "adminNotes": "Уточнить exact item names и uses.",
    "playerTips": ["Не сдавай последние антибиотики без причины.", "Больница шумная — держи выход.", "В дуо один прикрывает, второй лутает."],
    "mistakes": ["Использовать нужные таблетки.", "Забыть про uses.", "Лутать больницу без плана отхода."]
  },
  {
    "slug": "notice-board-t2-interact-poi",
    "title": "Notice Board T2: взаимодействие в POI",
    "trader": "Notice Board",
    "source": "Notice Board",
    "tier": 2,
    "category": "Взаимодействие",
    "difficulty": "Средне",
    "risk": "Высокий",
    "dataStatus": "Требует проверки",
    "short": "Найти объект в POI и взаимодействовать с ним: ящик, терминал, контейнер или дверь.",
    "description": "Interact missions требуют найти конкретный объект, а не просто прийти в зону. Главный риск — долго находиться внутри POI и привлечь игроков или puppets.",
    "requirements": [
      { "name": "Оружие по риску POI", "amount": 1 },
      { "name": "Бинты/медицина", "amount": 3 },
      { "name": "Отмычки", "amount": 3, "note": "Если объект за закрытой дверью." }
    ],
    "objectives": [
      { "title": "Принять с доски", "description": "Запомни текст и ориентиры задания.", "target": "Notice Board", "amount": 1, "locationHint": "POI", "trackerLabel": "Задание принято" },
      { "title": "Найти объект", "description": "Ищи по подсказке: комната, склад, контейнер, терминал.", "target": "Interact object", "amount": 1, "locationHint": "Внутри POI", "trackerLabel": "Объект найден" },
      { "title": "Взаимодействовать", "description": "Используй объект и дождись засчитывания objective.", "target": "Interaction", "amount": 1, "locationHint": "Quest object", "trackerLabel": "Interaction выполнен" }
    ],
    "recommendedGear": ["SMG/автомат", "Броня", "Медицина", "Отмычки", "Фонарик/NVG"],
    "bestLocations": ["Промзоны", "Военные POI", "Бункеры", "Большие здания"],
    "routePlan": ["Прочитай подсказку", "Зачисти вход", "Найди объект", "Выполни interaction", "Уходи"],
    "reward": { "cash": "Средняя–высокая", "fame": "Средний–высокий", "reputation": "Зависит от миссии", "unlocks": ["Сложные POI chains"], "notes": "Interact objectives могут меняться от версии и сервера." },
    "progression": { "unlockCondition": "Notice Board T2", "unlocksNext": "T3 POI/бункер objectives", "progressionValue": 60, "nextStep": "Добавить точные точки объектов на карту." },
    "tags": ["interact", "poi", "notice board", "t2"],
    "relatedLoot": ["lockpick", "screwdriver", "emergency-bandage"],
    "relatedSections": ["Карта", "Бункеры"],
    "adminNotes": "Добавить координаты и скриншоты после ручной проверки.",
    "playerTips": ["Скринь текст задания.", "Не задерживайся после выполнения.", "В дуо один прикрывает коридор."],
    "mistakes": ["Не взять отмычки.", "Бегать по POI без плана.", "Не дождаться засчитывания." ]
  },
  {
    "slug": "phone-t1-remote-errand",
    "title": "Mobile Phone T1: удалённое поручение",
    "trader": "Mobile Phone",
    "source": "Mobile Phone",
    "tier": 1,
    "category": "Исследование",
    "difficulty": "Легко",
    "risk": "Низкий",
    "dataStatus": "Шаблон",
    "short": "Принять задание через телефон с батарейкой и выполнить простую цель по маршруту.",
    "description": "Телефон позволяет брать квесты без возвращения к торговцу. Это удобно в дальнем рейде, если есть батарейка и свободное место.",
    "requirements": [
      { "name": "Mobile Phone", "amount": 1 },
      { "name": "Battery", "amount": 1, "minUses": "Достаточный заряд" }
    ],
    "objectives": [
      { "title": "Включить телефон", "description": "Установи батарею и проверь список задач.", "target": "Phone", "amount": 1, "locationHint": "Инвентарь", "trackerLabel": "Телефон включён" },
      { "title": "Выбрать задачу", "description": "Не бери objective, который ведёт в опасную сторону.", "target": "Quest", "amount": 1, "locationHint": "Phone UI", "trackerLabel": "Квест выбран" },
      { "title": "Выполнить objective", "description": "Закрой простую цель: точку, предмет или зачистку.", "target": "Objective", "amount": 1, "locationHint": "По условию", "trackerLabel": "Objective выполнен" }
    ],
    "recommendedGear": ["Телефон", "Батарейка", "Бинты", "Свободное место", "Оружие по риску"],
    "bestLocations": ["Дальний маршрут", "Дороги между POI", "Окрестности safe zone"],
    "routePlan": ["Проверь заряд", "Открой телефон", "Выбери ближайшую задачу", "Выполни", "Сохрани телефон"],
    "reward": { "cash": "Зависит от задачи", "fame": "Зависит от задачи", "reputation": "Зависит от источника", "unlocks": ["Гибкий квестинг в рейде"], "notes": "Телефонные задания обновляются по cooldown сервера." },
    "progression": { "unlockCondition": "Найден телефон и батарея", "unlocksNext": "Квесты без возврата к трейдеру", "progressionValue": 25, "nextStep": "Держать spare battery в машине/на базе." },
    "tags": ["phone", "battery", "remote quest", "t1"],
    "relatedLoot": ["battery", "mobile-phone"],
    "relatedSections": ["Лут", "Гайды"],
    "adminNotes": "Можно добавить настройку cooldown сервера.",
    "playerTips": ["Телефон полезен вдали от safe zone.", "Сначала оцени путь.", "Не выкидывай батарейки."],
    "mistakes": ["Взять high-risk задание без снаряжения.", "Забыть заряд.", "Выкинуть телефон как мусор."]
  },
  {
    "slug": "hunting-t1-meat-supplies",
    "title": "Охота T1: мясо и шкура",
    "trader": "Notice Board",
    "source": "Notice Board",
    "tier": 1,
    "category": "Охота",
    "difficulty": "Средне",
    "risk": "Средний",
    "dataStatus": "Шаблон",
    "short": "Выследить животное, добыть мясо/шкуру и закрыть outdoor objective.",
    "description": "Охотничья карточка для тихих маршрутов вне городов. Подходит для PvE и для игроков, которым нужен Fame без захода в военные зоны.",
    "requirements": [
      { "name": "Лук/ружьё/винтовка", "amount": 1 },
      { "name": "Нож", "amount": 1 },
      { "name": "Свободное место", "amount": 1 }
    ],
    "objectives": [
      { "title": "Принять охоту", "description": "Проверь тип животного или ресурс.", "target": "Notice Board", "amount": 1, "locationHint": "Доска/телефон", "trackerLabel": "Охота принята" },
      { "title": "Найти цель", "description": "Двигайся тихо и слушай звуки животных.", "target": "Animal", "amount": 1, "locationHint": "Леса/поля", "trackerLabel": "Цель найдена" },
      { "title": "Добыть ресурс", "description": "Разделай тушу и сохрани нужный предмет.", "target": "Meat/skin", "amount": 1, "locationHint": "Место охоты", "trackerLabel": "Ресурс добыт" }
    ],
    "recommendedGear": ["Лук/ружьё", "Нож", "Бинты", "Рюкзак", "Вода"],
    "bestLocations": ["Леса", "Поля", "Окраины деревень", "Горные районы"],
    "routePlan": ["Прими задачу", "Иди по лесной кромке", "Не стреляй без уверенности", "Разделай цель", "Вернись"],
    "reward": { "cash": "Низкая–средняя", "fame": "Средний", "reputation": "Зависит от задания", "unlocks": ["Outdoor missions"], "notes": "Спавн животных зависит от сервера." },
    "progression": { "unlockCondition": "Notice Board/Phone pool", "unlocksNext": "Сложные outdoor objectives", "progressionValue": 30, "nextStep": "Добавить охотничьи зоны на карту." },
    "tags": ["охота", "animals", "outdoor", "pve"],
    "relatedLoot": ["meat", "animal-skin"],
    "relatedSections": ["Карта", "Гайды"],
    "adminNotes": "Добавить отдельные карточки по животным после тестов.",
    "playerTips": ["Слушай звуки, а не только смотри карту.", "Нож обязателен для разделки.", "Не перегружайся мясом."],
    "mistakes": ["Убить животное и забыть нож.", "Стрелять издалека без попадания.", "Идти на охоту без воды."]
  },
  {
    "slug": "armorer-t3-military-cache",
    "title": "Armorer T3: военный тайник",
    "trader": "Armorer",
    "source": "Trader Book",
    "tier": 3,
    "category": "Исследование",
    "difficulty": "Очень сложно",
    "risk": "Экстремальный",
    "dataStatus": "Шаблон",
    "short": "Сходить в военную зону/бункер, найти оружейный предмет или тайник и вернуться живым.",
    "description": "Endgame-квест для оружейника. Требует полноценного рейд-набора, маршрута входа/выхода и дисциплины: цель — выполнить objective, а не вынести весь POI.",
    "requirements": [
      { "name": "Автомат/снайперка", "amount": 1 },
      { "name": "Боеприпасы", "amount": 60 },
      { "name": "Медицина", "amount": 4 },
      { "name": "Lockpicks/Screwdriver", "amount": 5, "note": "Если цель за дверью." }
    ],
    "objectives": [
      { "title": "Подготовить рейд", "description": "Проверь броню, ammo, медицину и путь отхода.", "target": "Raid kit", "amount": 1, "locationHint": "База", "trackerLabel": "Рейд-набор готов" },
      { "title": "Зайти в военную зону", "description": "Двигайся по краю и избегай лишнего шума.", "target": "Military POI", "amount": 1, "locationHint": "Военные зоны/бункеры", "trackerLabel": "Зона достигнута" },
      { "title": "Найти тайник", "description": "Забери квестовый предмет и не жадничай.", "target": "Military cache", "amount": 1, "locationHint": "Оружейные комнаты", "trackerLabel": "Предмет найден" },
      { "title": "Вернуться", "description": "Сдай миссию сразу после выхода.", "target": "Armorer", "amount": 1, "locationHint": "Safe zone", "trackerLabel": "Миссия сдана" }
    ],
    "recommendedGear": ["AK/M4/СВД", "Броня", "Шлем", "Advanced медицина", "Отмычки", "Ремкомплект оружия", "Транспорт"],
    "bestLocations": ["Военные базы", "Обычные бункеры", "Abandoned bunkers", "Аирдропы"],
    "routePlan": ["Подготовь kit", "Разведай вход", "Зачищай минимум целей", "Забери objective", "Уходи альтернативным маршрутом", "Сдай"],
    "reward": { "cash": "Высокая", "fame": "Высокий", "reputation": "Большой Armorer progression", "unlocks": ["Топовые оружейные предложения"], "notes": "На PvP серверах риск может быть выше ценности награды." },
    "progression": { "unlockCondition": "Armorer T3", "unlocksNext": "Endgame оружейный фарм", "progressionValue": 90, "nextStep": "Записать безопасный маршрут на карте сайта." },
    "tags": ["armorer", "t3", "military", "bunker", "high risk"],
    "relatedLoot": ["weapon-cleaning-kit", "ammo-762", "lockpick"],
    "relatedSections": ["Оружие", "Бункеры", "Карта", "Подготовка"],
    "adminNotes": "Добавить привязку к конкретным бункерам и риск-маркерам карты.",
    "playerTips": ["Не превращай квест в полный рейд.", "В дуо назначь носителя objective.", "После T3 не едь по популярным дорогам."],
    "mistakes": ["Жадничать после нахождения цели.", "Не взять weapon repair kit.", "Не иметь запасного выхода."]
  }
];

export function getMissionBySlug(slug: string) { return missions.find((mission) => mission.slug === slug); }
export function getMissionsByTier(tier: MissionTier) { return missions.filter((mission) => mission.tier === tier); }
export function getMissionProgressPercent(mission: Mission) { return Math.max(0, Math.min(100, mission.progression.progressionValue)); }
