import { PageHeader } from "@/components/PageHeader"; import { ProfileDashboardClient } from "@/components/ProfileDashboardClient";
export const metadata={title:"Личный кабинет | SCUM DB PRO",description:"Личный кабинет игрока SCUM."};
export default function ProfilePage(){return <main><PageHeader eyebrow="Profile" title="Личный кабинет игрока" description="Локальный профиль для стиля игры, сервера, сектора базы и заметок."/><ProfileDashboardClient/></main>}
