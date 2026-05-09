"use client";

import { useState } from "react";
import { MapPin, Ruler, AlertTriangle } from "lucide-react";

interface DistanceSelectorPanelProps {
  distance: number;
  onDistanceChange: (distance: number) => void;
  weaponEffectiveRange?: number;
  ammoEffectiveRange?: number;
}

export default function DistanceSelectorPanel({ 
  distance, 
  onDistanceChange, 
  weaponEffectiveRange,
  ammoEffectiveRange 
}: DistanceSelectorPanelProps) {
  const [customDistance, setCustomDistance] = useState("");

  const presetDistances = [
    { value: 0, label: "0м", description: "Ближний бой", color: "red" },
    { value: 25, label: "25м", description: "Комнаты", color: "orange" },
    { value: 50, label: "50м", description: "Короткая дистанция", color: "yellow" },
    { value: 100, label: "100м", description: "Средняя дистанция", color: "green" },
    { value: 200, label: "200м", description: "Дальняя дистанция", color: "blue" },
    { value: 300, label: "300м", description: "Очень дальняя", color: "purple" },
    { value: 500, label: "500м", description: "Снайперская", color: "purple" },
    { value: 1000, label: "1000м", description: "Экстремальная", color: "purple" }
  ];

  const handleCustomDistance = () => {
    const value = parseFloat(customDistance);
    if (!isNaN(value) && value >= 0 && value <= 2000) {
      onDistanceChange(value);
      setCustomDistance("");
    }
  };

  const getDistanceColor = (dist: number) => {
    if (dist <= 25) return "text-red-400";
    if (dist <= 100) return "text-yellow-400";
    if (dist <= 300) return "text-green-400";
    if (dist <= 500) return "text-blue-400";
    return "text-purple-400";
  };

  const getDistanceBackground = (dist: number) => {
    if (dist <= 25) return "bg-red-500/20 border-red-500";
    if (dist <= 100) return "bg-yellow-500/20 border-yellow-500";
    if (dist <= 300) return "bg-green-500/20 border-green-500";
    if (dist <= 500) return "bg-blue-500/20 border-blue-500";
    return "bg-purple-500/20 border-purple-500";
  };

  const getDistanceButtonColor = (dist: number) => {
    if (dist <= 25) return "bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30";
    if (dist <= 100) return "bg-yellow-500/20 border-yellow-500 text-yellow-400 hover:bg-yellow-500/30";
    if (dist <= 300) return "bg-green-500/20 border-green-500 text-green-400 hover:bg-green-500/30";
    if (dist <= 500) return "bg-blue-500/20 border-blue-500 text-blue-400 hover:bg-blue-500/30";
    return "bg-purple-500/20 border-purple-500 text-purple-400 hover:bg-purple-500/30";
  };

  const isOutOfRange = () => {
    if (ammoEffectiveRange && distance > ammoEffectiveRange) return true;
    if (weaponEffectiveRange && distance > weaponEffectiveRange) return true;
    return false;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Ruler className="h-5 w-5 text-zinc-400" />
        <h3 className="text-lg font-semibold text-white">Дистанция</h3>
        <span className={`text-lg font-bold ${getDistanceColor(distance)}`}>
          {distance}м
        </span>
      </div>

      {/* Warning if out of range */}
      {isOutOfRange() && (
        <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <span className="text-red-400 text-sm">
            Патрон/оружие неэффективны на этой дистанции
          </span>
        </div>
      )}

      {/* Preset Distances */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {presetDistances.map(preset => (
          <button
            key={preset.value}
            onClick={() => {
              onDistanceChange(preset.value);
              setCustomDistance("");
            }}
            className={`p-3 rounded-lg border transition-all hover:scale-105 ${
              distance === preset.value
                ? getDistanceBackground(preset.value)
                : "bg-zinc-800/50 border-zinc-700 hover:border-zinc-500"
            }`}
          >
            <div className={`font-bold ${getDistanceColor(preset.value)}`}>
              {preset.label}
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              {preset.description}
            </div>
          </button>
        ))}
      </div>

      {/* Custom Distance */}
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
            onChange={(e) => setCustomDistance(e.target.value)}
            placeholder="Введите расстояние..."
            className="flex-1 px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
          <button
            onClick={handleCustomDistance}
            className="px-4 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/30 transition"
          >
            Установить
          </button>
        </div>
      </div>

      {/* Distance Effects Info */}
      <div className={`p-4 rounded-lg border ${getDistanceBackground(distance)}`}>
        <h4 className="font-semibold text-white mb-3">Эффекты на расстоянии {distance}м:</h4>
        <div className="space-y-2 text-sm">
          {distance <= 25 && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-zinc-300">Максимальный урон от дробовиков</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-zinc-300">Пистолеты и ПП эффективны</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-zinc-300">Нет падения урона для большинства патронов</span>
              </div>
            </>
          )}
          {distance > 25 && distance <= 100 && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-zinc-300">Штурмовые винтовки наиболее эффективны</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-zinc-300">Начинается падение урона пистолетных патронов</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-zinc-300">Дробовики теряют эффективность</span>
              </div>
            </>
          )}
          {distance > 100 && distance <= 300 && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-zinc-300">Снайперские винтовки показывают лучшие результаты</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-zinc-300">Значительное падение урона пистолетных патронов</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-zinc-300">Требуется учет баллистики</span>
              </div>
            </>
          )}
          {distance > 300 && distance <= 500 && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-zinc-300">Только снайперское оружие эффективно</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-zinc-300">Большинство патронов имеют минимальный урон</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-zinc-300">Требуется высокоточное оружие</span>
              </div>
            </>
          )}
          {distance > 500 && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-zinc-300">Только тяжелые снайперские калибры</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-zinc-300">.50 BMG и .338 Lapua эффективны</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-zinc-300">Экстремальные требования к точности</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
