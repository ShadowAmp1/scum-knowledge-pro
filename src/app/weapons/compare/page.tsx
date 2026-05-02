import { PageHeader } from "@/components/PageHeader";
import { WeaponCompareClient } from "@/components/WeaponCompareClient";

export const metadata = { title: "Сравнение оружия SCUM | SCUM DB PRO", description: "Сравнение оружия SCUM по роли, патронам, tier, рейтингу, билдам, плюсам, минусам и подходящим обвесам." };

export default function WeaponComparePage() {
  return <main><PageHeader title="Сравнение оружия" description="Выбери 2–3 оружия и сравни их по рейтингу, патронам, роли, билдам, плюсам, минусам, местам поиска и совместимым обвесам." /><WeaponCompareClient /></main>;
}
