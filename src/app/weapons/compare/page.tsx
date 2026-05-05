import { PageHeader } from "@/components/PageHeader";
import { WeaponCompareClient } from "@/components/WeaponCompareClient";
import { getContentData } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata = { title: "Сравнение оружия SCUM | SCUM DB PRO", description: "Сравнение оружия SCUM по роли, патронам, tier, рейтингу, билдам, плюсам, минусам и подходящим обвесам." };

export default async function WeaponComparePage() {
  const data = await getContentData();
  return <main><PageHeader title="Сравнение оружия" description="Выбери 2–3 оружия и сравни их по рейтингу, патронам, роли, билдам, плюсам, минусам, местам поиска и совместимым обвесам." /><WeaponCompareClient weapons={data.weapons} attachments={data.attachments} /></main>;
}
