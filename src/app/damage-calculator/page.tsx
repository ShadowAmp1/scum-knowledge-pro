"use client";

import { useState } from "react";
import { WeaponStats, AmmoType, TargetType } from "@/types/ammo";
import { weaponStats } from "@/data/ammo";
import { DamageCalculator } from "@/utils/damageCalculator";
import { Calculator, Target, Zap, BarChart3, Settings } from "lucide-react";

// Components
import WeaponSelector from "@/components/DamageCalculator/WeaponSelector";
import AmmoSelector from "@/components/DamageCalculator/AmmoSelector";
import TargetSelector from "@/components/DamageCalculator/TargetSelector";
import DistanceSelector from "@/components/DamageCalculator/DistanceSelector";
import DamageResults from "@/components/DamageCalculator/DamageResults";
import AmmoComparison from "@/components/DamageCalculator/AmmoComparison";

export default function DamageCalculatorPage() {
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponStats | null>(null);
  const [selectedAmmo, setSelectedAmmo] = useState<AmmoType | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<TargetType | null>(null);
  const [distance, setDistance] = useState(100);
  const [isHeadshot, setIsHeadshot] = useState(false);
  const [isCritical, setIsCritical] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Calculate damage when all parameters are selected
  const calculation = selectedWeapon && selectedAmmo && selectedTarget
    ? DamageCalculator.calculateDamage(
        selectedWeapon.name,
        selectedAmmo.id,
        selectedTarget.id,
        distance,
        isHeadshot,
        isCritical
      )
    : null;

  // Auto-select ammo when weapon is selected
  const handleWeaponSelect = (weapon: WeaponStats) => {
    setSelectedWeapon(weapon);
    // Reset ammo to force re-selection
    setSelectedAmmo(null);
  };

  // Auto-calculate when parameters change
  const handleAmmoSelect = (ammo: AmmoType) => {
    setSelectedAmmo(ammo);
  };

  const handleTargetSelect = (target: TargetType) => {
    setSelectedTarget(target);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-black text-white">
            <Calculator className="mr-3 inline-block h-10 w-10 text-red-500" />
            Продвинутый калькулятор урона SCUM
          </h1>
          <p className="text-lg text-zinc-400">
            Точные расчеты урона с учетом всех типов патронов, целей и дистанций
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Selection */}
          <div className="space-y-6">
            {/* Weapon Selection */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h2 className="mb-4 text-xl font-bold text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-red-500" />
                Оружие
              </h2>
              <WeaponSelector
                selectedWeapon={selectedWeapon}
                onWeaponSelect={handleWeaponSelect}
              />
            </div>

            {/* Ammo Selection */}
            {selectedWeapon && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h2 className="mb-4 text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Патроны
                </h2>
                <AmmoSelector
                  selectedAmmo={selectedAmmo}
                  onAmmoSelect={handleAmmoSelect}
                  caliber={selectedWeapon.caliber}
                />
              </div>
            )}

            {/* Target Selection */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h2 className="mb-4 text-xl font-bold text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                Цель
              </h2>
              <TargetSelector
                selectedTarget={selectedTarget}
                onTargetSelect={handleTargetSelect}
              />
            </div>
          </div>

          {/* Middle Column - Parameters */}
          <div className="space-y-6">
            {/* Distance Selection */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <DistanceSelector
                distance={distance}
                onDistanceChange={setDistance}
              />
            </div>

            {/* Hit Options */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">Параметры выстрела</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isHeadshot}
                    onChange={(e) => setIsHeadshot(e.target.checked)}
                    className="w-4 h-4 text-red-500 bg-zinc-800 border-zinc-600 rounded focus:ring-red-500"
                  />
                  <span className="text-white">Выстрел в голову</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCritical}
                    onChange={(e) => setIsCritical(e.target.checked)}
                    className="w-4 h-4 text-red-500 bg-zinc-800 border-zinc-600 rounded focus:ring-red-500"
                  />
                  <span className="text-white">Критический урон</span>
                </label>
              </div>
            </div>

            {/* Comparison Toggle */}
            {selectedWeapon && selectedTarget && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                    showComparison
                      ? 'bg-red-500/20 border border-red-500 text-red-400'
                      : 'bg-zinc-800 border border-zinc-700 text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  {showComparison ? 'Скрыть сравнение' : 'Сравнить все патроны'}
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Damage Results */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <DamageResults
                calculation={calculation}
                isHeadshot={isHeadshot}
                isCritical={isCritical}
              />
            </div>

            {/* Quick Stats */}
            {calculation && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="mb-4 text-lg font-bold text-white">Быстрая статистика</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-zinc-500">Эффективность:</span>
                    <div className="font-bold text-green-400 capitalize">
                      {calculation.effectiveness === 'optimal' && 'Оптимально'}
                      {calculation.effectiveness === 'excellent' && 'Отлично'}
                      {calculation.effectiveness === 'good' && 'Хорошо'}
                      {calculation.effectiveness === 'fair' && 'Удовлетворительно'}
                      {calculation.effectiveness === 'poor' && 'Плохо'}
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-500">Шанс крита:</span>
                    <div className="font-bold text-yellow-400">
                      {Math.round(calculation.criticalChance)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-500">Выстрелов до убийства:</span>
                    <div className="font-bold text-red-400">
                      {Math.ceil(100 / calculation.finalDamage)}
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-500">Патронов в магазине:</span>
                    <div className="font-bold text-blue-400">
                      {selectedWeapon?.magazineSize || 0}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Section */}
        {showComparison && selectedWeapon && selectedTarget && (
          <div className="mt-8">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <AmmoComparison
                weaponName={selectedWeapon.name}
                targetId={selectedTarget.id}
                distance={distance}
                isHeadshot={isHeadshot}
                isCritical={isCritical}
              />
            </div>
          </div>
        )}

        {/* Tips Section */}
        {calculation && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
              <h3 className="mb-4 text-lg font-bold text-green-400">✅ Рекомендации</h3>
              <div className="space-y-2 text-sm text-zinc-300">
                {calculation.effectiveness === 'optimal' && (
                  <p>• Идеальный выбор! Это оружие и патроны максимально эффективны против цели.</p>
                )}
                {calculation.penetrationChance > 80 && (
                  <p>• Высокий шанс пробития брони - отлично против бронированных целей.</p>
                )}
                {calculation.dps > 100 && (
                  <p>• Высокий DPS - быстро уничтожает цели.</p>
                )}
                {calculation.finalDamage > 50 && (
                  <p>• Большой урон за выстрел - эффективно для снайперской дуели.</p>
                )}
                {distance <= 50 && calculation.finalDamage > 80 && (
                  <p>• Отлично для ближнего боя в помещениях.</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
              <h3 className="mb-4 text-lg font-bold text-yellow-400">⚡ Тактические советы</h3>
              <div className="space-y-2 text-sm text-zinc-300">
                {calculation.ttk > 5 && (
                  <p>• TTK довольно высокий - рассмотрите более мощные патроны.</p>
                )}
                {calculation.penetrationChance < 30 && (
                  <p>• Низкое пробитие - используйте AP или урановые патроны против брони.</p>
                )}
                {distance > 300 && !isHeadshot && (
                  <p>• На больших дистанциях старайтесь целиться в голову.</p>
                )}
                {selectedWeapon && selectedWeapon.recoil > 70 && (
                  <p>• Высокая отдача - стреляйте короткими очередями.</p>
                )}
                {calculation.criticalChance < 5 && (
                  <p>• Низкий шанс крита - не полагайтесь на удачу.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
