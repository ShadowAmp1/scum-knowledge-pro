"use client";

import { useState } from "react";
import { craftingRecipes, craftingCategories } from "@/data/crafting";
import { Filter, Search, Wrench, AlertCircle } from "lucide-react";
import type { CraftingRecipe, CraftingCategory, CraftingDifficulty } from "@/data/crafting";

export default function CraftingPage() {
  const [selectedCategory, setSelectedCategory] = useState<CraftingCategory | "Все">("Все");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Все");

  const filteredRecipes = craftingRecipes.filter((recipe) => {
    const matchesCategory = selectedCategory === "Все" || recipe.category === selectedCategory;
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "Все" || recipe.difficulty === selectedDifficulty;
    
    return matchesCategory && matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-black text-white">
            <Wrench className="mr-3 inline-block h-10 w-10 text-red-500" />
            Крафт SCUM
          </h1>
          <p className="text-lg text-zinc-400">
            Полный список рецептов крафта в SCUM с фильтрами и поиском
          </p>
        </div>

        <div className="mb-6 grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 lg:grid-cols-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
              <Filter className="h-4 w-4" />
              Категория
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as CraftingCategory | "Все")}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
            >
              <option value="Все">Все категории</option>
              {craftingCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
              <Filter className="h-4 w-4" />
              Сложность
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
            >
              <option value="Все">Все сложности</option>
              <option value="Легко">Легко</option>
              <option value="Средне">Средне</option>
              <option value="Сложно">Сложно</option>
              <option value="Очень сложно">Очень сложно</option>
            </select>
          </div>

          <div className="space-y-2 lg:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
              <Search className="h-4 w-4" />
              Поиск
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Название или описание..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500"
            />
          </div>
        </div>

        <div className="mb-4 text-sm text-zinc-400">
          Найдено рецептов: {filteredRecipes.length}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.slug}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-red-500/30 hover:bg-zinc-900/80"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{recipe.name}</h3>
                  <p className="text-sm text-zinc-400">{recipe.category}</p>
                </div>
                <span className={`rounded-lg px-2 py-1 text-xs font-medium ${
                  recipe.rarity === "Легендарный" ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30" :
                  recipe.rarity === "Очень редкий" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" :
                  recipe.rarity === "Редкий" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" :
                  "bg-green-500/20 text-green-300 border border-green-500/30"
                }`}>
                  {recipe.rarity}
                </span>
              </div>

              <p className="mb-4 text-sm text-zinc-300">{recipe.description}</p>

              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-zinc-400">Сложность:</span>
                  <span className={`rounded px-2 py-1 text-xs ${
                    recipe.difficulty === "Очень сложно" ? "bg-red-500/20 text-red-300" :
                    recipe.difficulty === "Сложно" ? "bg-orange-500/20 text-orange-300" :
                    recipe.difficulty === "Средне" ? "bg-yellow-500/20 text-yellow-300" :
                    "bg-green-500/20 text-green-300"
                  }`}>
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-zinc-400">Навык:</span>
                  <span className="ml-2 text-zinc-300">{recipe.skillRequired}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-zinc-400">Материалы:</h4>
                <div className="space-y-1">
                  {recipe.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-300">{material.name}</span>
                      <span className="text-zinc-500">×{material.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {recipe.tools.length > 0 && (
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-medium text-zinc-400">Инструменты:</h4>
                  <div className="flex flex-wrap gap-1">
                    {recipe.tools.map((tool, index) => (
                      <span key={index} className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-zinc-800 bg-zinc-800/50 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400">Результат:</h4>
                    <p className="text-sm text-white">{recipe.result.name}</p>
                  </div>
                  <span className="text-zinc-400">×{recipe.result.quantity}</span>
                </div>
              </div>

              {recipe.tips.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                    <div className="text-xs text-zinc-400">
                      {recipe.tips[0]}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-zinc-400">Рецепты не найдены. Попробуйте изменить фильтры.</p>
          </div>
        )}
      </div>
    </div>
  );
}
