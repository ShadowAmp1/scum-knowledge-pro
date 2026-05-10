"use client";

import { motion } from 'framer-motion';
import { DamageCalculation } from '@/types/tactical';
import { RotateCcw, Zap, Timer, Target } from 'lucide-react';

interface StickySummaryProps {
  calculation: DamageCalculation | null;
  onReset: () => void;
  onBestAmmo: () => void;
}

export default function StickySummary({ calculation, onReset, onBestAmmo }: StickySummaryProps) {
  if (!calculation) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-zinc-500">
            Выберите оружие, патроны и цель для расчета
          </div>
          <div className="flex gap-2">
            <button
              onClick={onBestAmmo}
              className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-xl hover:bg-yellow-500/30 transition-all flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Лучший патрон
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-zinc-800/50 border border-zinc-700 text-zinc-400 rounded-xl hover:bg-zinc-800/70 transition-all flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Сброс
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness) {
      case 'optimal': return '#10B981';
      case 'excellent': return '#3B82F6';
      case 'good': return '#F59E0B';
      case 'fair': return '#F97316';
      case 'poor': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getEffectivenessLabel = (effectiveness: string) => {
    switch (effectiveness) {
      case 'optimal': return 'Оптимально';
      case 'excellent': return 'Отлично';
      case 'good': return 'Хорошо';
      case 'fair': return 'Удовлетворительно';
      case 'poor': return 'Плохо';
      default: return 'Неизвестно';
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 p-6 z-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Summary */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="text-zinc-300 text-sm font-medium">
                {calculation.weapon.name} → {calculation.ammo.name} → {calculation.distance}м → {calculation.target.name}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span 
                className="px-4 py-2 rounded-xl text-sm font-bold"
                style={{ 
                  backgroundColor: `${getEffectivenessColor(calculation.effectiveness)}20`,
                  color: getEffectivenessColor(calculation.effectiveness)
                }}
              >
                {getEffectivenessLabel(calculation.effectiveness)}
              </span>
            </div>
          </div>

          {/* Large Stats Grid */}
          <div className="grid grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-4xl font-black text-red-400 mb-1">
                {calculation.finalDamage}
              </div>
              <div className="text-sm text-zinc-400">Урон</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-yellow-400 mb-1">
                {calculation.ttk.toFixed(1)}s
              </div>
              <div className="text-sm text-zinc-400">TTK</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-400 mb-1">
                {calculation.shotsToKill}
              </div>
              <div className="text-sm text-zinc-400">Выстрелов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-400 mb-1">
                {calculation.penetrationChance}%
              </div>
              <div className="text-sm text-zinc-400">Пробитие</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-orange-400 mb-1">
                {calculation.headshotShots}
              </div>
              <div className="text-sm text-zinc-400">В голову</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-400 mb-1">
                {calculation.chestShots}
              </div>
              <div className="text-sm text-zinc-400">В грудь</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onBestAmmo}
            className="px-6 py-3 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-xl hover:bg-yellow-500/30 transition-all flex items-center gap-2 font-medium"
          >
            <Zap className="h-4 w-4" />
            Лучший патрон
          </button>
          <button
            onClick={onReset}
            className="px-6 py-3 bg-zinc-800/50 border border-zinc-700 text-zinc-400 rounded-xl hover:bg-zinc-800/70 transition-all flex items-center gap-2 font-medium"
          >
            <RotateCcw className="h-4 w-4" />
            Сброс
          </button>
        </div>
      </div>
    </motion.div>
  );
}
