import { GlobalSearch } from "@/components/GlobalSearch";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Поиск по сайту SCUM | SCUM DB PRO",
  description: "Глобальный поиск по оружию, обвесам, луту, бункерам, карте, гайдам, транспорту и подготовке в SCUM DB PRO.",
};

export default function SearchPage() {
  return (
    <main>
      <PageHeader title="Поиск по всему сайту" description="Одна строка поиска для всей базы знаний: оружие, обвесы, лут, бункеры, карта, гайды, транспорт, подготовка и разделы сайта." />
      <GlobalSearch />
    </main>
  );
}
