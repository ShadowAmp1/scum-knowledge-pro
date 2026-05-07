export const dynamic = "force-dynamic";

export const metadata = { title: "Трекеры SCUM | SCUM DB PRO", description: "Quest tracker и loot tracker для SCUM DB PRO." };

import { LootTrackerClient } from "@/components/LootTrackerClient";
import { MissionTracker } from "@/components/MissionTracker";
import { PageHeader } from "@/components/PageHeader";
import { getContentData } from "@/lib/content";

export default async function TrackersPage() {
  const data = (await getContentData()) as any;
  return <main><PageHeader eyebrow="Trackers" title="Quest tracker + Loot tracker" description="Личные трекеры квестов и нужного лута. Данные списков читаются из базы сайта." /><MissionTracker missions={data.missions ?? []} /><LootTrackerClient lootItems={data.loot ?? []} /></main>;
}
