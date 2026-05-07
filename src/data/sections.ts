import { Backpack, BookOpen, Car, Crosshair, Home, Map, Package, Scale, Search, Settings, Shield, Swords } from "lucide-react";

export const sections = [
  { title: "Поиск", description: "Глобальный поиск по оружию, обвесам, луту, бункерам, карте и гайдам.", href: "/search", icon: Search, badge: "Search" },
  { title: "Оружие", description: "Билды, патроны, модули, плюсы, минусы и советы по применению.", href: "/weapons", icon: Crosshair, badge: "Weapons" },
  { title: "Сравнение", description: "Сравнение 2–3 видов оружия по рейтингу, роли, патронам и обвесам.", href: "/weapons/compare", icon: Scale, badge: "Compare" },
  { title: "Бункеры", description: "Поиск, фильтры, риск, маршруты, враги и ценный лут в бункерах.", href: "/bunkers", icon: Shield, badge: "Bunkers v3" },
  { title: "Лут", description: "Фильтры по ценности, редкости, приоритету и местам фарма.", href: "/loot", icon: Package, badge: "Loot v3" },
  { title: "Подготовка", description: "Готовые наборы перед рейдом: оружие, броня, медицина и инструменты.", href: "/preparation", icon: Backpack, badge: "Raid kits" },
  { title: "Карта", description: "Интерактивные метки, поиск, фильтры, риск, tier лута и маршруты.", href: "/map", icon: Map, badge: "Map v4" },
  { title: "Базы", description: "PvE/PvP идеи, хай-тек базы, гаражи и планировка для дуо.", href: "/bases", icon: Home, badge: "Base" },
  { title: "Транспорт", description: "Машины, мотоциклы, вертолеты, ремонт и советы по хранению.", href: "/vehicles", icon: Car, badge: "Vehicles" },
  { title: "Гайды", description: "Старт с нуля, прокачка, заработок и маршруты выживания.", href: "/guides", icon: BookOpen, badge: "Guides" },
  { title: "Admin Lite", description: "Черновики новых карточек оружия, лута, карты и гайдов без базы данных.", href: "/admin", icon: Settings, badge: "Admin" },
  { title: "PRO-план", description: "Что добавить дальше: админка, база данных, аккаунты и интерактивная карта.", href: "/pro-roadmap", icon: Swords, badge: "Roadmap" }
];
