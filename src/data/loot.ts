export type LootItem = {
  name: string;
  category: string;
  rarity: "Обычный" | "Ценный" | "Редкий" | "Очень редкий";
  value: string;
  locations: string[];
  keepOrSell: string;
};

export const lootItems: LootItem[] = [
  { name: "Оружейный ремкомплект", category: "Ремонт", rarity: "Редкий", value: "Высокая", locations: ["Бункеры", "Военные зоны", "Аирдропы"], keepOrSell: "Лучше хранить для дорогого оружия." },
  { name: "Автомобильный ремкомплект", category: "Транспорт", rarity: "Ценный", value: "Высокая", locations: ["Гаражи", "Мастерские", "Заправки", "Промзоны"], keepOrSell: "Хранить, если есть машина." },
  { name: "Болты", category: "Крафт", rarity: "Ценный", value: "Средняя", locations: ["Гаражи", "Склады", "Промзоны"], keepOrSell: "Хранить для строительства и ремонта." },
  { name: "Изолента", category: "Крафт", rarity: "Ценный", value: "Средняя", locations: ["Дома", "Гаражи", "Мастерские"], keepOrSell: "Хранить, часто нужна." },
  { name: "NVG", category: "Экипировка", rarity: "Очень редкий", value: "Очень высокая", locations: ["Бункеры", "Аирдропы", "Военные зоны"], keepOrSell: "Хранить, если ходишь ночью." },
  { name: "Медицинские бинты", category: "Медицина", rarity: "Обычный", value: "Средняя", locations: ["Больницы", "Дома", "Аптеки"], keepOrSell: "Всегда носить с собой." }
];
