"use client";

import { useEffect, useMemo, useState } from "react";

export type MissionTrackerStatus = "planned" | "active" | "done";
export type MissionTrackerEntry = { slug: string; status: MissionTrackerStatus; completedObjectives: string[]; updatedAt: number };
const STORAGE_KEY = "scum-mission-tracker-v1";

function readStoredTracker(): MissionTrackerEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as MissionTrackerEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load mission tracker:", error);
    return [];
  }
}

export function useMissionTracker() {
  const [entries, setEntries] = useState<MissionTrackerEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { setEntries(readStoredTracker()); setIsLoaded(true); }, []);

  const saveEntries = (items: MissionTrackerEntry[]) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setEntries(items);
  };
  const getEntry = (slug: string) => entries.find((entry) => entry.slug === slug);
  const setStatus = (slug: string, status: MissionTrackerStatus) => {
    const current = getEntry(slug);
    const next = current
      ? entries.map((entry) => entry.slug === slug ? { ...entry, status, updatedAt: Date.now() } : entry)
      : [...entries, { slug, status, completedObjectives: [], updatedAt: Date.now() }];
    saveEntries(next);
  };
  const removeMission = (slug: string) => saveEntries(entries.filter((entry) => entry.slug !== slug));
  const clearTracker = () => saveEntries([]);
  const toggleObjective = (slug: string, label: string) => {
    const current = getEntry(slug);
    const completed = current?.completedObjectives ?? [];
    const nextCompleted = completed.includes(label) ? completed.filter((item) => item !== label) : [...completed, label];
    const next = current
      ? entries.map((entry) => entry.slug === slug ? { ...entry, status: entry.status === "planned" ? "active" : entry.status, completedObjectives: nextCompleted, updatedAt: Date.now() } : entry)
      : [...entries, { slug, status: "active" as const, completedObjectives: nextCompleted, updatedAt: Date.now() }];
    saveEntries(next);
  };
  const stats = useMemo(() => ({
    total: entries.length,
    planned: entries.filter((entry) => entry.status === "planned").length,
    active: entries.filter((entry) => entry.status === "active").length,
    done: entries.filter((entry) => entry.status === "done").length,
  }), [entries]);

  return { entries, isLoaded, stats, getEntry, setStatus, removeMission, clearTracker, toggleObjective };
}
