import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "PRO Roadmap | Roadmap SCUM DB PRO",
  description: "План развития SCUM DB PRO: контент, интерактивная карта, бункеры, оружие, лут, админ-панель, база данных, аккаунты, избранное и версии патчей.",
};

type RoadmapStatus = "done" | "progress" | "planned";

type RoadmapItem = {
  text: string;
  status: RoadmapStatus;
};

type RoadmapBlock = {
  title: string;
  items: RoadmapItem[];
};

const roadmap: RoadmapBlock[] = [
  {
    title: "Контент",
    items: [
      { text: "Карточки оружия, обвесов, лута и гайдов", status: "done" },
      { text: "Больше проверенных маршрутов фарма", status: "progress" },
      { text: "Разделение советов для PvE и PvP", status: "progress" },
    ],
  },
  {
    title: "Интерактивная карта",
    items: [
      { text: "Базовая карта SCUM с маркерами", status: "done" },
      { text: "Фильтры, поиск, риск и tier лута", status: "done" },
      { text: "Синхронизация изменений из админки", status: "done" },
      { text: "Точные координаты после ручной проверки", status: "progress" },
      { text: "Слои маркеров и пользовательские заметки", status: "progress" },
      { text: "Импорт/экспорт меток", status: "planned" },
    ],
  },
  {
    title: "Бункеры",
    items: [
      { text: "Обычные и заброшенные бункеры", status: "done" },
      { text: "Карты уровней и схемы", status: "done" },
      { text: "Отдельные маршруты соло/дуо", status: "progress" },
    ],
  },
  {
    title: "Оружие",
    items: [
      { text: "База оружия и обвесов", status: "done" },
      { text: "Сравнение оружия", status: "done" },
      { text: "Фильтр по совместимым обвесам", status: "done" },
      { text: "Больше билдов под стиль игры", status: "progress" },
    ],
  },
  {
    title: "Лут",
    items: [
      { text: "Карточки предметов и мест фарма", status: "done" },
      { text: "Списки хранить/продавать", status: "done" },
      { text: "Экономика продажи по серверам", status: "progress" },
    ],
  },
  {
    title: "Технические улучшения",
    items: [
      { text: "Поиск по всему сайту", status: "done" },
      { text: "SEO и адаптивность", status: "done" },
      { text: "PWA/offline режим", status: "planned" },
      { text: "Больше автотестов и визуальных проверок", status: "progress" },
    ],
  },
  {
    title: "Админ-панель",
    items: [
      { text: "Авторизация админа", status: "done" },
      { text: "CRUD оружия, обвесов, лута, карты и гайдов", status: "done" },
      { text: "Сохранение изменений в базу данных", status: "done" },
      { text: "Загрузка изображений и предпросмотр", status: "progress" },
    ],
  },
  {
    title: "База данных",
    items: [
      { text: "PostgreSQL", status: "done" },
      { text: "Seed-данные", status: "done" },
      { text: "Fallback на src/data", status: "done" },
      { text: "Версионирование контента", status: "progress" },
    ],
  },
  {
    title: "Аккаунты пользователей",
    items: [
      { text: "Профили", status: "planned" },
      { text: "Персональные настройки", status: "planned" },
      { text: "Синхронизация избранного", status: "planned" },
    ],
  },
  {
    title: "Избранное",
    items: [
      { text: "Сохранение оружия, лута, гайдов и бункеров", status: "done" },
      { text: "Личные маршруты", status: "progress" },
      { text: "Списки подготовки к рейду", status: "progress" },
    ],
  },
  {
    title: "Комментарии/заметки",
    items: [
      { text: "Заметки к маркерам", status: "progress" },
      { text: "Комментарии к гайдам", status: "planned" },
      { text: "Модерация пользовательского контента", status: "planned" },
    ],
  },
  {
    title: "Версии патчей SCUM",
    items: [
      { text: "Хронология изменений", status: "progress" },
      { text: "Пометки устаревших данных", status: "planned" },
      { text: "Сравнение механик по версиям", status: "planned" },
    ],
  },
];

const statusText: Record<RoadmapStatus, string> = {
  done: "Готово",
  progress: "В работе",
  planned: "Запланировано",
};

function StatusIcon({ status }: { status: RoadmapStatus }) {
  if (status === "done") {
    return (
      <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-emerald-300">
        <span className="absolute h-5 w-5 animate-ping rounded-full bg-emerald-400/40" />
        <CheckCircle2 className="relative h-5 w-5 drop-shadow-[0_0_10px_rgba(74,222,128,0.95)]" />
      </span>
    );
  }

  if (status === "progress") {
    return <Loader2 className="h-5 w-5 shrink-0 animate-spin text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.85)]" />;
  }

  return <Circle className="h-5 w-5 shrink-0 text-zinc-500" />;
}

function statusClass(status: RoadmapStatus) {
  if (status === "done") return "text-emerald-100";
  if (status === "progress") return "text-sky-100";
  return "text-zinc-400";
}

export default function RoadmapPage() {
  const total = roadmap.reduce((sum, block) => sum + block.items.length, 0);
  const done = roadmap.reduce((sum, block) => sum + block.items.filter((item) => item.status === "done").length, 0);
  const progress = roadmap.reduce((sum, block) => sum + block.items.filter((item) => item.status === "progress").length, 0);
  const percent = Math.round((done / total) * 100);

  return (
    <main>
      <PageHeader eyebrow="PRO Roadmap" title="Что добавить дальше" description="Roadmap для SCUM DB PRO: отмечаем готовые функции, показываем что сейчас в работе и что запланировано дальше." />

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-4 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 md:grid-cols-4">
          <div>
            <div className="text-3xl font-black text-white">{total}</div>
            <div className="text-sm text-zinc-500">всего задач</div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-400">{done}</div>
            <div className="text-sm text-zinc-500">готово</div>
          </div>
          <div>
            <div className="text-3xl font-black text-sky-400">{progress}</div>
            <div className="text-sm text-zinc-500">в работе</div>
          </div>
          <div>
            <div className="text-3xl font-black text-red-400">{percent}%</div>
            <div className="text-sm text-zinc-500">общий прогресс</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 rounded-3xl border border-zinc-800 bg-black/60 p-4 text-sm font-bold text-zinc-300">
          <span className="inline-flex items-center gap-2"><StatusIcon status="done" /> Готово</span>
          <span className="inline-flex items-center gap-2"><StatusIcon status="progress" /> В работе</span>
          <span className="inline-flex items-center gap-2"><StatusIcon status="planned" /> Запланировано</span>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 md:grid-cols-2 xl:grid-cols-3">
        {roadmap.map((block) => (
          <article key={block.title} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 transition hover:border-red-500/40 hover:bg-zinc-900/70">
            <h2 className="text-xl font-black text-white">{block.title}</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6">
              {block.items.map((item) => (
                <li key={item.text} className={`flex items-start gap-3 ${statusClass(item.status)}`} title={statusText[item.status]}>
                  <StatusIcon status={item.status} />
                  <span>
                    {item.text}
                    <span className="ml-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-500">{statusText[item.status]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="text-xl font-black text-white">Общий прогресс</h2>
            <span className="text-2xl font-black text-emerald-400">{percent}%</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full border border-zinc-800 bg-black">
            <div className="h-full rounded-full bg-[linear-gradient(135deg,rgba(74,222,128,0.95)_25%,rgba(34,197,94,0.65)_25%,rgba(34,197,94,0.65)_50%,rgba(74,222,128,0.95)_50%,rgba(74,222,128,0.95)_75%,rgba(34,197,94,0.65)_75%)] bg-[length:28px_28px] shadow-[0_0_24px_rgba(74,222,128,0.75)]" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </section>
    </main>
  );
}
