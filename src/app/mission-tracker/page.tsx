"use client";

import { useState, useEffect } from "react";
import { missions } from "@/data/missions";
import { CheckCircle2, Circle, Clock, Target, Star, AlertCircle } from "lucide-react";

export default function MissionTrackerPage() {
  const [trackedMissions, setTrackedMissions] = useState<any[]>([]);
  const [selectedMission, setSelectedMission] = useState("");

  // Загружаем сохраненный прогресс
  useEffect(() => {
    const saved = localStorage.getItem('scum-mission-progress');
    if (saved) {
      setTrackedMissions(JSON.parse(saved));
    }
  }, []);

  // Сохраняем прогресс
  const saveProgress = (updatedMissions: any[]) => {
    localStorage.setItem('scum-mission-progress', JSON.stringify(updatedMissions));
    setTrackedMissions(updatedMissions);
  };

  // Добавляем миссию в трекер
  const addMission = () => {
    if (!selectedMission) return;
    
    const mission = missions.find(m => m.slug === selectedMission);
    if (!mission) return;

    const trackedMission = {
      id: Date.now(),
      missionSlug: mission.slug,
      title: mission.title,
      category: mission.category,
      difficulty: mission.difficulty,
      objectives: mission.objectives.map(obj => ({
        id: obj.title,
        title: obj.title,
        description: obj.description,
        completed: false,
        notes: ""
      })),
      startedAt: new Date().toISOString(),
      completedAt: null,
      notes: ""
    };

    const updated = [...trackedMissions, trackedMission];
    saveProgress(updated);
    setSelectedMission("");
  };

  // Обновляем прогресс цели
  const updateObjective = (missionId: number, objectiveId: string, completed: boolean) => {
    const updated = trackedMissions.map(mission => {
      if (mission.id === missionId) {
        const updatedObjectives = mission.objectives.map(obj => 
          obj.id === objectiveId ? { ...obj, completed } : obj
        );
        
        const allCompleted = updatedObjectives.every(obj => obj.completed);
        
        return {
          ...mission,
          objectives: updatedObjectives,
          completedAt: allCompleted ? new Date().toISOString() : null
        };
      }
      return mission;
    });
    
    saveProgress(updated);
  };

  // Добавляем заметки к цели
  const updateObjectiveNotes = (missionId: number, objectiveId: string, notes: string) => {
    const updated = trackedMissions.map(mission => {
      if (mission.id === missionId) {
        const updatedObjectives = mission.objectives.map(obj => 
          obj.id === objectiveId ? { ...obj, notes } : obj
        );
        return { ...mission, objectives: updatedObjectives };
      }
      return mission;
    });
    
    saveProgress(updated);
  };

  // Удаляем миссию из трекера
  const removeMission = (missionId: number) => {
    const updated = trackedMissions.filter(m => m.id !== missionId);
    saveProgress(updated);
  };

  // Статистика
  const stats = {
    total: trackedMissions.length,
    completed: trackedMissions.filter(m => m.completedAt).length,
    inProgress: trackedMissions.filter(m => !m.completedAt).length,
    byDifficulty: {
      "Легко": trackedMissions.filter(m => m.difficulty === "Легко").length,
      "Средне": trackedMissions.filter(m => m.difficulty === "Средне").length,
      "Сложно": trackedMissions.filter(m => m.difficulty === "Сложно").length,
      "Очень сложно": trackedMissions.filter(m => m.difficulty === "Очень сложно").length
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-black text-white">
            <Target className="mr-3 inline-block h-10 w-10 text-red-500" />
            Трекер миссий
          </h1>
          <p className="text-lg text-zinc-400">
            Отслеживайте прогресс выполнения миссий в SCUM
          </p>
        </div>

        {/* Статистика */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="text-sm text-zinc-400">Всего миссий</div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
            <div className="text-sm text-green-400">Завершено</div>
            <div className="text-2xl font-bold text-green-300">{stats.completed}</div>
          </div>
          <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
            <div className="text-sm text-yellow-400">В процессе</div>
            <div className="text-2xl font-bold text-yellow-300">{stats.inProgress}</div>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="text-sm text-zinc-400">Прогресс</div>
            <div className="text-2xl font-bold text-white">
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
            </div>
          </div>
        </div>

        {/* Добавление новой миссии */}
        <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h3 className="mb-4 text-lg font-bold text-white">Добавить миссию</h3>
          <div className="flex gap-4">
            <select
              value={selectedMission}
              onChange={(e) => setSelectedMission(e.target.value)}
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
            >
              <option value="">Выберите миссию</option>
              {missions.map((mission) => (
                <option key={mission.slug} value={mission.slug}>
                  {mission.title} ({mission.category})
                </option>
              ))}
            </select>
            <button
              onClick={addMission}
              disabled={!selectedMission}
              className="rounded-xl bg-red-600 px-6 py-2 font-bold text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Добавить в трекер
            </button>
          </div>
        </div>

        {/* Список отслеживаемых миссий */}
        <div className="space-y-6">
          {trackedMissions.map((trackedMission) => {
            const mission = missions.find(m => m.slug === trackedMission.missionSlug);
            const isCompleted = trackedMission.completedAt !== null;
            const progress = Math.round(
              (trackedMission.objectives.filter(obj => obj.completed).length / trackedMission.objectives.length) * 100
            );

            return (
              <div
                key={trackedMission.id}
                className={`rounded-2xl border p-6 ${
                  isCompleted 
                    ? 'border-green-500/30 bg-green-500/5' 
                    : 'border-zinc-800 bg-zinc-900/50'
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{trackedMission.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <span className="rounded bg-zinc-800 px-2 py-1">{trackedMission.category}</span>
                      <span className={`rounded px-2 py-1 ${
                        trackedMission.difficulty === "Очень сложно" ? "bg-red-500/20 text-red-300" :
                        trackedMission.difficulty === "Сложно" ? "bg-orange-500/20 text-orange-300" :
                        trackedMission.difficulty === "Средне" ? "bg-yellow-500/20 text-yellow-300" :
                        "bg-green-500/20 text-green-300"
                      }`}>
                        {trackedMission.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-green-400">
                        <CheckCircle2 className="h-4 w-4" />
                        Завершено
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-400">
                        <Clock className="h-4 w-4" />
                        В процессе {progress}%
                      </span>
                    )}
                    <button
                      onClick={() => removeMission(trackedMission.id)}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm text-red-300 transition hover:bg-red-500/20"
                    >
                      Удалить
                    </button>
                  </div>
                </div>

                {/* Цели миссии */}
                <div className="space-y-3">
                  {trackedMission.objectives.map((objective) => (
                    <div
                      key={objective.id}
                      className={`rounded-xl border p-4 ${
                        objective.completed
                          ? 'border-green-500/30 bg-green-500/10'
                          : 'border-zinc-700 bg-zinc-800/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => updateObjective(trackedMission.id, objective.id, !objective.completed)}
                          className={`mt-1 rounded-full p-1 transition ${
                            objective.completed
                              ? 'bg-green-500 text-white'
                              : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'
                          }`}
                        >
                          {objective.completed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                        </button>
                        <div className="flex-1">
                          <h4 className={`font-medium ${
                            objective.completed ? 'text-green-300 line-through' : 'text-white'
                          }`}>
                            {objective.title}
                          </h4>
                          <p className="text-sm text-zinc-400">{objective.description}</p>
                          
                          {/* Заметки к цели */}
                          <div className="mt-2">
                            <textarea
                              value={objective.notes}
                              onChange={(e) => updateObjectiveNotes(trackedMission.id, objective.id, e.target.value)}
                              placeholder="Добавить заметки..."
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Общие заметки к миссии */}
                <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-800/50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
                    <AlertCircle className="h-4 w-4" />
                    Общие заметки
                  </h4>
                  <textarea
                    value={trackedMission.notes}
                    onChange={(e) => {
                      const updated = trackedMissions.map(m => 
                        m.id === trackedMission.id ? { ...m, notes: e.target.value } : m
                      );
                      saveProgress(updated);
                    }}
                    placeholder="Заметки по миссии..."
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500"
                    rows={3}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {trackedMissions.length === 0 && (
          <div className="py-12 text-center">
            <Target className="mx-auto mb-4 h-16 w-16 text-zinc-600" />
            <p className="text-zinc-400">
              Нет отслеживаемых миссий. Добавьте первую миссию для начала отслеживания.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
