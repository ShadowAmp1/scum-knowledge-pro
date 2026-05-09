export type CraftingCategory = 
  | "Оружие"
  | "Броня"
  | "Инструменты"
  | "Медицина"
  | "Еда"
  | "Строительство"
  | "Электроника"
  | "Обвесы";

export type CraftingRarity = "Обычный" | "Редкий" | "Очень редкий" | "Легендарный";

export type CraftingDifficulty = "Легко" | "Средне" | "Сложно" | "Очень сложно";

export type CraftingRecipe = {
  slug: string;
  name: string;
  category: CraftingCategory;
  rarity: CraftingRarity;
  difficulty: CraftingDifficulty;
  skillRequired: string;
  description: string;
  result: {
    name: string;
    quantity: number;
    description: string;
  };
  materials: {
    name: string;
    quantity: number;
    rarity: "Обычный" | "Редкий" | "Очень редкий";
  }[];
  tools: string[];
  location: string[];
  tips: string[];
  alternatives: string[];
  serverNote?: string;
};

export const craftingCategories: CraftingCategory[] = [
  "Оружие",
  "Броня", 
  "Инструменты",
  "Медицина",
  "Еда",
  "Строительство",
  "Электроника",
  "Обвесы"
];

export const craftingRecipes: CraftingRecipe[] = [
  {
    "slug": "makeshift-silencer",
    "name": "Импровизированный глушитель",
    "category": "Обвесы",
    "rarity": "Обычный",
    "difficulty": "Легко",
    "skillRequired": "Инженерия 1",
    "description": "Простой глушитель из подручных материалов для снижения шума выстрела.",
    "result": {
      "name": "Импровизированный глушитель",
      "quantity": 1,
      "description": "Базовый глушитель с низкой эффективностью"
    },
    "materials": [
      {
        "name": "Пластиковая бутылка",
        "quantity": 1,
        "rarity": "Обычный"
      },
      {
        "name": "Тряпка",
        "quantity": 2,
        "rarity": "Обычный"
      },
      {
        "name": "Изолента",
        "quantity": 1,
        "rarity": "Обычный"
      }
    ],
    "tools": [
      "Нож",
      "Изолента"
    ],
    "location": [
      "Любое место",
      "База"
    ],
    "tips": [
      "Быстро изнашивается - используй для экстренных ситуаций.",
      "Неэффективен для мощных патронов.",
      "Можно улучшить до более качественного глушителя."
    ],
    "alternatives": [
      "Бутылка из-под газировки",
      "Клейкая лента"
    ],
    "serverNote": "Требования к навыкам и эффективность могут отличаться на разных серверах."
  },
  {
    "slug": "makeshift-bandage",
    "name": "Импровизированная повязка",
    "category": "Медицина",
    "rarity": "Обычный",
    "difficulty": "Легко",
    "skillRequired": "Медицина 1",
    "description": "Базовая повязка для остановки кровотечения из подручных материалов.",
    "result": {
      "name": "Импровизированная повязка",
      "quantity": 2,
      "description": "Простая повязка для лечения легких ран"
    },
    "materials": [
      {
        "name": "Тряпка",
        "quantity": 2,
        "rarity": "Обычный"
      },
      {
        "name": "Палочки",
        "quantity": 1,
        "rarity": "Обычный"
      }
    ],
    "tools": [
      "Нож"
    ],
    "location": [
      "Любое место",
      "База"
    ],
    "tips": [
      "Менее эффективно чем аптечка.",
      "Используй только в экстренных ситуациях.",
      "Можно сделать в полевых условиях."
    ],
    "alternatives": [
      "Бинты",
      "Чистая ткань"
    ],
    "serverNote": "Эффективность лечения может зависеть от настроек сервера."
  },
  {
    "slug": "stone-knife",
    "name": "Каменный нож",
    "category": "Инструменты",
    "rarity": "Обычный",
    "difficulty": "Легко",
    "skillRequired": "Без навыка",
    "description": "Простейший нож из острого камня для базовых нужд.",
    "result": {
      "name": "Каменный нож",
      "quantity": 1,
      "description": "Примитивный режущий инструмент"
    },
    "materials": [
      {
        "name": "Острый камень",
        "quantity": 1,
        "rarity": "Обычный"
      },
      {
        "name": "Палка",
        "quantity": 1,
        "rarity": "Обычный"
      },
      {
        "name": "Трава или волокна",
        "quantity": 2,
        "rarity": "Обычный"
      }
    ],
    "tools": [],
    "location": [
      "Любое место",
      "Лес",
      "Пляж"
    ],
    "tips": [
      "Быстро ломается.",
      "Подходит для резания простых материалов.",
      "Можно использовать как оружие в крайнем случае."
    ],
    "alternatives": [
      "Кремень",
      "Обломок металла"
    ],
    "serverNote": "Прочность может отличаться в зависимости от типа камня."
  },
  {
    "slug": "makeshift-armor",
    "name": "Импровизированная броня",
    "category": "Броня",
    "rarity": "Редкий",
    "difficulty": "Средне",
    "skillRequired": "Инженерия 2",
    "description": "Базовая защита из подручных материалов для увеличения выживаемости.",
    "result": {
      "name": "Импровизированная броня",
      "quantity": 1,
      "description": "Легкая броня с минимальной защитой"
    },
    "materials": [
      {
        "name": "Металлические пластины",
        "quantity": 3,
        "rarity": "Редкий"
      },
      {
        "name": "Кожа",
        "quantity": 2,
        "rarity": "Обычный"
      },
      {
        "name": "Проволока",
        "quantity": 1,
        "rarity": "Обычный"
      }
    ],
    "tools": [
      "Молоток",
      "Кусачки",
      "Изолента"
    ],
    "location": [
      "База",
      "Мастерская"
    ],
    "tips": [
      "Тяжелая и ограничивает движение.",
      "Защищает только от легких повреждений.",
      "Можно улучшить добавлением更多 материалов."
    ],
    "alternatives": [
      "Пластиковые пластины",
      "Картон"
    ],
    "serverNote": "Уровень защиты зависит от качества материалов."
  },
  {
    "slug": "makeshift-backpack",
    "name": "Импровизированный рюкзак",
    "category": "Строительство",
    "rarity": "Обычный",
    "difficulty": "Средне",
    "skillRequired": "Без навыка",
    "description": "Простой рюкзак для увеличения переносимого веса.",
    "result": {
      "name": "Импровизированный рюкзак",
      "quantity": 1,
      "description": "Маленький рюкзак на 10 слотов"
    },
    "materials": [
      {
        "name": "Ткань",
        "quantity": 4,
        "rarity": "Обычный"
      },
      {
        "name": "Верёвка",
        "quantity": 2,
        "rarity": "Обычный"
      },
      {
        "name": "Изолента",
        "quantity": 1,
        "rarity": "Обычный"
      }
    ],
    "tools": [
      "Нож",
      "Изолента"
    ],
    "location": [
      "Любое место",
      "База"
    ],
    "tips": [
      "Малая вместительность.",
      "Быстро изнашивается.",
      "Лучше чем ничего для начала игры."
    ],
    "alternatives": [
      "Мешковина",
      "Кожа"
    ],
    "serverNote": "Вместительность может отличаться на разных серверах."
  },
  {
    "slug": "improved-water-filter",
    "name": "Улучшенный фильтр воды",
    "category": "Медицина",
    "rarity": "Редкий",
    "difficulty": "Средне",
    "skillRequired": "Инженерия 3",
    "description": "Эффективный фильтр для очистки воды от опасных загрязнителей.",
    "result": {
      "name": "Улучшенный фильтр воды",
      "quantity": 1,
      "description": "Многоразовый фильтр для очистки воды"
    },
    "materials": [
      {
        "name": "Уголь",
        "quantity": 5,
        "rarity": "Обычный"
      },
      {
        "name": "Песок",
        "quantity": 3,
        "rarity": "Обычный"
      },
      {
        "name": "Пластиковая бутылка",
        "quantity": 2,
        "rarity": "Обычный"
      },
      {
        "name": "Ткань",
        "quantity": 2,
        "rarity": "Обычный"
      }
    ],
    "tools": [
      "Нож",
      "Изолента"
    ],
    "location": [
      "База",
      "Река"
    ],
    "tips": [
      "Многоразовый - можно использовать несколько раз.",
      "Эффективен против большинства загрязнителей.",
      "Требует регулярной очистки."
    ],
    "alternatives": [
      "Бумага",
      "Вата"
    ],
    "serverNote": "Количество использований зависит от качества материалов."
  },
  {
    "slug": "turret-base",
    "name": "Турельная база",
    "category": "Строительство",
    "rarity": "Очень редкий",
    "difficulty": "Очень сложно",
    "skillRequired": "Инженерия 5",
    "description": "Основа для автоматической турели защиты базы.",
    "result": {
      "name": "Турельная база",
      "quantity": 1,
      "description": "Монтажная платформа для турели"
    },
    "materials": [
      {
        "name": "Металлические балки",
        "quantity": 5,
        "rarity": "Очень редкий"
      },
      {
        "name": "Электромотор",
        "quantity": 1,
        "rarity": "Очень редкий"
      },
      {
        "name": "Электроника",
        "quantity": 3,
        "rarity": "Редкий"
      },
      {
        "name": "Провода",
        "quantity": 10,
        "rarity": "Обычный"
      }
    ],
    "tools": [
      "Молоток",
      "Кусачки",
      "Отвертка",
      "Паяльник"
    ],
    "location": [
      "База",
      "Мастерская"
    ],
    "tips": [
      "Требует электропитания.",
      "Можно установить только на укрепленной базе.",
      "Нужна регулярная проверка и обслуживание."
    ],
    "alternatives": [
      "Альтернативные моторы",
      "Разные типы электронных компонентов"
    ],
    "serverNote": "Функциональность может зависеть от настроек сервера и правил базы."
  }
];

export function getCraftingRecipeBySlug(slug: string) {
  return craftingRecipes.find((recipe) => recipe.slug === slug);
}

export function getCraftingRecipesByCategory(category: CraftingCategory) {
  return craftingRecipes.filter((recipe) => recipe.category === category);
}

export function getCraftingRecipesByDifficulty(difficulty: CraftingDifficulty) {
  return craftingRecipes.filter((recipe) => recipe.difficulty === difficulty);
}
