"use client";

import { useState, useMemo } from "react";
import { weapons } from "@/data/weapons";
import { attachments } from "@/data/attachments";
import { missions } from "@/data/missions";
import { lootItems } from "@/data/loot";
import { craftingRecipes } from "@/data/crafting";
import { Search, Filter, Target, Wrench, Package, Star } from "lucide-react";
import Link from "next/link";

export default function GlobalSearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "weapons" | "attachments" | "missions" | "loot" | "crafting">("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");

  // Получаем все данные для поиска
  const allData = useMemo(() => {
    const data = [];
    
    // Оружие
    weapons.forEach(weapon => {
      data.push({
        type: "weapon",
        title: weapon.name,
        description: weapon.shortRole,
        category: weapon.category,
        subcategory: weapon.type,
        slug: weapon.slug,
        tier: weapon.tier,
        tags: [weapon.category, weapon.type, weapon.ammo, weapon.mode]
      });
    });

    // Обвесы
    attachments.forEach(attachment => {
      data.push({
        type: "attachment",
        title: attachment.name,
        description: attachment.summary,
        category: attachment.category,
        subcategory: attachment.subcategory || "",
        slug: attachment.slug,
        tier: attachment.rarity,
        tags: [attachment.category, ...(attachment.compatibleWeapons || [])]
      });
    });

    // Миссии
    missions.forEach(mission => {
      data.push({
        type: "mission",
        title: mission.title,
        description: mission.short,
        category: mission.category,
        subcategory: mission.difficulty,
        slug: mission.slug,
        tier: mission.tier.toString(),
        tags: [mission.category, mission.difficulty, mission.trader]
      });
    });

    // Лут
    lootItems.forEach(item => {
      data.push({
        type: "loot",
        title: item.name,
        description: item.usage,
        category: item.category,
        subcategory: "",
        slug: item.slug,
        tier: item.rarity,
        tags: [item.category, item.rarity, item.priority]
      });
    });

    // Крафт
    craftingRecipes.forEach(recipe => {
      data.push({
        type: "crafting",
        title: recipe.name,
        description: recipe.description,
        category: recipe.category,
        subcategory: recipe.difficulty,
        slug: recipe.slug,
        tier: recipe.rarity,
        tags: [recipe.category, recipe.difficulty, recipe.skillRequired]
      });
    });

    return data;
  }, []);

  // Фильтрация данных
  const filteredData = useMemo(() => {
    if (!query.trim()) return [];

    const searchQuery = query.toLowerCase();
    
    return allData.filter(item => {
      // Фильтр по категории
      if (selectedCategory !== "all" && item.type !== selectedCategory) return false;
      
      // Фильтр по подкатегории
      if (selectedSubcategory !== "all" && item.subcategory !== selectedSubcategory) return false;
      
      // Поиск по тексту
      const searchText = [
        item.title,
        item.description,
        item.category,
        item.subcategory,
        ...item.tags
      ].join(" ").toLowerCase();
      
      return searchText.includes(searchQuery);
    });
  }, [query, selectedCategory, selectedSubcategory, allData]);

  // Получаем уникальные категории и подкатегории
  const categories = useMemo(() => {
    const cats = new Set(allData.map(item => item.type));
    return Array.from(cats);
  }, [allData]);

  const subcategories = useMemo(() => {
    if (selectedCategory === "all") return [];
    const cats = new Set(
      allData
        .filter(item => item.type === selectedCategory)
        .map(item => item.subcategory)
        .filter(sub => sub !== "")
    );
    return Array.from(cats);
  }, [allData, selectedCategory]);

  // Получаем иконку для типа
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "weapon": return <Target className="h-5 w-5" />;
      case "attachment": return <Wrench className="h-5 w-5" />;
      case "mission": return <Star className="h-5 w-5" />;
      case "loot": return <Package className="h-5 w-5" />;
      case "crafting": return <Filter className="h-5 w-5" />;
      default: return <Search className="h-5 w-5" />;
    }
  };

  // Получаем цвет для типа
  const getTypeColor = (type: string) => {
    switch (type) {
      case "weapon": return "text-red-400 border-red-500/30";
      case "attachment": return "text-blue-400 border-blue-500/30";
      case "mission": return "text-green-400 border-green-500/30";
      case "loot": return "text-yellow-400 border-yellow-500/30";
      case "crafting": return "text-purple-400 border-purple-500/30";
      default: return "text-zinc-400 border-zinc-500/30";
    }
  };

  // Получаем ссылку для элемента
  const getItemLink = (item: any) => {
    switch (item.type) {
      case "weapon": return `/weapons/${item.slug}`;
      case "attachment": return `/weapons/attachments/${item.slug}`;
      case "mission": return `/missions/${item.slug}`;
      case "loot": return `/loot/${item.slug}`;
      case "crafting": return `/crafting#${item.slug}`;
      default: return "/";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-black text-white">
            <Search className="mr-3 inline-block h-10 w-10 text-red-500" />
            Глобальный поиск
          </h1>
          <p className="text-lg text-zinc-400">
            Поиск по всему контенту: оружию, обвесам, миссиям, луту и крафту
          </p>
        </div>

        {/* Панель поиска и фильтров */}
        <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300">Поиск</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Введите название или описание..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300">Категория</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value as any);
                  setSelectedSubcategory("all");
                }}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
              >
                <option value="all">Все категории</option>
                <option value="weapons">Оружие</option>
                <option value="attachments">Обвесы</option>
                <option value="missions">Миссии</option>
                <option value="loot">Лут</option>
                <option value="crafting">Крафт</option>
              </select>
            </div>

            {selectedCategory !== "all" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">Подкатегория</label>
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
                >
                  <option value="all">Все подкатегории</option>
                  {subcategories.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-end">
              <div className="text-sm text-zinc-400">
                Найдено: {filteredData.length} элементов
              </div>
            </div>
          </div>
        </div>

        {/* Результаты поиска */}
        <div className="space-y-4">
          {filteredData.map((item, index) => (
            <Link
              key={`${item.type}-${item.slug}-${index}`}
              href={getItemLink(item)}
              className="block rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/80"
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-lg border p-2 ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-sm text-zinc-400">{item.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 text-right">
                      <span className="rounded-lg bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300">
                        {item.category}
                      </span>
                      {item.subcategory && (
                        <span className="rounded-lg bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300">
                          {item.subcategory}
                        </span>
                      )}
                      <span className={`rounded-lg px-2 py-1 text-xs font-medium ${
                        item.tier === "S" || item.tier === "Очень редкий" ? "bg-red-500/20 text-red-300" :
                        item.tier === "A" || item.tier === "Редкий" ? "bg-blue-500/20 text-blue-300" :
                        item.tier === "B" || item.tier === "Обычный" ? "bg-green-500/20 text-green-300" :
                        "bg-yellow-500/20 text-yellow-300"
                      }`}>
                        {item.tier}
                      </span>
                    </div>
                  </div>
                  
                  {/* Теги */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.tags.slice(0, 5).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {query && filteredData.length === 0 && (
          <div className="py-12 text-center">
            <Search className="mx-auto mb-4 h-16 w-16 text-zinc-600" />
            <p className="text-zinc-400">
              Ничего не найдено по запросу "{query}"
            </p>
            <p className="text-sm text-zinc-500 mt-2">
              Попробуйте изменить запрос или фильтры
            </p>
          </div>
        )}

        {!query && (
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="mb-4 text-lg font-bold text-white">Статистика базы данных</h3>
            <div className="grid gap-4 md:grid-cols-5">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{weapons.length}</div>
                <div className="text-sm text-zinc-400">Оружие</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{attachments.length}</div>
                <div className="text-sm text-zinc-400">Обвесы</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{missions.length}</div>
                <div className="text-sm text-zinc-400">Миссии</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{lootItems.length}</div>
                <div className="text-sm text-zinc-400">Лут</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{craftingRecipes.length}</div>
                <div className="text-sm text-zinc-400">Рецепты</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
