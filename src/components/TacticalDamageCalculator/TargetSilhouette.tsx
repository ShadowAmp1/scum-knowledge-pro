"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TacticalTarget, TargetZone } from '@/types/tactical';
import { Shield, Heart, Target } from 'lucide-react';

interface TargetSilhouetteProps {
  targets: TacticalTarget[];
  selectedTarget: TacticalTarget | null;
  onTargetSelect: (target: TacticalTarget) => void;
  hoveredZone: TargetZone | null;
  onZoneHover: (zone: TargetZone | null) => void;
  damagePerZone: Record<string, number>;
}

export default function TargetSilhouette({ 
  targets, 
  selectedTarget, 
  onTargetSelect, 
  hoveredZone, 
  onZoneHover,
  damagePerZone 
}: TargetSilhouetteProps) {
  const [selectedPreset, setSelectedPreset] = useState<'pvp' | 'pve' | 'bunker'>('pvp');

  const presets = [
    { id: 'pvp', name: 'PvP', color: '#EF4444' },
    { id: 'pve', name: 'PvE', color: '#10B981' },
    { id: 'bunker', name: 'Бункер', color: '#F59E0B' }
  ];

  const filteredTargets = targets.filter(target => target.category === selectedPreset);

  const getZoneColor = (zone: TargetZone) => {
    if (hoveredZone?.id === zone.id) {
      return 'rgba(239, 68, 68, 0.3)';
    }
    
    const damage = damagePerZone[zone.id] || 0;
    if (damage > 50) return 'rgba(239, 68, 68, 0.2)';
    if (damage > 25) return 'rgba(245, 158, 11, 0.2)';
    if (damage > 0) return 'rgba(16, 185, 129, 0.2)';
    
    return 'rgba(255, 255, 255, 0.05)';
  };

  const getZoneBorderColor = (zone: TargetZone) => {
    if (hoveredZone?.id === zone.id) {
      return '#EF4444';
    }
    
    const damage = damagePerZone[zone.id] || 0;
    if (damage > 50) return '#EF4444';
    if (damage > 25) return '#F59E0B';
    if (damage > 0) return '#10B981';
    
    return 'rgba(255, 255, 255, 0.2)';
  };

  const renderSilhouette = () => {
    if (!selectedTarget) return null;

    return (
      <div className="relative w-full h-80 bg-black/40 rounded-2xl border border-white/10 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Target Silhouette */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.3))' }}
        >
          {/* Body outline */}
          <path
            d="M 50 20 C 55 20, 60 25, 60 30 L 60 40 C 60 45, 55 50, 50 50 C 45 50, 40 45, 40 40 L 40 30 C 40 25, 45 20, 50 20 Z M 35 50 L 65 50 L 65 70 L 55 70 L 55 85 L 45 85 L 45 70 L 35 70 Z"
            fill="rgba(255, 255, 255, 0.05)"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
          />

          {/* Target Zones */}
          {selectedTarget.zones.map((zone) => (
            <motion.g key={zone.id}>
              {/* Zone highlight */}
              <rect
                x={zone.position.x - zone.position.width / 2}
                y={zone.position.y - zone.position.height / 2}
                width={zone.position.width}
                height={zone.position.height}
                fill={getZoneColor(zone)}
                stroke={getZoneBorderColor(zone)}
                strokeWidth={hoveredZone?.id === zone.id ? 2 : 1}
                rx={2}
                className="cursor-pointer"
                onMouseEnter={() => onZoneHover(zone)}
                onMouseLeave={() => onZoneHover(null)}
                style={{ transition: 'all 0.3s ease' }}
              />

              {/* Damage indicator */}
              {damagePerZone[zone.id] > 0 && (
                <motion.text
                  x={zone.position.x}
                  y={zone.position.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {damagePerZone[zone.id]}
                </motion.text>
              )}
            </motion.g>
          ))}

          {/* Center crosshair */}
          <line x1="50" y1="45" x2="50" y2="55" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="1" />
          <line x1="45" y1="50" x2="55" y2="50" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="1" />
        </svg>

        {/* Zone Tooltip */}
        <AnimatePresence>
          {hoveredZone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-4 right-4 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-4 min-w-48"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{hoveredZone.name}</span>
                  <span className="text-xs text-zinc-400">x{hoveredZone.multiplier}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-red-400" />
                    <span className="text-zinc-400">HP:</span>
                    <span className="text-white">{hoveredZone.health}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-blue-400" />
                    <span className="text-zinc-400">Броня:</span>
                    <span className="text-white">{hoveredZone.armor}</span>
                  </div>
                </div>
                {damagePerZone[hoveredZone.id] > 0 && (
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3 text-green-400" />
                      <span className="text-zinc-400">Урон:</span>
                      <span className="text-green-400 font-bold">{damagePerZone[hoveredZone.id]}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Preset Selector */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-red-400" />
          Цель
        </h3>
        
        <div className="flex gap-2 mb-4">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedPreset(preset.id as any)}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                selectedPreset === preset.id
                  ? 'shadow-lg'
                  : 'bg-black/40 border border-white/10 text-zinc-400 hover:bg-white/5 hover:border-white/20 hover:text-white'
              }`}
              style={{
                backgroundColor: selectedPreset === preset.id ? `${preset.color}20` : undefined,
                borderColor: selectedPreset === preset.id ? `${preset.color}50` : undefined,
                boxShadow: selectedPreset === preset.id ? `0 0 20px ${preset.color}40` : undefined,
                color: selectedPreset === preset.id ? preset.color : undefined
              }}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Target List */}
        <div className="space-y-2">
          {filteredTargets.map((target) => (
            <motion.div
              key={target.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => onTargetSelect(target)}
              className={`cursor-pointer rounded-xl border p-3 transition-all hover:scale-[1.02] ${
                selectedTarget?.id === target.id
                  ? 'border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/20'
                  : 'border-white/10 bg-black/40 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">{target.name}</h4>
                  <div className="flex items-center gap-4 mt-1 text-xs text-zinc-400">
                    <span>HP: {target.totalHealth}</span>
                    <span>Броня: {target.armorRating}%</span>
                    <span>Снижение: {target.damageReduction}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-400">Защита</div>
                  <div className="text-lg font-bold text-blue-400">
                    {target.penetrationResistance}%
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Silhouette */}
      {renderSilhouette()}

      {/* Target Stats */}
      {selectedTarget && (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h4 className="font-bold text-white mb-4">Характеристики цели</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Общее здоровье</span>
                <span className="text-white font-bold">{selectedTarget.totalHealth}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Рейтинг брони</span>
                <span className="text-blue-400 font-bold">{selectedTarget.armorRating}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Снижение урона</span>
                <span className="text-orange-400 font-bold">{selectedTarget.damageReduction}%</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Защита от пробития</span>
                <span className="text-purple-400 font-bold">{selectedTarget.penetrationResistance}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Категория</span>
                <span className="text-white font-bold capitalize">{selectedTarget.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Тип</span>
                <span className="text-white font-bold capitalize">{selectedTarget.type}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
