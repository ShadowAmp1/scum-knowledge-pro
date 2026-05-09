"use client";

import { useState } from "react";
import { MapPin, Ruler } from "lucide-react";

interface DistanceSelectorProps {
  distance: number;
  onDistanceChange: (distance: number) => void;
}

export default function DistanceSelector({ distance, onDistanceChange }: DistanceSelectorProps) {
  const [customDistance, setCustomDistance] = useState("");

  const presetDistances = [
    { value: 0, label: "0м", description: "Ближний бой" },
    { value: 25, label: "25м", description: "Комнаты" },
    { value: 50, label: "50м", description: "Короткая дистанция" },
    { value: 100, label: "100м", description: "Средняя дистанция" },
    { value: 200, label: "200м", description: "Дальняя дистанция" },
    { value: 300, label: "300м", description: "Очень дальняя" },
    { value: 500, label: "500м", description: "Снайперская" },
    { value: 1000, label: "1000м", description: "Экстремальная" }
  ];

  const handleCustomDistance = () => {
    const value = parseFloat(customDistance);
    if (!isNaN(value) && value >= 0 && value <= 2000) {
      onDistanceChange(value);
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Ruler className="h-5 w-5 text-zinc-400" />
        <h3 className="text-lg font-semibold text-white">Расстояние</h3>
        <span className={`text-lg font-bold ${getDistanceColor(distance)}`}>
          {distance}м
        </span>
      </div>

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
          Произвольное расстояние (0-2000м):
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
      <div className={`p-3 rounded-lg border ${getDistanceBackground(distance)}`}>
        <h4 className="font-semibold text-white mb-2">Эффекты на расстоянии {distance}м:</h4>
        <div className="space-y-1 text-sm">
          {distance <= 25 && (
            <>
              <p className="text-zinc-300">• Максимальный урон от дробовиков</p>
              <p className="text-zinc-300">• Пистолеты и ПП эффективны</p>
              <p className="text-zinc-300">• Нет падения урона для большинства патронов</p>
            </>
          )}
          {distance > 25 && distance <= 100 && (
            <>
              <p className="text-zinc-300">• Штурмовые винтовки наиболее эффективны</p>
              <p className="text-zinc-300">• Начинается падение урона пистолетных патронов</p>
              <p className="text-zinc-300">• Дробовики теряют эффективность</p>
            </>
          )}
          {distance > 100 && distance <= 300 && (
            <>
              <p className="text-zinc-300">• Снайперские винтовки показывают лучшие результаты</p>
              <p className="text-zinc-300">• Значительное падение урона пистолетных патронов</p>
              <p className="text-zinc-300">• Требуется учет баллистики</p>
            </>
          )}
          {distance > 300 && distance <= 500 && (
            <>
              <p className="text-zinc-300">• Только снайперское оружие эффективно</p>
              <p className="text-zinc-300">• Большинство патронов имеют минимальный урон</p>
              <p className="text-zinc-300">• Требуется высокоточное оружие</p>
            </>
          )}
          {distance > 500 && (
            <>
              <p className="text-zinc-300">• Только тяжелые снайперские калибры</p>
              <p className="text-zinc-300">• .50 BMG и .338 Lapua эффективны</p>
              <p className="text-zinc-300">• Экстремальные требования к точности</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
