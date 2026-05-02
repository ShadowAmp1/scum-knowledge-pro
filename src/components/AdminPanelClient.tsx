"use client";

import { useEffect, useMemo, useState } from "react";
import { Clipboard, Database, Download, FilePlus2, ShieldCheck, Trash2 } from "lucide-react";
import { attachments } from "@/data/attachments";
import { bunkers } from "@/data/bunkers";
import { guides } from "@/data/guides";
import { lootItems } from "@/data/loot";
import { mapMarkers } from "@/data/mapMarkers";
import { weapons } from "@/data/weapons";

type AdminEntity = "weapon" | "loot" | "map" | "guide";
type Draft = { id: string; entity: AdminEntity; title: string; slug: string; payload: string; createdAt: string };
const entityLabels: Record<AdminEntity, string> = { weapon: "Оружие", loot: "Лут", map: "Маркер карты", guide: "Гайд" };
const storageKey = "scum-db-pro-admin-drafts-v1";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/ё/g, "e").replace(/[^a-z0-9а-я\s-]/gi, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}

function templateFor(entity: AdminEntity, title: string, slug: string) {
  const safeTitle = title.trim() || "Новый элемент";
  const safeSlug = slug.trim() || slugify(safeTitle) || "new-item";
  if (entity === "weapon") return JSON.stringify({ slug: safeSlug, name: safeTitle, category: "Штурмовые", type: "Уточнить тип", ammo: "Зависит от версии игры и сервера", rarity: "Редкая", mode: "PvE/PvP", tier: "B", difficulty: "Средняя", range: "Универсальная", shortRole: "Коротко опиши роль оружия", summary: "Описание: что это за оружие, где его удобно использовать и кому оно подходит.", rating: { damage: 5, control: 5, range: 5, economy: 5, bunker: 5, pvp: 5 }, bestBuild: ["Оптика под дистанцию", "Запасные магазины", "Медицина"], attachments: ["Укажи модули текстом"], recommendedAttachmentSlugs: [], serverNote: "Точные характеристики и доступность зависят от версии SCUM и настроек сервера.", ammoTips: ["Не указывай точные числа без проверки."], whereToFind: ["Военные зоны", "Бункеры", "Торговцы, если включены на сервере"], pros: ["Плюс 1", "Плюс 2"], cons: ["Минус 1", "Минус 2"], tips: ["Практический совет по использованию"], recommendedFor: ["PvE", "PvP", "Фарм"] }, null, 2);
  if (entity === "loot") return JSON.stringify({ slug: safeSlug, name: safeTitle, category: "Ценности", rarity: "Ценный", priority: "Средний", usefulness: "Брать, если есть место", stage: "На каком этапе игры особенно полезно.", forWhom: "Кому полезен предмет.", value: "Средняя", weight: "Легкий", locations: ["Города", "Промзоны"], bestLocations: ["Уточнить лучшие места"], usage: "Что это, зачем нужно и когда брать.", keepOrSell: "Хранить или продавать — объясни кратко.", tips: ["Практический совет"], mistakes: ["Ошибка новичка"], related: ["Лут"], serverNote: "Спавн и цена зависят от настроек сервера." }, null, 2);
  if (entity === "map") return JSON.stringify({ id: safeSlug, name: safeTitle, category: "loot", sector: "B0", x: 50, y: 50, risk: "Средний", lootTier: "T2", short: "Короткое описание маркера.", description: "Подробное описание зоны. Если координата примерная — обязательно напиши: примерная зона, зависит от сервера.", bestFor: ["Лут", "Маршрут"], recommendedKit: ["бинты", "вода", "свободный рюкзак"], searchFor: ["ценности", "инструменты"], dangerNotes: ["риск игроков", "зависит от сервера"], playerFit: "Кому подходит зона.", newbieAdvice: "Стоит ли ехать новичку." }, null, 2);
  return JSON.stringify({ slug: safeSlug, title: safeTitle, category: "Новичок", difficulty: "Новичок", minutes: 15, summary: "Краткое описание гайда.", intro: "Вступление: кому и зачем нужен гайд.", goals: ["Цель 1", "Цель 2"], checklist: ["Что подготовить"], suitsFor: ["новичкам", "соло"], stepPlan: ["Шаг 1", "Шаг 2"], bring: ["бинты", "вода"], expectedResult: ["Что игрок получит в итоге"], sections: [{ heading: "Раздел", body: "Пояснение", bullets: ["Совет"] }], mistakes: ["Ошибка новичка"], tips: ["Практический совет"] }, null, 2);
}

function validateDraft(entity: AdminEntity, payload: string) {
  try {
    const data = JSON.parse(payload) as Record<string, unknown>;
    const required = entity === "map" ? ["id", "name", "category", "sector", "x", "y", "description"] : entity === "guide" ? ["slug", "title", "summary", "intro"] : ["slug", "name"];
    const missing = required.filter((key) => !String(data[key] ?? "").trim());
    if (missing.length) return `Не заполнено: ${missing.join(", ")}`;
    if (entity !== "map" && String(data.slug).includes(" ")) return "slug не должен содержать пробелы";
    if (entity === "map") {
      const x = Number(data.x); const y = Number(data.y);
      if (!Number.isFinite(x) || !Number.isFinite(y) || x < 0 || x > 100 || y < 0 || y > 100) return "координаты x/y должны быть от 0 до 100";
    }
    return "OK";
  } catch (error) {
    return error instanceof Error ? error.message : "JSON не читается";
  }
}

export function AdminPanelClient() {
  const [entity, setEntity] = useState<AdminEntity>("weapon");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [payload, setPayload] = useState(templateFor("weapon", "", ""));
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [copied, setCopied] = useState(false);
  useEffect(() => { try { const saved = localStorage.getItem(storageKey); if (saved) setDrafts(JSON.parse(saved) as Draft[]); } catch { setDrafts([]); } }, []);
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(drafts)); }, [drafts]);
  const validation = useMemo(() => validateDraft(entity, payload), [entity, payload]);
  const stats = [{ label: "Оружие", value: weapons.length }, { label: "Обвесы", value: attachments.length }, { label: "Лут", value: lootItems.length }, { label: "Бункеры", value: bunkers.length }, { label: "Маркеры карты", value: mapMarkers.length }, { label: "Гайды", value: guides.length }];
  const resetTemplate = (nextEntity = entity, nextTitle = title, nextSlug = slug) => setPayload(templateFor(nextEntity, nextTitle, nextSlug));
  const saveDraft = () => { const parsed = JSON.parse(payload) as Record<string, unknown>; const draftTitle = String(parsed.name ?? parsed.title ?? title ?? "Черновик"); const draftSlug = String(parsed.slug ?? parsed.id ?? slug ?? slugify(draftTitle)); setDrafts((current) => [{ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, entity, title: draftTitle, slug: draftSlug, payload, createdAt: new Date().toLocaleString("ru-RU") }, ...current]); };
  const copyPayload = async () => { await navigator.clipboard.writeText(payload); setCopied(true); window.setTimeout(() => setCopied(false), 1500); };
  const exportDrafts = () => { const blob = new Blob([JSON.stringify(drafts, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "scum-db-pro-admin-drafts.json"; link.click(); URL.revokeObjectURL(url); };

  return <section className="mx-auto max-w-7xl px-4 py-10">
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">{stats.map((stat) => <div key={stat.label} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5"><div className="text-3xl font-black text-white">{stat.value}</div><div className="mt-1 text-xs font-bold text-zinc-500">{stat.label}</div></div>)}</div>
    <div className="mt-8 rounded-3xl border border-amber-500/20 bg-amber-500/10 p-5 text-sm leading-6 text-amber-100"><div className="flex items-center gap-2 font-black"><ShieldCheck size={18} /> Admin Lite без базы данных</div><p className="mt-2 text-amber-100/80">Эта панель не меняет файлы сайта на Render. Она делает черновики и JSON-блоки, которые можно скопировать в `src/data`. Для настоящей v5-админки нужна авторизация, база данных и API.</p></div>
    <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.3fr]"><div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6"><div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-red-400"><FilePlus2 size={16} /> Новый черновик</div><div className="mt-5 grid gap-3"><label className="grid gap-2 text-sm font-bold text-zinc-400">Тип данных<select value={entity} onChange={(event) => { const next = event.target.value as AdminEntity; setEntity(next); resetTemplate(next); }} className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500/60">{(Object.keys(entityLabels) as AdminEntity[]).map((key) => <option key={key} value={key}>{entityLabels[key]}</option>)}</select></label><label className="grid gap-2 text-sm font-bold text-zinc-400">Название<input value={title} onChange={(event) => { const nextTitle = event.target.value; setTitle(nextTitle); if (!slug) setSlug(slugify(nextTitle)); }} placeholder="Например: Новый автомат" className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/60" /></label><label className="grid gap-2 text-sm font-bold text-zinc-400">Slug / ID<input value={slug} onChange={(event) => setSlug(slugify(event.target.value))} placeholder="new-item-slug" className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/60" /></label><button type="button" onClick={() => resetTemplate()} className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-black text-red-200 transition hover:bg-red-500/20">Сгенерировать шаблон</button></div><div className="mt-6 rounded-2xl border border-zinc-800 bg-black p-4"><div className="flex items-center gap-2 text-sm font-black text-white"><Database size={16} /> Как добавить в проект</div><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-zinc-400"><li>Заполни JSON и сохрани черновик.</li><li>Скопируй объект в нужный массив `src/data`.</li><li>Запусти `npm run validate:data`.</li><li>Потом запусти `npm run build`.</li></ol></div></div><div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><div className="text-sm font-black uppercase tracking-[0.25em] text-red-400">JSON-редактор</div><p className="mt-2 text-sm text-zinc-500">Статус проверки: <b className={validation === "OK" ? "text-emerald-300" : "text-amber-300"}>{validation}</b></p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={copyPayload} className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/50 hover:text-white"><Clipboard size={16} /> {copied ? "Скопировано" : "Копировать"}</button><button type="button" onClick={saveDraft} disabled={validation !== "OK"} className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-black text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40">Сохранить черновик</button></div></div><textarea value={payload} onChange={(event) => setPayload(event.target.value)} spellCheck={false} className="mt-5 min-h-[520px] w-full rounded-2xl border border-zinc-800 bg-black p-4 font-mono text-xs leading-5 text-zinc-200 outline-none transition focus:border-red-500/60" /></div></div>
    <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-2xl font-black text-white">Черновики</h2><p className="mt-2 text-sm text-zinc-500">Хранятся только в браузере. Для командной работы экспортируй JSON.</p></div><button type="button" onClick={exportDrafts} disabled={drafts.length === 0} className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"><Download size={16} /> Экспорт</button></div>{drafts.length === 0 ? <div className="mt-5 rounded-2xl border border-zinc-800 bg-black p-5 text-sm text-zinc-500">Пока нет черновиков.</div> : <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{drafts.map((draft) => <article key={draft.id} className="rounded-2xl border border-zinc-800 bg-black p-5"><div className="flex items-center justify-between gap-3"><span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-black text-red-200">{entityLabels[draft.entity]}</span><button type="button" onClick={() => setDrafts((current) => current.filter((item) => item.id !== draft.id))} className="text-zinc-500 transition hover:text-red-300" aria-label="Удалить черновик"><Trash2 size={16} /></button></div><h3 className="mt-3 text-lg font-black text-white">{draft.title}</h3><p className="mt-1 text-xs text-zinc-500">{draft.slug} • {draft.createdAt}</p><div className="mt-4 flex gap-2"><button type="button" onClick={() => { setEntity(draft.entity); setTitle(draft.title); setSlug(draft.slug); setPayload(draft.payload); }} className="rounded-xl border border-zinc-800 px-3 py-2 text-xs font-bold text-zinc-300 transition hover:border-red-500/50 hover:text-white">Открыть</button><button type="button" onClick={() => navigator.clipboard.writeText(draft.payload)} className="rounded-xl border border-zinc-800 px-3 py-2 text-xs font-bold text-zinc-300 transition hover:border-red-500/50 hover:text-white">Копировать JSON</button></div></article>)}</div>}</section>
  </section>;
}
