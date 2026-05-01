import { InteractiveMap } from "@/components/InteractiveMap";
import { PageHeader } from "@/components/PageHeader";

export default function MapPage() {
  return (
    <main>
      <PageHeader
        title="Интерактивная карта"
        description="SCUM DB PRO v4: метки, поиск, фильтры, карточки точек, риск, tier лута и быстрые переходы в связанные разделы."
      />
      <InteractiveMap />
    </main>
  );
}
