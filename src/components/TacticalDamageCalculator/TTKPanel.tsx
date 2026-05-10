"use client";

import { motion } from 'framer-motion';
import { DamageCalculation } from '@/types/tactical';
import { Timer, Skull, Target, Zap } from 'lucide-react';

interface TTKPanelProps {
  calculation: DamageCalculation | null;
}

export default function TTKPanel({ calculation }: TTKPanelProps) {
  if (!calculation) {
    return (
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Timer className="h-5 w-5 text-yellow-400" />
          TTK Расчет
        </h3>
        <div className="text-center py-8 text-zinc-500">
          <Timer className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Выберите оружие, патроны и цель</p>
          <p className="text-sm mt-1">для расчета TTK</p>
        </div>
      </div>
    );
  }

  const getTTKColor = (ttk: number) => {
    if (ttk <= 1.0) return '#10B981';
    if (ttk <= 2.0) return '#F59E0B';
    if (ttk <= 3.0) return '#EF4444';
    return '#6B7280';
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

  return (
    <div className="space-y-4">
      {/* Main TTK Display */}
      <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Timer className="h-5 w-5 text-yellow-400" />
          TTK Расчет
        </h3>
        
        <div className="text-center">
          <motion.div 
            className="text-6xl font-black mb-2"
            style={{ color: getTTKColor(calculation.ttk) }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {calculation.ttk.toFixed(1)}s
          </motion.div>
          <div className="text-zinc-400 text-sm">Время убийства</div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {calculation.headshotShots}
            </div>
            <div className="text-xs text-zinc-400">Выстрелов в голову</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {calculation.chestShots}
            </div>
            <div className="text-xs text-zinc-400">Выстрелов в грудь</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">
              {calculation.legShots}
            </div>
            <div className="text-xs text-zinc-400">Выстрелов в ноги</div>
          </div>
        </div>
      </div>

      {/* Damage Breakdown */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="h-4 w-4 text-red-400" />
          Детализация урона
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Базовый урон</span>
            <motion.span 
              className="text-lg font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {calculation.baseDamage}
            </motion.span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Урон на дистанции</span>
            <motion.span 
              className="text-lg font-bold text-yellow-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {calculation.distanceDamage}
            </motion.span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Урон после брони</span>
            <motion.span 
              className="text-lg font-bold text-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {calculation.armorDamage}
            </motion.span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Финальный урон</span>
            <motion.span 
              className="text-2xl font-bold text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {calculation.finalDamage}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Penetration & Effectiveness */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-purple-400" />
            <h4 className="font-bold text-white">Пробитие</h4>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-3xl font-bold text-purple-400"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {calculation.penetrationChance}%
            </motion.div>
            <div className="text-xs text-zinc-400 mt-1">Шанс пробить броню</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Skull className="h-4 w-4 text-green-400" />
            <h4 className="font-bold text-white">Эффективность</h4>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-2xl font-bold"
              style={{ color: getEffectivenessColor(calculation.effectiveness) }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {getEffectivenessLabel(calculation.effectiveness)}
            </motion.div>
            <div className="text-xs text-zinc-400 mt-1">Общая оценка</div>
          </div>
        </div>
      </div>

      {/* Shots to Kill */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h4 className="font-bold text-white mb-4">Выстрелы для убийства</h4>
        
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center mb-2">
              <Skull className="h-5 w-5 text-red-400" />
            </div>
            <div className="text-lg font-bold text-red-400">{calculation.headshotShots}</div>
            <div className="text-xs text-zinc-400">Голова</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mb-2">
              <Target className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-blue-400">{calculation.chestShots}</div>
            <div className="text-xs text-zinc-400">Грудь</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center mb-2">
              <Zap className="h-5 w-5 text-orange-400" />
            </div>
            <div className="text-lg font-bold text-orange-400">{calculation.legShots}</div>
            <div className="text-xs text-zinc-400">Ноги</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-2">
              <Timer className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-lg font-bold text-green-400">{calculation.shotsToKill}</div>
            <div className="text-xs text-zinc-400">Всего</div>
          </div>
        </div>
      </div>
    </div>
  );
}
