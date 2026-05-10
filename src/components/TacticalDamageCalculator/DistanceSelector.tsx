"use client";

import { motion } from 'framer-motion';
import { distancePresets } from '@/data/tacticalWeapons';
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
  const handleCustomDistanceSubmit = () => {
    const value = parseFloat(customDistance);
    if (!isNaN(value) && value >= 0 && value <= 2000) {
      onDistanceChange(value);
    }
  };

  const getDistanceColor = (dist: number) => {
    if (dist <= 25) return '#10B981';
    if (dist <= 100) return '#F59E0B';
    if (dist <= 300) return '#EF4444';
    if (dist <= 500) return '#F97316';
    return '#8B5CF6';
  };

  const getDistanceBackground = (dist: number) => {
    if (dist <= 25) return 'from-green-500/20 to-emerald-500/20';
    if (dist <= 100) return 'from-yellow-500/20 to-orange-500/20';
    if (dist <= 300) return 'from-red-500/20 to-rose-500/20';
    if (dist <= 500) return 'from-orange-500/20 to-amber-500/20';
    return 'from-purple-500/20 to-pink-500/20';
  };

  const getDistanceDescription = (dist: number) => {
    if (dist === 0) return 'Ближний бой';
    if (dist <= 25) return 'Комнаты';
    if (dist <= 50) return 'Коридоры';
    if (dist <= 100) return 'Средняя дистанция';
    if (dist <= 200) return 'Дальняя дистанция';
    if (dist <= 300) return 'Очень дальняя';
    if (dist <= 500) return 'Снайперская';
    return 'Экстремальная';
  };

  return (
    <div className="space-y-4">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Ruler className="h-5 w-5 text-blue-400" />
          Дистанция
        </h3>

        {/* Current Distance Display */}
        <div className={`mb-6 p-4 rounded-xl bg-gradient-to-r ${getDistanceBackground(distance)} border border-white/10`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold" style={{ color: getDistanceColor(distance) }}>
                {distance}m
              </div>
              <div className="text-sm text-zinc-400 mt-1">
                {getDistanceDescription(distance)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-zinc-500">Эффективность</div>
              <div className="text-lg font-bold" style={{ color: getDistanceColor(distance) }}>
                {distance <= 25 ? '100%' : distance <= 100 ? '85%' : distance <= 300 ? '60%' : distance <= 500 ? '35%' : '15%'}
              </div>
            </div>
          </div>
        </div>

        {/* Distance Presets */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {distancePresets.map((preset, index) => (
            <motion.button
              key={preset.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => onDistanceChange(preset.value)}
              className={`p-3 rounded-xl border transition-all hover:scale-105 ${
                distance === preset.value
                  ? 'shadow-lg'
                  : 'bg-black/40 border-white/10 hover:border-white/20'
              }`}
              style={{
                backgroundColor: distance === preset.value ? `${preset.color}20` : undefined,
                borderColor: distance === preset.value ? `${preset.color}50` : undefined,
                boxShadow: distance === preset.value ? `0 0 20px ${preset.color}40` : undefined
              }}
            >
              <div 
                className="font-bold text-lg"
                style={{ color: distance === preset.value ? preset.color : '#9CA3AF' }}
              >
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

      {/* Distance Effects Info */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h4 className="font-bold text-white mb-4">Эффекты дистанции</h4>
        
        <div className="space-y-3">
          <div className={`p-3 rounded-lg border ${distance <= 25 ? 'border-green-500/50 bg-green-500/10' : 'border-white/10 bg-black/40'}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                <span className="text-green-400 text-sm">0-25</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-white">Ближний бой</div>
                <div className="text-xs text-zinc-400">Максимальный урон, нет падения</div>
              </div>
              <div className="text-green-400 font-bold">100%</div>
            </div>
          </div>

          <div className={`p-3 rounded-lg border ${distance > 25 && distance <= 100 ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-white/10 bg-black/40'}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center">
                <span className="text-yellow-400 text-sm">25-100</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-white">Средняя дистанция</div>
                <div className="text-xs text-zinc-400">Легкое падение урона</div>
              </div>
              <div className="text-yellow-400 font-bold">85%</div>
            </div>
          </div>

          <div className={`p-3 rounded-lg border ${distance > 100 && distance <= 300 ? 'border-red-500/50 bg-red-500/10' : 'border-white/10 bg-black/40'}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                <span className="text-red-400 text-sm">100-300</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-white">Дальняя дистанция</div>
                <div className="text-xs text-zinc-400">Значительное падение урона</div>
              </div>
              <div className="text-red-400 font-bold">60%</div>
            </div>
          </div>

          <div className={`p-3 rounded-lg border ${distance > 300 ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/10 bg-black/40'}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center">
                <span className="text-purple-400 text-sm">300+</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-white">Экстремальная</div>
                <div className="text-xs text-zinc-400">Только снайперское оружие</div>
              </div>
              <div className="text-purple-400 font-bold">15%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
