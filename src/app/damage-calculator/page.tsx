"use client";

import { useState } from "react";
import { weapons } from "@/data/weapons";
import { lootItems } from "@/data/loot";
import { Calculator, Target, TrendingUp, AlertTriangle } from "lucide-react";

export default function DamageCalculatorPage() {
  const [selectedWeapon, setSelectedWeapon] = useState("");
  const [selectedAmmo, setSelectedAmmo] = useState("");
  const [targetDistance, setTargetDistance] = useState(50);
  const [targetArmor, setTargetArmor] = useState(0);

  // Данные урона для разных патронов
  const ammoDamageData = {
    "9mm": { baseDamage: 25, armorPenetration: 15, range: 50 },
    "45-acp": { baseDamage: 35, armorPenetration: 20, range: 40 },
    "556x45mm": { baseDamage: 45, armorPenetration: 35, range: 100 },
    "762x39mm": { baseDamage: 55, armorPenetration: 40, range: 80 },
    "762x51mm": { baseDamage: 75, armorPenetration: 60, range: 150 },
    "545x39mm": { baseDamage: 40, armorPenetration: 30, range: 90 },
    "12g": { baseDamage: 80, armorPenetration: 25, range: 30 },
    "308": { baseDamage: 85, armorPenetration: 65, range: 200 }
  };

  // Получаем доступное оружие
  const availableWeapons = weapons.filter(w => w.slug === selectedWeapon || !selectedWeapon);
  
  // Получаем патроны для выбранного оружия
  const availableAmmo = selectedWeapon ? 
    lootItems.filter(item => 
      item.category === "Патроны" && 
      item.name.toLowerCase().includes(selectedWeapon.toLowerCase().split('-')[0])
    ) : [];

  // Расчет урона
  const calculateDamage = () => {
    if (!selectedWeapon || !selectedAmmo) return null;
    
    const weapon = weapons.find(w => w.slug === selectedWeapon);
    const ammo = availableAmmo.find(a => a.slug === selectedAmmo);
    
    if (!weapon || !ammo) return null;

    // Получаем данные урона для патрона
    const ammoType = getAmmoType(ammo.name);
    const ammoData = ammoDamageData[ammoType];
    
    if (!ammoData) return null;

    // Расчет урона с учетом расстояния и брони
    const distanceMultiplier = Math.max(0.3, 1 - (targetDistance / ammoData.range));
    const effectiveDamage = ammoData.baseDamage * distanceMultiplier;
    const armorDamage = Math.max(0, effectiveDamage - (targetArmor * (1 - ammoData.armorPenetration / 100)));
    
    return {
      baseDamage: ammoData.baseDamage,
      effectiveDamage: Math.round(effectiveDamage),
      armorDamage: Math.round(armorDamage),
      damageReduction: Math.round((1 - armorDamage / effectiveDamage) * 100),
      ammoType: ammoType,
      optimalRange: ammoData.range
    };
  };

  const getAmmoType = (ammoName: string) => {
    if (ammoName.includes("9mm")) return "9mm";
    if (ammoName.includes(".45")) return "45-acp";
    if (ammoName.includes("5.56")) return "556x45mm";
    if (ammoName.includes("7.62x39")) return "762x39mm";
    if (ammoName.includes("7.62x51")) return "762x51mm";
    if (ammoName.includes("5.45")) return "545x39mm";
    if (ammoName.includes("12g")) return "12g";
    if (ammoName.includes(".308")) return "308";
    return "9mm";
  };

  const damageResult = calculateDamage();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-black text-white">
            <Calculator className="mr-3 inline-block h-10 w-10 text-red-500" />
            Калькулятор урона
          </h1>
          <p className="text-lg text-zinc-400">
            Рассчитайте урон для разных патронов и оружия в SCUM
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Панель ввода */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">Оружие</h3>
              <select
                value={selectedWeapon}
                onChange={(e) => {
                  setSelectedWeapon(e.target.value);
                  setSelectedAmmo("");
                }}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
              >
                <option value="">Выберите оружие</option>
                {weapons.map((weapon) => (
                  <option key={weapon.slug} value={weapon.slug}>
                    {weapon.name} ({weapon.ammo})
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">Патроны</h3>
              <select
                value={selectedAmmo}
                onChange={(e) => setSelectedAmmo(e.target.value)}
                disabled={!selectedWeapon}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-white disabled:opacity-50"
              >
                <option value="">Выберите патроны</option>
                {availableAmmo.map((ammo) => (
                  <option key={ammo.slug} value={ammo.slug}>
                    {ammo.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">Цель</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Расстояние: {targetDistance}м
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={targetDistance}
                    onChange={(e) => setTargetDistance(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Броня: {targetArmor}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={targetArmor}
                    onChange={(e) => setTargetArmor(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Результаты расчета */}
          <div className="lg:col-span-2">
            {damageResult ? (
              <div className="space-y-6">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                  <h3 className="mb-4 flex items-center text-lg font-bold text-white">
                    <Target className="mr-2 h-5 w-5 text-red-500" />
                    Результаты расчета
                  </h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-4">
                      <div className="text-sm text-zinc-400">Базовый урон</div>
                      <div className="text-2xl font-bold text-white">{damageResult.baseDamage}</div>
                    </div>
                    
                    <div className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-4">
                      <div className="text-sm text-zinc-400">Эффективный урон</div>
                      <div className="text-2xl font-bold text-green-400">{damageResult.effectiveDamage}</div>
                    </div>
                    
                    <div className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-4">
                      <div className="text-sm text-zinc-400">Урон по броне</div>
                      <div className="text-2xl font-bold text-orange-400">{damageResult.armorDamage}</div>
                    </div>
                    
                    <div className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-4">
                      <div className="text-sm text-zinc-400">Снижение урона</div>
                      <div className="text-2xl font-bold text-red-400">{damageResult.damageReduction}%</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                  <h3 className="mb-4 flex items-center text-lg font-bold text-white">
                    <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                    Характеристики патрона
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Тип патрона:</span>
                      <span className="font-medium text-white">{damageResult.ammoType.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Оптимальная дальность:</span>
                      <span className="font-medium text-white">{damageResult.optimalRange}м</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Бронепробитие:</span>
                      <span className="font-medium text-white">{ammoDamageData[damageResult.ammoType]?.armorPenetration}%</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-yellow-400" />
                    <div>
                      <h4 className="mb-2 font-medium text-yellow-200">Советы по использованию</h4>
                      <ul className="space-y-1 text-sm text-yellow-300">
                        <li>• Эффективность урона снижается на {Math.round((targetDistance / damageResult.optimalRange) * 100)}% на текущем расстоянии</li>
                        <li>• {damageResult.damageReduction > 50 ? "Высокая броня цели значительно снижает урон" : "Броня цели умеренно снижает урон"}</li>
                        <li>• {targetDistance > damageResult.optimalRange ? "Цель находится за пределами оптимальной дальности" : "Цель в пределах эффективной дальности"}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12">
                <div className="text-center">
                  <Calculator className="mx-auto mb-4 h-16 w-16 text-zinc-600" />
                  <p className="text-zinc-400">
                    Выберите оружие и патроны для расчета урона
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
