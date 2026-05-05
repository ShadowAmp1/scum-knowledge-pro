import { DiscordAnnounceClient } from "@/components/DiscordAnnounceClient"; import { PageHeader } from "@/components/PageHeader";
export const metadata={title:"Discord интеграция | SCUM DB PRO",description:"Webhook-интеграция SCUM DB PRO для публикации обновлений в Discord."};
export default function DiscordPage(){return <main><PageHeader eyebrow="Discord" title="Discord-интеграция" description="Отправляй объявления о новых гайдах, квестах и обновлениях сайта через Discord webhook. Нужна переменная DISCORD_WEBHOOK_URL."/><DiscordAnnounceClient/></main>}
