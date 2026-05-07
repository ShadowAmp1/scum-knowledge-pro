import Link from "next/link";
import { Activity, AlertTriangle, CheckCircle2, Clock3, Database, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { getAdminSession } from "@/lib/adminSession";
import { dbQuery, hasDatabaseUrl } from "@/lib/database";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Статус системы | SCUM DB PRO",
  description: "Проверка связки админка, PostgreSQL и публичный сайт SCUM DB PRO.",
};

type CountRow = {
  entity: string;
  count: string;
  latest_update: string | Date | null;
};

type AuditRow = {
  action: string;
  entity: string | null;
  key: string | null;
  username: string | null;
  created_at: string | Date;
};

type StatusData = {
  dbConfigured: boolean;
  dbOk: boolean;
  dbTime?: string;
  contentTotal: number;
  counts: CountRow[];
  logs: AuditRow[];
  error?: string;
};

const entityLabels: Record<string, string> = {
  weapons: "Оружие",
  attachments: "Обвесы",
  loot: "Лут",
  guides: "Гайды",
  mapMarkers: "Карта",
  missions: "Квесты",
};

function formatDate(value?: string | Date | null) {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(date);
}

async function loadStatus(): Promise<StatusData> {
  if (!hasDatabaseUrl()) {
    return {
      dbConfigured: false,
      dbOk: false,
      contentTotal: 0,
      counts: [],
      logs: [],
      error: "DATABASE_URL не задан. Сайт работает из src/data, изменения в PostgreSQL недоступны.",
    };
  }

  try {
    const ping = await dbQuery<{ now: string | Date }>("SELECT NOW() AS now");
    const countsResult = await dbQuery<CountRow>(
      `SELECT entity, COUNT(*)::text AS count, MAX(updated_at) AS latest_update
       FROM content_items
       GROUP BY entity
       ORDER BY entity ASC`,
    );
    const totalResult = await dbQuery<{ total: string }>(
      "SELECT COUNT(*)::text AS total FROM content_items",
    );
    const logsResult = await dbQuery<AuditRow>(
      `SELECT action, entity, key, username, created_at
       FROM admin_audit_log
       ORDER BY created_at DESC
       LIMIT 10`,
    );

    return {
      dbConfigured: true,
      dbOk: true,
      dbTime: formatDate(ping.rows[0]?.now),
      contentTotal: Number(totalResult.rows[0]?.total ?? 0),
      counts: countsResult.rows,
      logs: logsResult.rows,
    };
  } catch (error) {
    return {
      dbConfigured: true,
      dbOk: false,
      contentTotal: 0,
      counts: [],
      logs: [],
      error: error instanceof Error ? error.message : "Неизвестная ошибка PostgreSQL",
    };
  }
}

function Card({ title, value, description }: { title: string; value: string | number; description: string }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="text-sm font-black uppercase tracking-[0.25em] text-zinc-500">{title}</div>
      <div className="mt-3 text-3xl font-black text-white">{value}</div>
      <div className="mt-2 text-sm text-zinc-500">{description}</div>
    </div>
  );
}

export default async function AdminStatusPage() {
  const session = getAdminSession();
  const status = session ? await loadStatus() : null;

  return (
    <main>
      <PageHeader
        title="Статус системы"
        description="Контроль ядра SCUM DB PRO: админка → PostgreSQL → публичный сайт."
      />

      <section className="mx-auto max-w-7xl px-4 py-10">
        {!session ? (
          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6">
            <div className="flex items-center gap-3 text-xl font-black text-amber-200">
              <ShieldCheck size={24} /> Нужен вход в админ-панель
            </div>
            <p className="mt-3 text-zinc-300">
              Открой админку, войди под своим логином и вернись на эту страницу.
            </p>
            <Link href="/admin" className="mt-5 inline-flex rounded-full border border-amber-400/40 px-5 py-2 text-sm font-black text-amber-100 transition hover:bg-amber-400/10">
              Перейти в админку
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            <div className={`rounded-3xl border p-6 ${status?.dbOk ? "border-emerald-500/30 bg-emerald-500/10" : "border-red-500/30 bg-red-500/10"}`}>
              <div className="flex flex-wrap items-center gap-3 text-xl font-black text-white">
                {status?.dbOk ? <CheckCircle2 className="text-emerald-300" size={26} /> : <AlertTriangle className="text-red-300" size={26} />}
                {status?.dbOk ? "PostgreSQL подключен" : "PostgreSQL требует внимания"}
              </div>
              <p className="mt-3 text-sm text-zinc-300">
                {status?.dbOk
                  ? `База отвечает. Время БД: ${status.dbTime}. Данные публичных страниц берутся из content_items.`
                  : status?.error}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card title="DATABASE_URL" value={status?.dbConfigured ? "Задан" : "Нет"} description="Главная переменная подключения к PostgreSQL." />
              <Card title="Записей контента" value={status?.contentTotal ?? 0} description="Всего строк в таблице content_items." />
              <Card title="Последних логов" value={status?.logs.length ?? 0} description="Последние действия из admin_audit_log." />
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 flex items-center gap-2 text-xl font-black text-white"><Database size={22} /> Контент по разделам</div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="text-zinc-500">
                    <tr>
                      <th className="border-b border-zinc-800 py-3 pr-4">Раздел</th>
                      <th className="border-b border-zinc-800 py-3 pr-4">Entity</th>
                      <th className="border-b border-zinc-800 py-3 pr-4">Записей</th>
                      <th className="border-b border-zinc-800 py-3 pr-4">Последнее обновление</th>
                    </tr>
                  </thead>
                  <tbody>
                    {status?.counts.length ? status.counts.map((row) => (
                      <tr key={row.entity} className="text-zinc-300">
                        <td className="border-b border-zinc-900 py-3 pr-4 font-bold text-white">{entityLabels[row.entity] ?? row.entity}</td>
                        <td className="border-b border-zinc-900 py-3 pr-4 font-mono text-xs text-zinc-500">{row.entity}</td>
                        <td className="border-b border-zinc-900 py-3 pr-4">{row.count}</td>
                        <td className="border-b border-zinc-900 py-3 pr-4">{formatDate(row.latest_update)}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan={4} className="py-5 text-zinc-500">Записей пока нет. Выполни Seed в админке или `npm run db:seed`.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 flex items-center gap-2 text-xl font-black text-white"><Clock3 size={22} /> Последние действия админки</div>
              <div className="grid gap-3">
                {status?.logs.length ? status.logs.map((log, index) => (
                  <div key={`${log.created_at}-${index}`} className="rounded-2xl border border-zinc-800 bg-black p-4">
                    <div className="flex flex-wrap items-center gap-2 text-sm font-black text-white">
                      <Activity size={16} className="text-red-300" /> {log.action}
                      {log.entity ? <span className="rounded-full bg-zinc-900 px-2 py-1 text-xs text-zinc-400">{log.entity}</span> : null}
                    </div>
                    <div className="mt-2 text-xs text-zinc-500">
                      {formatDate(log.created_at)} · пользователь: {log.username ?? "system"}{log.key ? ` · key: ${log.key}` : ""}
                    </div>
                  </div>
                )) : <div className="text-zinc-500">Логов пока нет.</div>}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/admin" className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-black text-zinc-200 transition hover:border-red-400 hover:text-white">Назад в админку</Link>
              <Link href="/map" className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-black text-zinc-200 transition hover:border-red-400 hover:text-white">Проверить публичную карту</Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
