import { AdminPanelClient } from "@/components/AdminPanelClient";
import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "Admin Lite | SCUM DB PRO", description: "Локальная админ-панель SCUM DB PRO для подготовки JSON-черновиков оружия, лута, маркеров карты и гайдов без базы данных." };

export default function AdminPage() {
  return <main><PageHeader title="Admin Lite" description="Безопасная демо-админка для подготовки новых карточек оружия, лута, маркеров карты и гайдов. Работает без базы данных и не ломает деплой на Render." /><AdminPanelClient /></main>;
}
