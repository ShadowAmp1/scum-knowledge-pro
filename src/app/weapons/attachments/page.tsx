export const dynamic = "force-dynamic";

export const metadata = {
  title: "Обвесы SCUM | SCUM DB PRO",
  description: "Магазины, прицелы, глушители, фонарики и совместимое оружие в базе SCUM DB PRO.",
};

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AttachmentFilters } from "@/components/AttachmentFilters";
import { PageHeader } from "@/components/PageHeader";
import { attachmentCategories, getWeaponMatchStatus } from "@/data/attachments";
import { getAttachments } from "@/lib/content";

export default async function AttachmentsPage() {
  const attachments = await getAttachments();
  const matchedCount = attachments.filter((attachment) => getWeaponMatchStatus(attachment).hasMatches).length;

  return (
    <main>
      <PageHeader
        title="Обвесы"
        description="База магазинов, прицелов, фонариков, планок, глушителей и обвесов для лука с проверкой совместимости с оружием из нашей базы."
      />

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <Link href="/weapons" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-white">
          <ArrowLeft size={16} /> Назад к оружию
        </Link>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-white">{attachments.length}</div>
            <div className="mt-2 text-sm text-zinc-500">обвесов в базе</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-red-400">{attachmentCategories.length}</div>
            <div className="mt-2 text-sm text-zinc-500">категорий</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-emerald-400">{matchedCount}</div>
            <div className="mt-2 text-sm text-zinc-500">связаны с оружием в базе</div>
          </div>
        </div>
      </section>

      <AttachmentFilters attachments={attachments} />
    </main>
  );
}
