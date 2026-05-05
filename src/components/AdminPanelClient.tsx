"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Database,
  LogIn,
  LogOut,
  MapPin,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { attachments } from "@/data/attachments";
import { guides } from "@/data/guides";
import { lootItems } from "@/data/loot";
import { missions } from "@/data/missions";
import { mapMarkers } from "@/data/mapMarkers";
import { weapons } from "@/data/weapons";

type Entity = "weapons" | "attachments" | "loot" | "missions" | "guides" | "mapMarkers";
type Item = Record<string, unknown>;
type DataState = Record<Entity, Item[]>;
type Field = {
  key: string;
  label: string;
  type?: "text" | "number" | "textarea" | "array" | "select";
  options?: string[];
};
type Config = {
  label: string;
  key: "slug" | "id";
  title: "name" | "title";
  fields: Field[];
  make: () => Item;
};

type Message = { ok: boolean; text: string } | null;

const initialData: DataState = {
  weapons: weapons as unknown as Item[],
  attachments: attachments as unknown as Item[],
  loot: lootItems as unknown as Item[],
  missions: missions as unknown as Item[],
  guides: guides as unknown as Item[],
  mapMarkers: mapMarkers as unknown as Item[],
};

const cats = {
  weapon: [
    "Снайперские",
    "Штурмовые",
    "ПП",
    "Пулеметы",
    "Дробовики",
    "Пистолеты",
    "Луки",
    "Ближний бой",
    "Взрывчатка",
  ],
  attachment: [
    "Обвесы на лук",
    "Магазины",
    "Прицелы",
    "Фонарики",
    "Планки",
    "Глушители",
  ],
  mission: [
    "Сбор предметов",
    "Доставка",
    "Зачистка",
    "Охота",
    "Исследование",
    "Взаимодействие",
    "Крафт и ремонт",
    "Выживание",
    "Обучение",
  ],
  guide: [
    "Новичок",
    "Прокачка",
    "Метаболизм",
    "Медицина",
    "Крафт",
    "Лут",
    "Бункеры",
    "Оружие",
    "Бой",
    "Торговля",
    "Базы",
    "Транспорт",
  ],
  map: [
    "bunker",
    "abandonedBunker",
    "trader",
    "loot",
    "vehicle",
    "base",
    "danger",
    "town",
    "military",
  ],
};

const mapLabels: Record<string, string> = {
  bunker: "Обычный бункер",
  abandonedBunker: "Заброшенный бункер",
  trader: "Торговец",
  loot: "Лут",
  vehicle: "Транспорт",
  base: "Место под базу",
  danger: "Опасная зона",
  town: "Город",
  military: "Военная зона",
};

const dot: Record<string, string> = {
  bunker: "bg-red-600",
  abandonedBunker: "bg-purple-600",
  trader: "bg-emerald-500",
  loot: "bg-amber-400",
  vehicle: "bg-cyan-400",
  base: "bg-violet-500",
  danger: "bg-orange-600",
  town: "bg-zinc-200",
  military: "bg-rose-500",
};

function id(prefix: string) {
  return `${prefix}-${Date.now()}`;
}
function lines(value: unknown) {
  return Array.isArray(value) ? value.map(String).join("\n") : "";
}
function toLines(value: string) {
  return value
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);
}
function text(item: Item | null, key: string) {
  const v = item?.[key];
  return typeof v === "string" || typeof v === "number" ? String(v) : "";
}

function weapon(): Item {
  return {
    slug: id("new-weapon"),
    name: "Новое оружие",
    category: "Штурмовые",
    type: "Уточнить",
    ammo: "Зависит от версии игры и сервера",
    rarity: "Редкая",
    mode: "PvE/PvP",
    tier: "B",
    difficulty: "Средняя",
    range: "Универсальная",
    shortRole: "Краткая роль оружия",
    summary: "Описание оружия: зачем нужно, где полезно, кому подходит.",
    rating: { damage: 5, control: 5, range: 5, economy: 5, bunker: 5, pvp: 5 },
    bestBuild: ["Оптика под дистанцию", "Запасные магазины"],
    attachments: ["Уточнить"],
    recommendedAttachmentSlugs: [],
    serverNote: "Характеристики зависят от версии SCUM и настроек сервера.",
    ammoTips: ["Не указывай точные числа без проверки."],
    whereToFind: ["Военные зоны", "Бункеры"],
    pros: ["Полезно в своей роли"],
    cons: ["Требует подходящей дистанции"],
    tips: ["Проверь состояние оружия перед рейдом."],
    recommendedFor: ["PvE", "PvP"],
  };
}
function attachment(): Item {
  return {
    slug: id("new-attachment"),
    name: "Новый обвес",
    category: "Прицелы",
    subcategory: "Уточнить",
    role: "Роль обвеса",
    rarity: "Обычный",
    compatibleWeapons: [],
    compatibleWeaponSlugs: [],
    compatibilityNote: "Совместимость зависит от версии игры и сервера.",
    summary: "Описание обвеса и кому он подходит.",
    bestFor: ["Фарм"],
    whereToFind: ["Военные зоны", "Бункеры"],
    tips: ["Проверь совместимость перед установкой."],
  };
}
function loot(): Item {
  return {
    slug: id("new-loot"),
    name: "Новый предмет",
    category: "Ценности",
    rarity: "Ценный",
    priority: "Средний",
    usefulness: "Брать, если есть место",
    stage: "Когда полезен.",
    forWhom: "Кому полезен.",
    value: "Средняя",
    weight: "Легкий",
    locations: ["Города"],
    bestLocations: ["Уточнить"],
    usage: "Что это и зачем нужно.",
    keepOrSell: "Хранить или продавать — объясни.",
    tips: ["Не перегружай рюкзак."],
    mistakes: ["Брать без цели."],
    related: ["Лут"],
    serverNote: "Спавн и цена зависят от сервера.",
  };
}

function mission(): Item {
  return {
    slug: id("new-mission"),
    title: "Новая миссия",
    trader: "General Goods",
    source: "Trader Book",
    tier: 1,
    category: "Сбор предметов",
    difficulty: "Легко",
    risk: "Низкий",
    dataStatus: "Шаблон",
    short: "Краткое описание миссии.",
    description: "Полное описание миссии, зачем она нужна и как её выполнять.",
    requirements: [{ name: "Предмет", amount: 1, note: "Уточнить" }],
    objectives: [{ title: "Шаг 1", description: "Что сделать", target: "Цель", amount: 1, locationHint: "Где искать", trackerLabel: "Шаг 1 выполнен" }],
    recommendedGear: ["Бинты", "Рюкзак"],
    bestLocations: ["Уточнить"],
    routePlan: ["Принять квест", "Выполнить objective", "Сдать награду"],
    reward: { cash: "Уточнить", fame: "Уточнить", reputation: "Уточнить", unlocks: ["Следующий tier"], notes: "Награда зависит от сервера." },
    progression: { unlockCondition: "Уточнить", unlocksNext: "Уточнить", progressionValue: 25, nextStep: "Уточнить" },
    tags: ["mission"],
    relatedLoot: [],
    relatedSections: ["Квесты"],
    adminNotes: "Проверить на сервере перед публикацией как точную миссию.",
    playerTips: ["Проверь требования перед выполнением."],
    mistakes: ["Не сверить точный список предметов."],
  };
}
function guide(): Item {
  return {
    slug: id("new-guide"),
    title: "Новый гайд",
    category: "Новичок",
    difficulty: "Новичок",
    minutes: 15,
    summary: "Краткое описание гайда.",
    intro: "Кому и зачем нужен гайд.",
    goals: ["Цель"],
    checklist: ["Подготовка"],
    suitsFor: ["новичкам"],
    stepPlan: ["Шаг 1"],
    bring: ["бинты", "вода"],
    expectedResult: ["Итог"],
    sections: [{ heading: "Раздел", body: "Описание", bullets: ["Совет"] }],
    mistakes: ["Ошибка"],
    tips: ["Совет"],
  };
}
function marker(): Item {
  return {
    id: id("new-marker"),
    name: "Новый маркер",
    category: "loot",
    sector: "B0",
    x: 50,
    y: 50,
    risk: "Средний",
    lootTier: "T2",
    short: "Кратко о точке.",
    description:
      "Описание точки. Если точка примерная — напиши: примерная зона, зависит от сервера.",
    bestFor: ["Лут"],
    recommendedKit: ["бинты", "вода"],
    searchFor: ["ценности"],
    dangerNotes: ["зависит от сервера"],
    playerFit: "Кому подходит.",
    newbieAdvice: "Совет новичку.",
  };
}

const configs: Record<Entity, Config> = {
  weapons: {
    label: "Оружие",
    key: "slug",
    title: "name",
    make: weapon,
    fields: [
      { key: "name", label: "Название" },
      { key: "slug", label: "Slug" },
      {
        key: "category",
        label: "Категория",
        type: "select",
        options: cats.weapon,
      },
      { key: "type", label: "Тип" },
      { key: "ammo", label: "Патрон" },
      {
        key: "tier",
        label: "Tier",
        type: "select",
        options: ["S", "A", "B", "C"],
      },
      {
        key: "range",
        label: "Дистанция",
        type: "select",
        options: ["Ближняя", "Средняя", "Дальняя", "Универсальная"],
      },
      { key: "shortRole", label: "Роль" },
      { key: "summary", label: "Описание", type: "textarea" },
      { key: "bestBuild", label: "Лучший билд", type: "array" },
      {
        key: "recommendedAttachmentSlugs",
        label: "Рекомендуемые обвесы slug",
        type: "array",
      },
      { key: "whereToFind", label: "Где искать", type: "array" },
      { key: "pros", label: "Плюсы", type: "array" },
      { key: "cons", label: "Минусы", type: "array" },
      { key: "tips", label: "Советы", type: "array" },
    ],
  },
  attachments: {
    label: "Обвесы",
    key: "slug",
    title: "name",
    make: attachment,
    fields: [
      { key: "name", label: "Название" },
      { key: "slug", label: "Slug" },
      {
        key: "category",
        label: "Категория",
        type: "select",
        options: cats.attachment,
      },
      { key: "subcategory", label: "Подкатегория" },
      { key: "role", label: "Роль" },
      { key: "summary", label: "Описание", type: "textarea" },
      {
        key: "compatibleWeaponSlugs",
        label: "Совместимое оружие slug",
        type: "array",
      },
      {
        key: "compatibleWeapons",
        label: "Совместимое оружие названия",
        type: "array",
      },
      { key: "bestFor", label: "Лучше для", type: "array" },
      { key: "whereToFind", label: "Где искать", type: "array" },
      { key: "tips", label: "Советы", type: "array" },
    ],
  },
  loot: {
    label: "Лут",
    key: "slug",
    title: "name",
    make: loot,
    fields: [
      { key: "name", label: "Название" },
      { key: "slug", label: "Slug" },
      { key: "category", label: "Категория" },
      {
        key: "rarity",
        label: "Редкость",
        type: "select",
        options: ["Обычный", "Ценный", "Редкий", "Очень редкий"],
      },
      {
        key: "priority",
        label: "Приоритет",
        type: "select",
        options: ["Низкий", "Средний", "Высокий", "Максимальный"],
      },
      {
        key: "usefulness",
        label: "Полезность",
        type: "select",
        options: [
          "Брать всегда",
          "Брать, если есть место",
          "Брать под конкретную задачу",
          "Низкий приоритет",
        ],
      },
      { key: "stage", label: "Этап", type: "textarea" },
      { key: "forWhom", label: "Кому полезно", type: "textarea" },
      { key: "usage", label: "Использование", type: "textarea" },
      { key: "keepOrSell", label: "Хранить/продавать", type: "textarea" },
      { key: "bestLocations", label: "Лучшие места", type: "array" },
      { key: "tips", label: "Советы", type: "array" },
      { key: "mistakes", label: "Ошибки", type: "array" },
    ],
  },

  missions: {
    label: "Квесты",
    key: "slug",
    title: "title",
    make: mission,
    fields: [
      { key: "title", label: "Название" },
      { key: "slug", label: "Slug" },
      { key: "trader", label: "Торговец/источник", type: "select", options: ["General Goods", "Armorer", "Mechanic", "Medic", "Notice Board", "Mobile Phone", "DEENA"] },
      { key: "source", label: "Источник", type: "select", options: ["Trader Book", "Notice Board", "Mobile Phone", "DEENA Manual"] },
      { key: "tier", label: "Tier", type: "number" },
      { key: "category", label: "Категория", type: "select", options: cats.mission },
      { key: "difficulty", label: "Сложность", type: "select", options: ["Легко", "Средне", "Сложно", "Очень сложно"] },
      { key: "risk", label: "Риск", type: "select", options: ["Низкий", "Средний", "Высокий", "Экстремальный"] },
      { key: "dataStatus", label: "Статус данных", type: "select", options: ["Готово", "Требует проверки", "Шаблон"] },
      { key: "short", label: "Кратко", type: "textarea" },
      { key: "description", label: "Описание", type: "textarea" },
      { key: "recommendedGear", label: "Снаряжение", type: "array" },
      { key: "bestLocations", label: "Лучшие места", type: "array" },
      { key: "routePlan", label: "Маршрут", type: "array" },
      { key: "tags", label: "Теги", type: "array" },
      { key: "relatedLoot", label: "Связанный лут", type: "array" },
      { key: "relatedSections", label: "Связанные разделы", type: "array" },
      { key: "adminNotes", label: "Admin note", type: "textarea" },
      { key: "playerTips", label: "Советы", type: "array" },
      { key: "mistakes", label: "Ошибки", type: "array" },
    ],
  },
  guides: {
    label: "Гайды",
    key: "slug",
    title: "title",
    make: guide,
    fields: [
      { key: "title", label: "Название" },
      { key: "slug", label: "Slug" },
      {
        key: "category",
        label: "Категория",
        type: "select",
        options: cats.guide,
      },
      {
        key: "difficulty",
        label: "Сложность",
        type: "select",
        options: ["Новичок", "Средне", "Сложно"],
      },
      { key: "minutes", label: "Минут", type: "number" },
      { key: "summary", label: "Кратко", type: "textarea" },
      { key: "intro", label: "Вступление", type: "textarea" },
      { key: "goals", label: "Цели", type: "array" },
      { key: "checklist", label: "Чеклист", type: "array" },
      { key: "stepPlan", label: "План", type: "array" },
      { key: "bring", label: "Что взять", type: "array" },
      { key: "expectedResult", label: "Итог", type: "array" },
      { key: "mistakes", label: "Ошибки", type: "array" },
      { key: "tips", label: "Советы", type: "array" },
    ],
  },
  mapMarkers: {
    label: "Карта",
    key: "id",
    title: "name",
    make: marker,
    fields: [
      { key: "name", label: "Название" },
      { key: "id", label: "ID" },
      {
        key: "category",
        label: "Категория",
        type: "select",
        options: cats.map,
      },
      { key: "sector", label: "Сектор" },
      { key: "x", label: "X %", type: "number" },
      { key: "y", label: "Y %", type: "number" },
      {
        key: "risk",
        label: "Риск",
        type: "select",
        options: ["Низкий", "Средний", "Высокий", "Экстрим"],
      },
      {
        key: "lootTier",
        label: "Tier",
        type: "select",
        options: ["T1", "T2", "T3", "T4"],
      },
      { key: "short", label: "Кратко", type: "textarea" },
      { key: "description", label: "Описание", type: "textarea" },
      { key: "bestFor", label: "Подходит для", type: "array" },
      { key: "recommendedKit", label: "Что взять", type: "array" },
      { key: "searchFor", label: "Что искать", type: "array" },
      { key: "dangerNotes", label: "Опасности", type: "array" },
      { key: "playerFit", label: "Кому подходит", type: "textarea" },
      { key: "newbieAdvice", label: "Новичку", type: "textarea" },
      { key: "bunkerSlug", label: "Связанный bunker slug" },
      { key: "linkedHref", label: "Ссылка" },
    ],
  },
};

export function AdminPanelClient() {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("Shadow");
  const [password, setPassword] = useState("");
  const [entity, setEntity] = useState<Entity>("weapons");
  const [data, setData] = useState<DataState>(initialData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [dataSource, setDataSource] = useState<
    "files" | "database" | "loading"
  >("files");
  const [message, setMessage] = useState<Message>(null);
  const [jsonDraft, setJsonDraft] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [dragging, setDragging] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const config = configs[entity];
  const items = data[entity];
  const selected = items[selectedIndex] ?? null;
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .map((item, index) => ({ item, index }))
      .filter(
        ({ item }) =>
          !q ||
          [
            text(item, config.title),
            text(item, config.key),
            text(item, "category"),
            text(item, "sector"),
          ]
            .join(" ")
            .toLowerCase()
            .includes(q),
      );
  }, [config, items, query]);

  async function loadData() {
    setDataSource("loading");
    const response = await fetch("/api/admin/data", { cache: "no-store" });
    const payload = await response.json();
    if (payload.ok && payload.data) {
      setData(payload.data);
      setDataSource(payload.source === "database" ? "database" : "files");
      if (payload.message) setMessage({ ok: true, text: payload.message });
    } else {
      setDataSource("files");
      setMessage({
        ok: false,
        text: payload.message ?? "Не удалось загрузить данные",
      });
    }
  }

  async function seedDatabase() {
    const response = await fetch("/api/admin/seed", { method: "POST" });
    const payload = await response.json();
    setMessage({
      ok: Boolean(response.ok && payload.ok),
      text:
        response.ok && payload.ok
          ? `Seed выполнен: ${payload.total} записей.`
          : (payload.message ?? "Seed не выполнен"),
    });
    if (response.ok && payload.ok) await loadData();
  }

  useEffect(() => {
    void fetch("/api/admin/session", { cache: "no-store" })
      .then(
        (r) =>
          r.json() as Promise<{
            authenticated: boolean;
            username?: string | null;
          }>,
      )
      .then(async (s) => {
        setLogged(s.authenticated);
        if (s.username) setUsername(s.username);
        if (s.authenticated) await loadData();
      })
      .catch(() => setLogged(false));
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
    setQuery("");
  }, [entity]);
  useEffect(() => {
    setJsonDraft(selected ? JSON.stringify(selected, null, 2) : "");
    setJsonError("");
  }, [entity, selectedIndex, selected]);

  function patch(patchItem: Item) {
    setData((current) => {
      const next = [...current[entity]];
      if (!next[selectedIndex]) return current;
      next[selectedIndex] = { ...next[selectedIndex], ...patchItem };
      return { ...current, [entity]: next };
    });
  }
  function replace(nextItem: Item) {
    setData((current) => {
      const next = [...current[entity]];
      if (!next[selectedIndex]) return current;
      next[selectedIndex] = nextItem;
      return { ...current, [entity]: next };
    });
  }
  function add() {
    setData((current) => ({
      ...current,
      [entity]: [config.make(), ...current[entity]],
    }));
    setSelectedIndex(0);
    setMessage({
      ok: true,
      text: "Добавлено. Отредактируй и нажми сохранить.",
    });
  }
  function remove() {
    setData((current) => ({
      ...current,
      [entity]: current[entity].filter((_, i) => i !== selectedIndex),
    }));
    setSelectedIndex(0);
    setMessage({
      ok: true,
      text: "Удалено из списка. Нажми сохранить, чтобы записать изменения.",
    });
  }
  function duplicate() {
    if (!selected) return;
    const copy = JSON.parse(JSON.stringify(selected)) as Item;
    copy[config.key] = `${text(selected, config.key)}-copy-${Date.now()}`;
    copy[config.title] = `${text(selected, config.title)} — копия`;
    setData((current) => ({
      ...current,
      [entity]: [copy, ...current[entity]],
    }));
    setSelectedIndex(0);
  }
  function change(field: Field, value: string) {
    if (field.type === "array") patch({ [field.key]: toLines(value) });
    else if (field.type === "number") patch({ [field.key]: Number(value) });
    else patch({ [field.key]: value });
  }
  function mapPoint(clientX: number, clientY: number) {
    if (entity !== "mapMarkers" || !mapRef.current) return;
    const r = mapRef.current.getBoundingClientRect();
    patch({
      x: Number(
        Math.max(
          0,
          Math.min(100, ((clientX - r.left) / r.width) * 100),
        ).toFixed(1),
      ),
      y: Number(
        Math.max(
          0,
          Math.min(100, ((clientY - r.top) / r.height) * 100),
        ).toFixed(1),
      ),
    });
  }

  async function login() {
    const response = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const payload = (await response.json()) as {
      ok?: boolean;
      message?: string;
    };
    if (!response.ok || !payload.ok)
      return setMessage({ ok: false, text: payload.message ?? "Ошибка входа" });
    setLogged(true);
    setPassword("");
    setMessage({ ok: true, text: "Вход выполнен" });
    await loadData();
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setLogged(false);
  }
  async function save() {
    const response = await fetch("/api/admin/save", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity, items }),
    });
    const payload = (await response.json()) as {
      ok?: boolean;
      message?: string;
      count?: number;
      storage?: "files" | "database";
    };
    if (payload.storage === "database") setDataSource("database");
    setMessage({
      ok: Boolean(response.ok && payload.ok),
      text:
        response.ok && payload.ok
          ? `Сохранено элементов: ${payload.count}. Хранилище: ${payload.storage === "database" ? "PostgreSQL" : "src/data"}.`
          : (payload.message ?? "Ошибка сохранения"),
    });
  }
  async function copy() {
    if (!selected) return;
    await navigator.clipboard.writeText(JSON.stringify(selected, null, 2));
    setMessage({ ok: true, text: "JSON скопирован" });
  }

  function renderField(field: Field) {
    if (!selected) return null;
    const cls =
      "w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-red-500/60";
    return (
      <label
        key={field.key}
        className="grid gap-2 text-sm font-bold text-zinc-400"
      >
        {field.label}
        {field.type === "textarea" ? (
          <textarea
            value={text(selected, field.key)}
            onChange={(e) => change(field, e.target.value)}
            rows={4}
            className={cls}
          />
        ) : field.type === "array" ? (
          <textarea
            value={lines(selected[field.key])}
            onChange={(e) => change(field, e.target.value)}
            rows={4}
            className={cls}
            placeholder="Каждая строка = отдельный пункт"
          />
        ) : field.type === "select" ? (
          <select
            value={text(selected, field.key)}
            onChange={(e) => change(field, e.target.value)}
            className={cls}
          >
            {(field.options ?? []).map((o) => (
              <option key={o} value={o}>
                {entity === "mapMarkers" && field.key === "category"
                  ? `${o} — ${mapLabels[o] ?? o}`
                  : o}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={field.type === "number" ? "number" : "text"}
            value={text(selected, field.key)}
            onChange={(e) => change(field, e.target.value)}
            className={cls}
          />
        )}
      </label>
    );
  }

  if (!logged)
    return (
      <section className="mx-auto max-w-2xl px-4 py-10">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-3xl font-black text-white">Вход в Admin Panel</h2>
          <p className="mt-3 text-sm text-zinc-400">
            Логин: Shadow. Пароль: 5623741.
          </p>
          <div className="mt-6 grid gap-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void login();
              }}
              className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white"
            />
            <button
              onClick={() => void login()}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 font-black text-white"
            >
              <LogIn size={18} /> Войти
            </button>
          </div>
          {message ? (
            <div
              className={`mt-4 rounded-2xl border p-4 text-sm ${message.ok ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100" : "border-red-500/30 bg-red-500/10 text-red-100"}`}
            >
              {message.text}
            </div>
          ) : null}
        </div>
      </section>
    );

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-10">
      <div className="grid gap-4 md:grid-cols-6">
        {(Object.keys(configs) as Entity[]).map((e) => (
          <button
            key={e}
            onClick={() => setEntity(e)}
            className={`rounded-3xl border p-5 text-left transition ${entity === e ? "border-red-500/40 bg-red-500/10" : "border-zinc-800 bg-zinc-950 hover:border-zinc-600"}`}
          >
            <div className="text-3xl font-black text-white">
              {data[e].length}
            </div>
            <div className="mt-1 text-sm font-bold text-zinc-400">
              {configs[e].label}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-4">
        <div className="text-sm text-zinc-400">
          <span className="inline-flex items-center gap-2">
            <Database size={16} /> Хранилище:{" "}
            <b className="text-white">
              {dataSource === "database"
                ? "PostgreSQL Render"
                : dataSource === "loading"
                  ? "Загрузка"
                  : "src/data fallback"}
            </b>
          </span>
          . При DATABASE_URL сохранение идёт в базу Render.
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => void loadData()}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-black px-4 py-2 text-sm font-bold text-zinc-300"
          >
            <RefreshCw size={16} /> Обновить
          </button>
          <button
            onClick={() => void seedDatabase()}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-200"
          >
            <UploadCloud size={16} /> Seed в БД
          </button>
          <button
            onClick={() => setData(initialData)}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-black px-4 py-2 text-sm font-bold text-zinc-300"
          >
            <RefreshCw size={16} /> Сбросить
          </button>
          <button
            onClick={() => void logout()}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-black px-4 py-2 text-sm font-bold text-zinc-300"
          >
            <LogOut size={16} /> Выйти
          </button>
        </div>
      </div>
      {message ? (
        <div
          className={`mt-4 flex gap-2 rounded-2xl border p-4 text-sm ${message.ok ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100" : "border-red-500/30 bg-red-500/10 text-red-100"}`}
        >
          {message.ok ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertTriangle size={18} />
          )}
          {message.text}
        </div>
      ) : null}
      <div className="mt-8 grid gap-6 xl:grid-cols-[360px_1fr]">
        <aside className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5">
          <label className="relative block">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              size={17}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Поиск: ${config.label}`}
              className="w-full rounded-2xl border border-zinc-800 bg-black px-11 py-3 text-sm text-white outline-none focus:border-red-500/60"
            />
          </label>
          <div className="mt-4 flex gap-2">
            <button
              onClick={add}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white"
            >
              <Plus size={16} /> Добавить
            </button>
            <button
              onClick={duplicate}
              className="rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm font-black text-zinc-300"
            >
              Копия
            </button>
          </div>
          <div className="mt-4 max-h-[650px] space-y-2 overflow-auto pr-1 custom-scrollbar">
            {filtered.map(({ item, index }) => (
              <button
                key={`${entity}-${index}-${text(item, config.key)}`}
                onClick={() => setSelectedIndex(index)}
                className={`w-full rounded-2xl border p-3 text-left ${index === selectedIndex ? "border-red-500/50 bg-red-500/10" : "border-zinc-800 bg-black/40 hover:border-zinc-600"}`}
              >
                <div className="font-black text-white">
                  {text(item, config.title) || "Без названия"}
                </div>
                <div className="mt-1 text-xs text-zinc-500">
                  {text(item, config.key)}
                </div>
              </button>
            ))}
          </div>
        </aside>
        <main className="space-y-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.25em] text-red-300">
                  {config.label}
                </div>
                <h2 className="mt-2 text-3xl font-black text-white">
                  {selected ? text(selected, config.title) : "Не выбрано"}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => void copy()}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-black px-4 py-2 text-sm font-bold text-zinc-300"
                >
                  <Copy size={16} /> JSON
                </button>
                <button
                  onClick={remove}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-200"
                >
                  <Trash2 size={16} /> Удалить
                </button>
                <button
                  onClick={() => void save()}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 text-sm font-black text-white"
                >
                  <Save size={16} /> Сохранить
                </button>
              </div>
            </div>
          </div>
          {entity === "mapMarkers" ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="mb-3 text-sm font-black text-white">
                Выбери маркер и перетащи его мышью
              </div>
              <div
                ref={mapRef}
                onPointerMove={(e) => {
                  if (dragging) mapPoint(e.clientX, e.clientY);
                }}
                onPointerUp={() => setDragging(false)}
                onPointerLeave={() => setDragging(false)}
                className="relative mx-auto aspect-square w-full max-w-[920px] overflow-hidden rounded-2xl border border-zinc-800 bg-black bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.22)), url('/images/scum-current-map.png')",
                }}
              >
                {data.mapMarkers.map((m, i) => (
                  <button
                    key={`${text(m, "id")}-${i}`}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      setSelectedIndex(i);
                      setDragging(true);
                    }}
                    className="group absolute z-20 h-8 w-8 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${Number(m.x ?? 50)}%`,
                      top: `${Number(m.y ?? 50)}%`,
                    }}
                  >
                    <span
                      className={`grid h-7 w-7 place-items-center rounded-full border-2 border-white text-black ${dot[String(m.category ?? "loot")] ?? dot.loot} ${selectedIndex === i ? "ring-4 ring-red-400/60" : ""}`}
                    >
                      <MapPin size={14} />
                    </span>
                    <span
                      className={`pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap rounded-xl border px-3 py-1.5 text-xs font-black ${selectedIndex === i ? "block border-red-400 bg-black text-white" : "hidden border-zinc-700 bg-black/80 text-zinc-200 group-hover:block"}`}
                    >
                      {text(m, "name")}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {selected ? (
            <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {config.fields.map((f) => (
                    <div
                      key={f.key}
                      className={
                        f.type === "textarea" || f.type === "array"
                          ? "md:col-span-2"
                          : ""
                      }
                    >
                      {renderField(f)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
                <div className="text-sm font-black uppercase tracking-[0.25em] text-red-300">
                  Расширенный JSON
                </div>
                <textarea
                  value={jsonDraft}
                  onChange={(e) => {
                    setJsonDraft(e.target.value);
                    try {
                      replace(JSON.parse(e.target.value) as Item);
                      setJsonError("");
                    } catch (err) {
                      setJsonError(
                        err instanceof Error ? err.message : "JSON ошибка",
                      );
                    }
                  }}
                  rows={26}
                  className="mt-4 w-full rounded-2xl border border-zinc-800 bg-black p-4 font-mono text-xs leading-5 text-zinc-100 outline-none focus:border-red-500/60"
                />
                {jsonError ? (
                  <div className="mt-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100">
                    {jsonError}
                  </div>
                ) : (
                  <div className="mt-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-100">
                    JSON валидный
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </section>
  );
}
