"use client";

import { DamageCalculation } from "@/types/ammo";
import { Target, Zap, Shield, Timer, TrendingUp, Skull, Activity } from "lucide-react";

interface DamageResultPanelProps {
  calculation: DamageCalculation | null;
  isHeadshot: boolean;
  isCritical: boolean;
}

export default function DamageResultPanel({ calculation, isHeadshot, isCritical }: DamageResultPanelProps) {
  if (!calculation) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-500">
        <div className="text-center">
          <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-lg">Выберите оружие, патроны и цель</p>
          <p className="text-sm mt-1">для расчета урона</p>
        </div>
      </div>
    );
  }

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness) {
      case 'optimal': return 'text-green-400 border-green-500 bg-green-500/10';
      case 'excellent': return 'text-blue-400 border-blue-500 bg-blue-500/10';
      case 'good': return 'text-yellow-400 border-yellow-500 bg-yellow-500/10';
      case 'fair': return 'text-orange-400 border-orange-500 bg-orange-500/10';
      case 'poor': return 'text-red-400 border-red-500 bg-red-500/10';
      default: return 'text-zinc-400 border-zinc-500 bg-zinc-500/10';
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

  const getEffectivenessValue = (effectiveness: string) => {
    switch (effectiveness) {
      case 'optimal': return 100;
      case 'excellent': return 80;
      case 'good': return 60;
      case 'fair': return 40;
      case 'poor': return 20;
      default: return 0;
    }
  };

  const getProgressBar = (value: number, max: number = 100, color: string = "blue") => {
    const percentage = Math.min(100, (value / max) * 100);
    const getColorClass = (col: string) => {
      switch (col) {
        case 'red': return 'bg-red-500';
        case 'green': return 'bg-green-500';
        case 'yellow': return 'bg-yellow-500';
        case 'blue': return 'bg-blue-500';
        case 'purple': return 'bg-purple-500';
        case 'orange': return 'bg-orange-500';
        default: return 'bg-zinc-500';
      }
    };

    return (
      <div className="w-full bg-zinc-700 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${getColorClass(color)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  const formatNumber = (num: number) => {
    return Math.round(num * 10) / 10;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Результаты расчета</h3>
        <div className={`px-3 py-1 rounded-lg border text-sm font-medium ${getEffectivenessColor(calculation.effectiveness)}`}>
          {getEffectivenessLabel(calculation.effectiveness)}
        </div>
      </div>

      {/* Main Damage Display */}
      <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
        <div className="text-center">
          <div className="text-6xl font-black text-red-400 mb-2">
            {formatNumber(calculation.finalDamage)}
          </div>
          <div className="text-zinc-400 text-sm mb-4">Финальный урон</div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-zinc-500">Базовый</div>
              <div className="text-white font-medium">{formatNumber(calculation.baseDamage)}</div>
            </div>
            <div>
              <div className="text-zinc-500">Дистанция</div>
              <div className="text-yellow-400 font-medium">{formatNumber(calculation.distanceDamage)}</div>
            </div>
            <div>
              <div className="text-zinc-500">После брони</div>
              <div className="text-green-400 font-medium">{formatNumber(calculation.armorDamage)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Multipliers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-zinc-400" />
            <span className="text-xs text-zinc-400">Дистанция</span>
          </div>
          <div className="text-lg font-bold text-yellow-400">
            {formatNumber(calculation.distanceMultiplier * 100)}%
          </div>
          {getProgressBar(calculation.distanceMultiplier * 100, 100, 'yellow')}
        </div>

        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-zinc-400" />
            <span className="text-xs text-zinc-400">Броня</span>
          </div>
          <div className="text-lg font-bold text-blue-400">
            {formatNumber(calculation.armorMultiplier * 100)}%
          </div>
          {getProgressBar(calculation.armorMultiplier * 100, 100, 'blue')}
        </div>

        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-zinc-400" />
            <span className="text-xs text-zinc-400">Пробитие</span>
          </div>
          <div className="text-lg font-bold text-purple-400">
            {formatNumber(calculation.penetrationMultiplier * 100)}%
          </div>
          {getProgressBar(calculation.penetrationMultiplier * 100, 100, 'purple')}
        </div>

        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Skull className="h-4 w-4 text-zinc-400" />
            <span className="text-xs text-zinc-400">Крит. урон</span>
          </div>
          <div className="text-lg font-bold text-red-400">
            {formatNumber(calculation.criticalMultiplier * 100)}%
          </div>
          {getProgressBar(calculation.criticalMultiplier * 100, 200, 'red')}
        </div>
      </div>

      {/* Combat Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-orange-400" />
            <h4 className="font-semibold text-white">DPS</h4>
          </div>
          <div className="text-2xl font-bold text-orange-400 mb-1">
            {formatNumber(calculation.dps)}
          </div>
          <div className="text-xs text-zinc-400">Урон в секунду</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Timer className="h-5 w-5 text-blue-400" />
            <h4 className="font-semibold text-white">TTK</h4>
          </div>
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {formatNumber(calculation.ttk)}s
          </div>
          <div className="text-xs text-zinc-400">Время убийства (100 HP)</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h4 className="font-semibold text-white">Пробитие</h4>
          </div>
          <div className="text-2xl font-bold text-green-400 mb-1">
            {formatNumber(calculation.penetrationChance)}%
          </div>
          <div className="text-xs text-zinc-400">Шанс пробить броню</div>
        </div>
      </div>

      {/* Hit Status */}
      <div className="flex gap-3">
        {isHeadshot && (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500 rounded-lg">
            <Skull className="h-4 w-4 text-red-400" />
            <span className="text-red-400 text-sm">Выстрел в голову</span>
          </div>
        )}
        {isCritical && (
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 border border-yellow-500 rounded-lg">
            <Activity className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm">Критический урон</span>
          </div>
        )}
      </div>

      {/* Effectiveness Bar */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-400">Общая эффективность</span>
          <span className="text-sm font-medium text-white">{formatNumber(calculation.finalDamage)} урона</span>
        </div>
        {getProgressBar(getEffectivenessValue(calculation.effectiveness), 100, 'green')}
      </div>
    </div>
  );
}
