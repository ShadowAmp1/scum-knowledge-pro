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

    const baseStats = {
      damage: weapon.rating.damage,
      control: weapon.rating.control,
      range: weapon.rating.range,
      accuracy: weapon.rating.damage, // Используем damage как proxy для accuracy
      mobility: 10 - weapon.rating.difficulty // Чем сложнее оружие, тем меньше мобильность
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
          range: acc.range + 1,
          mobility: acc.mobility - 0.5
        };
      }
      if (attachment.category === "Магазины") {
        return {
          ...acc,
          damage: acc.damage + 1,
          mobility: acc.mobility + 0.5
        };
      }
      if (attachment.category === "Оптика") {
        return {
          ...acc,
          range: acc.range + 3,
          accuracy: acc.accuracy + 2
        };
      }
      return acc;
    }, baseStats);

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
    if (!weapon || !buildName) return;
    
    const build = {
      name: buildName,
      weapon: weapon.slug,
      attachments: selectedAttachments,
      stats: buildStats,
      createdAt: new Date().toISOString()
    };
    
    const savedBuilds = JSON.parse(localStorage.getItem('scum-builds') || '[]');
    localStorage.setItem('scum-builds', JSON.stringify([...savedBuilds, build]));
    
    alert('Билд сохранен!');
    setBuildName("");
    setSelectedAttachments([]);
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
            Создавайте и сохраняйте оптимальные билды оружия
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Панель выбора */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">Оружие</h3>
              <select
                value={selectedWeapon}
                onChange={(e) => {
                  setSelectedWeapon(e.target.value);
                  setSelectedAttachments([]);
                }}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
              >
                <option value="">Выберите оружие</option>
                {weapons.map((weapon) => (
                  <option key={weapon.slug} value={weapon.slug}>
                    {weapon.name} ({weapon.category})
                  </option>
                ))}
              </select>
            </div>

            {weapon && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="mb-4 text-lg font-bold text-white">Название билда</h3>
                <input
                  type="text"
                  value={buildName}
                  onChange={(e) => setBuildName(e.target.value)}
                  placeholder="Мой билд..."
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500"
                />
                <button
                  onClick={saveBuild}
                  disabled={!buildName || selectedAttachments.length === 0}
                  className="mt-4 w-full rounded-xl bg-red-600 px-4 py-2 font-bold text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Сохранить билд
                </button>
              </div>
            )}
          </div>

          {/* Обвесы */}
          <div className="lg:col-span-2">
            {weapon && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                  <h3 className="mb-4 text-lg font-bold text-white">Доступные обвесы</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {compatibleAttachments.map((attachment) => (
                      <div
                        key={attachment.slug}
                        className={`rounded-xl border p-4 cursor-pointer transition ${
                          selectedAttachments.includes(attachment.slug)
                            ? 'border-red-500 bg-red-500/10'
                            : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                        }`}
                        onClick={() => 
                          selectedAttachments.includes(attachment.slug)
                            ? removeAttachment(attachment.slug)
                            : addAttachment(attachment.slug)
                        }
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-white">{attachment.name}</h4>
                            <p className="text-sm text-zinc-400">{attachment.category}</p>
                          </div>
                          <div className={`rounded-lg px-2 py-1 text-xs font-medium ${
                            selectedAttachments.includes(attachment.slug)
                              ? 'bg-red-500 text-white'
                              : 'bg-zinc-700 text-zinc-300'
                          }`}>
                            {selectedAttachments.includes(attachment.slug) ? 'Выбран' : 'Добавить'}
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-zinc-500">{attachment.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Характеристики билда */}
                {buildStats && (
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <h3 className="mb-4 text-lg font-bold text-white">Характеристики билда</h3>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-red-500" />
                        <div>
                          <div className="text-sm text-zinc-400">Урон</div>
                          <div className="text-xl font-bold text-white">{buildStats.damage}/10</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <div>
                          <div className="text-sm text-zinc-400">Контроль</div>
                          <div className="text-xl font-bold text-white">{buildStats.control}/10</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-green-500" />
                        <div>
                          <div className="text-sm text-zinc-400">Дальность</div>
                          <div className="text-xl font-bold text-white">{buildStats.range}/10</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Settings className="h-5 w-5 text-purple-500" />
                        <div>
                          <div className="text-sm text-zinc-400">Мобильность</div>
                          <div className="text-xl font-bold text-white">{buildStats.mobility.toFixed(1)}/10</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-800/50 p-4">
                      <h4 className="mb-2 text-sm font-medium text-zinc-300">Рекомендации</h4>
                      <div className="space-y-1 text-sm text-zinc-400">
                        {buildStats.damage >= 7 && <li>• Высокий урон подходит для PvP</li>}
                        {buildStats.control >= 7 && <li>• Отличный контроль для точной стрельбы</li>}
                        {buildStats.range >= 7 && <li>• Хорошая дальность для средних дистанций</li>}
                        {buildStats.mobility >= 7 && <li>• Высокая мобильность для агрессивной игры</li>}
                        {selectedAttachments.length >= 3 && <li>• Хорошо модифицированный билд</li>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Информация об оружии */}
                {weapon && (
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <h3 className="mb-4 text-lg font-bold text-white">{weapon.name}</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="text-sm text-zinc-400">Категория</div>
                        <div className="font-medium text-white">{weapon.category}</div>
                      </div>
                      <div>
                        <div className="text-sm text-zinc-400">Патроны</div>
                        <div className="font-medium text-white">{weapon.ammo}</div>
                      </div>
                      <div>
                        <div className="text-sm text-zinc-400">Режим</div>
                        <div className="font-medium text-white">{weapon.mode}</div>
                      </div>
                      <div>
                        <div className="text-sm text-zinc-400">Сложность</div>
                        <div className="font-medium text-white">{weapon.difficulty}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-zinc-300">{weapon.shortRole}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
