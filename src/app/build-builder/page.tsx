"use client";

import { useState } from "react";
import { weapons } from "@/data/weapons";
import { attachments } from "@/data/attachments";
import { Plus, Settings, Target, Shield, Zap } from "lucide-react";

export default function BuildBuilderPage() {
  const [selectedWeapon, setSelectedWeapon] = useState("");
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([]);
  const [buildName, setBuildName] = useState("");

  const weapon = weapons.find(w => w.slug === selectedWeapon);
  
  // Получаем совместимые обвесы
  const compatibleAttachments = selectedWeapon ? 
    attachments.filter(a => 
      a.compatibleWeaponSlugs.includes(selectedWeapon)
    ) : [];

  // Расчет характеристик билда
  const calculateBuildStats = () => {
    if (!weapon) return null;

    const stats = {
      damage: weapon.rating.damage,
      control: weapon.rating.control,
      range: weapon.rating.range,
      economy: weapon.rating.economy,
      bunker: weapon.rating.bunker,
      pvp: weapon.rating.pvp,
      difficulty: weapon.rating.difficulty || 5,
    };

    // Бонусы от обвесов
    const attachmentBonuses = selectedAttachments.reduce((acc, slug) => {
      const attachment = attachments.find(a => a.slug === slug);
      if (!attachment) return acc;

      // Бонусы зависят от типа обвеса
      if (attachment.category === "Глушители") {
        return {
          ...acc,
          control: acc.control + 2,
          range: acc.range - 1
        };
      }
      if (attachment.category === "Прицелы") {
        return {
          ...acc,
          range: acc.range + 3,
          control: acc.control + 1
        };
      }
      if (attachment.category === "Магазины") {
        return {
          ...acc,
          damage: acc.damage + 1,
          economy: acc.economy + 1
        };
      }
      if (attachment.category === "Фонарики") {
        return {
          ...acc,
          control: acc.control + 1,
          bunker: acc.bunker + 2
        };
      }
      if (attachment.category === "Планки") {
        return {
          ...acc,
          control: acc.control + 1,
          range: acc.range + 1
        };
      }
      return acc;
    }, stats);

    return attachmentBonuses;
  };

  const buildStats = calculateBuildStats();

  const addAttachment = (slug: string) => {
    if (!selectedAttachments.includes(slug)) {
      setSelectedAttachments([...selectedAttachments, slug]);
    }
  };

  const removeAttachment = (slug: string) => {
    setSelectedAttachments(selectedAttachments.filter(a => a !== slug));
  };

  const saveBuild = () => {
    if (!weapon || !buildName.trim()) return;
    
    const build = {
      id: Date.now().toString(),
      name: buildName,
      weapon: selectedWeapon,
      attachments: selectedAttachments,
      stats: buildStats,
      createdAt: new Date().toISOString()
    };

    // Сохраняем в localStorage
    const savedBuilds = JSON.parse(localStorage.getItem('scum-builds') || '[]');
    localStorage.setItem('scum-builds', JSON.stringify([...savedBuilds, build]));
    
    // Очищаем форму
    setBuildName("");
    setSelectedAttachments([]);
    
    alert(`Билд "${buildName}" сохранен!`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-black text-white">
            <Settings className="mr-3 inline-block h-10 w-10 text-red-500" />
            Построитель билдов
          </h1>
          <p className="text-lg text-zinc-400">
            Создавай и сохраняй лучшие билды оружия с обвесами для SCUM
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Левая колонка - выбор оружия и обвесов */}
          <div className="space-y-6">
            {/* Выбор оружия */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">
                <Target className="mr-2 inline-block h-6 w-6 text-red-500" />
                Выбор оружия
              </h2>
              
              <select
                value={selectedWeapon}
                onChange={(e) => {
                  setSelectedWeapon(e.target.value);
                  setSelectedAttachments([]);
                }}
                className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
              >
                <option value="">Выберите оружие...</option>
                {weapons.map(weapon => (
                  <option key={weapon.slug} value={weapon.slug}>
                    {weapon.name} ({weapon.tier})
                  </option>
                ))}
              </select>

              {weapon && (
                <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
                  <h3 className="mb-2 font-bold text-white">{weapon.name}</h3>
                  <p className="mb-3 text-sm text-zinc-400">{weapon.shortRole}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-zinc-500">Урон:</span>
                      <div className="font-bold text-red-400">{weapon.rating.damage}/10</div>
                    </div>
                    <div>
                      <span className="text-zinc-500">Контроль:</span>
                      <div className="font-bold text-blue-400">{weapon.rating.control}/10</div>
                    </div>
                    <div>
                      <span className="text-zinc-500">Дальность:</span>
                      <div className="font-bold text-green-400">{weapon.rating.range}/10</div>
                    </div>
                    <div>
                      <span className="text-zinc-500">Экономика:</span>
                      <div className="font-bold text-yellow-400">{weapon.rating.economy}/10</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Обвесы */}
            {weapon && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h2 className="mb-4 text-xl font-bold text-white">
                  <Plus className="mr-2 inline-block h-6 w-6 text-red-500" />
                  Совместимые обвесы
                </h2>
                
                <div className="grid gap-3 sm:grid-cols-2">
                  {compatibleAttachments.map(attachment => (
                    <div
                      key={attachment.slug}
                      className={`cursor-pointer rounded-xl border p-3 transition ${
                        selectedAttachments.includes(attachment.slug)
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-zinc-700 bg-zinc-800 hover:border-zinc-600'
                      }`}
                      onClick={() => 
                        selectedAttachments.includes(attachment.slug)
                          ? removeAttachment(attachment.slug)
                          : addAttachment(attachment.slug)
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-white">{attachment.name}</h4>
                          <p className="text-xs text-zinc-400">{attachment.category}</p>
                        </div>
                        <div className={`rounded-lg px-2 py-1 text-xs font-medium ${
                          attachment.rarity === 'Очень редкий' ? 'bg-red-500/20 text-red-300' :
                          attachment.rarity === 'Редкий' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {attachment.rarity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Правая колонка - характеристики и сохранение */}
          <div className="space-y-6">
            {/* Характеристики билда */}
            {buildStats && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h2 className="mb-4 text-xl font-bold text-white">
                  <Shield className="mr-2 inline-block h-6 w-6 text-red-500" />
                  Характеристики билда
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
                    <div className="text-sm text-zinc-500">Урон</div>
                    <div className="text-2xl font-bold text-red-400">
                      {buildStats.damage}/10
                    </div>
                  </div>
                  <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
                    <div className="text-sm text-zinc-500">Контроль</div>
                    <div className="text-2xl font-bold text-blue-400">
                      {buildStats.control}/10
                    </div>
                  </div>
                  <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
                    <div className="text-sm text-zinc-500">Дальность</div>
                    <div className="text-2xl font-bold text-green-400">
                      {buildStats.range}/10
                    </div>
                  </div>
                  <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
                    <div className="text-sm text-zinc-500">Экономика</div>
                    <div className="text-2xl font-bold text-yellow-400">
                      {buildStats.economy}/10
                    </div>
                  </div>
                  <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
                    <div className="text-sm text-zinc-500">Бункер</div>
                    <div className="text-2xl font-bold text-purple-400">
                      {buildStats.bunker}/10
                    </div>
                  </div>
                  <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
                    <div className="text-sm text-zinc-500">PvP</div>
                    <div className="text-2xl font-bold text-orange-400">
                      {buildStats.pvp}/10
                    </div>
                  </div>
                </div>

                {selectedAttachments.length > 0 && (
                  <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-800 p-3">
                    <div className="text-sm text-zinc-500">Установленные обвесы:</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedAttachments.map(slug => {
                        const attachment = attachments.find(a => a.slug === slug);
                        return attachment ? (
                          <span
                            key={slug}
                            className="cursor-pointer rounded-lg bg-red-500/20 px-2 py-1 text-xs text-red-300"
                            onClick={() => removeAttachment(slug)}
                          >
                            {attachment.name} ×
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Сохранение билда */}
            {weapon && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h2 className="mb-4 text-xl font-bold text-white">
                  <Zap className="mr-2 inline-block h-6 w-6 text-red-500" />
                  Сохранить билд
                </h2>
                
                <input
                  type="text"
                  value={buildName}
                  onChange={(e) => setBuildName(e.target.value)}
                  placeholder="Название билда..."
                  className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500"
                />
                
                <button
                  onClick={saveBuild}
                  disabled={!buildName.trim() || !weapon}
                  className="w-full rounded-xl border border-red-500 bg-red-500 px-6 py-3 font-bold text-white transition hover:bg-red-600 disabled:border-zinc-700 disabled:bg-zinc-800 disabled:text-zinc-500"
                >
                  Сохранить билд
                </button>

                <div className="mt-4 text-sm text-zinc-400">
                  <p>💡 Билды сохраняются в браузере и доступны между сессиями</p>
                  <p>📝 Лучшие билды включают баланс урона, контроля и дальности</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
