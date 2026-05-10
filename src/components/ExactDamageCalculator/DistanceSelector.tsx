"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Ruler } from 'lucide-react';

interface DistanceSelectorProps {
  distance: number;
  onDistanceChange: (distance: number) => void;
  customDistance: string;
  onCustomDistanceChange: (distance: string) => void;
}

export default function DistanceSelector({ 
  distance, 
  onDistanceChange, 
  customDistance, 
  onCustomDistanceChange 
}: DistanceSelectorProps) {
  const distancePresets = [
    { value: 0, label: '0m' },
    { value: 25, label: '25m' },
    { value: 50, label: '50m' },
    { value: 100, label: '100m' },
    { value: 200, label: '200m' },
    { value: 300, label: '300m' },
    { value: 500, label: '500m' },
    { value: 1000, label: '1000m' }
  ];

  const handleCustomDistanceSubmit = () => {
    const value = parseFloat(customDistance);
    if (!isNaN(value) && value >= 0 && value <= 2000) {
      onDistanceChange(value);
    }
  };

  const getDistanceColor = (dist: number) => {
    if (dist <= 25) return 'text-green-400';
    if (dist <= 100) return 'text-yellow-400';
    if (dist <= 300) return 'text-orange-400';
    if (dist <= 500) return 'text-red-400';
    return 'text-purple-400';
  };

  const getDistanceBackground = (dist: number) => {
    if (dist <= 25) return 'from-green-500/20 to-emerald-500/20';
    if (dist <= 100) return 'from-yellow-500/20 to-orange-500/20';
    if (dist <= 300) return 'from-orange-500/20 to-red-500/20';
    if (dist <= 500) return 'from-red-500/20 to-rose-500/20';
    return 'from-purple-500/20 to-pink-500/20';
  };

  return (
    <div className="space-y-4">
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Ruler className="h-5 w-5 text-blue-400" />
          Дистанция
        </h3>

        {/* Current Distance Display */}
        <div className={`mb-6 p-4 rounded-xl bg-gradient-to-r ${getDistanceBackground(distance)} border border-white/10`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-4xl font-black ${getDistanceColor(distance)}`}>
                {distance}m
              </div>
              <div className="text-sm text-zinc-400 mt-1">
                {distance <= 25 ? 'Ближний бой' :
                 distance <= 100 ? 'Средняя дистанция' :
                 distance <= 300 ? 'Дальняя дистанция' :
                 distance <= 500 ? 'Очень дальняя' : 'Экстремальная'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-zinc-500">Эффективность</div>
              <div className={`text-xl font-bold ${getDistanceColor(distance)}`}>
                {distance <= 25 ? '100%' :
                 distance <= 100 ? '85%' :
                 distance <= 300 ? '60%' :
                 distance <= 500 ? '35%' : '15%'}
              </div>
            </div>
          </div>
        </div>

        {/* Distance Presets */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {distancePresets.map((preset, index) => (
            <motion.button
              key={preset.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => onDistanceChange(preset.value)}
              className={`p-3 rounded-xl border transition-all hover:scale-105 ${
                distance === preset.value
                  ? 'border-red-500/50 shadow-lg'
                  : 'border-white/10 bg-black/40 hover:border-white/20'
              }`}
              style={{
                backgroundColor: distance === preset.value ? '#EF444420' : undefined,
                borderColor: distance === preset.value ? '#EF444450' : undefined,
                boxShadow: distance === preset.value ? '0 0 20px #EF444440' : undefined
              }}
            >
              <div className={`font-bold text-lg ${
                distance === preset.value ? 'text-red-400' : 'text-zinc-400'
              }`}>
                {preset.label}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Custom Distance Input */}
        <div className="space-y-2">
          <label className="text-sm text-zinc-400 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Произвольная дистанция (0-2000м):
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              max="2000"
              step="1"
              value={customDistance}
              onChange={(e) => onCustomDistanceChange(e.target.value)}
              placeholder="Введите расстояние..."
              className="flex-1 px-4 py-2 bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <button
              onClick={handleCustomDistanceSubmit}
              className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all"
            >
              Установить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
