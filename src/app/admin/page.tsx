import Link from "next/link";
import { Activity } from "lucide-react";
import { AdminPanelClient } from "@/components/AdminPanelClient";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Admin Panel | SCUM DB PRO",
  description: "Админ-панель SCUM DB PRO с логином, редактированием оружия, обвесов, лута, гайдов и интерактивных маркеров карты.",
};

export default function AdminPage() {
  return (
    <main>
      <PageHeader
        title="Admin Panel"
        description="Вход по логину и паролю, добавление и редактирование контента, сохранение в PostgreSQL или fallback src/data, drag&drop маркеров карты."
      />

      <section className="mx-auto max-w-7xl px-4 pt-8">
        <Link
          href="/admin/status"
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm font-black text-emerald-100 transition hover:border-emerald-400/60 hover:bg-emerald-500/15"
        >
          <Activity size={16} /> Статус системы
        </Link>
      </section>

      <AdminPanelClient />
    </main>
  );
}
