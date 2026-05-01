import { BookOpen, Car, Crosshair, Home, Map, Package, Shield, Swords, Backpack } from "lucide-react";

export const sections = [
  { title: "Оружие", description: "Билды, патроны, модули, плюсы, минусы и советы по применению.", href: "/weapons", icon: Crosshair, badge: "Weapons" },
  { title: "Бункеры", description: "Поиск, фильтры, риск, маршруты, враги и ценный лут в бункерах.", href: "/bunkers", icon: Shield, badge: "Bunkers v3" },
  { title: "Лут", description: "Фильтры по ценности, редкости, приоритету и местам фарма.", href: "/loot", icon: Package, badge: "Loot v3" },
  { title: "Подготовка", description: "Готовые наборы перед рейдом: оружие, броня, медицина и инструменты.", href: "/preparation", icon: Backpack, badge: "Raid kits" },
  { title: "Карта", description: "Визуальные метки бункеров, фарма, транспорта и мест под базу.", href: "/map", icon: Map, badge: "Map" },
  { title: "Базы", description: "PvE/PvP идеи, хай-тек базы, гаражи и планировка для дуо.", href: "/bases", icon: Home, badge: "Base" },
  { title: "Транспорт", description: "Машины, мотоциклы, вертолеты, ремонт и советы по хранению.", href: "/vehicles", icon: Car, badge: "Vehicles" },
  { title: "Гайды", description: "Старт с нуля, прокачка, заработок и маршруты выживания.", href: "/guides", icon: BookOpen, badge: "Guides" },
  { title: "PRO-план", description: "Что добавить дальше: админка, база данных, аккаунты и интерактивная карта.", href: "/pro-roadmap", icon: Swords, badge: "Roadmap" }
];
