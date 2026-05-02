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
        description="Вход по логину и паролю, добавление и редактирование контента, сохранение в data-файлы и drag&drop маркеров карты."
      />
      <AdminPanelClient />
    </main>
  );
}
