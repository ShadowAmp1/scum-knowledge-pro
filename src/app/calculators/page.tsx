import { PageHeader } from "@/components/PageHeader"; import { CalculatorsClient } from "@/components/CalculatorsClient";
export const metadata={title:"Калькуляторы SCUM | SCUM DB PRO",description:"Калькуляторы рейда, транспорта, торговли и боеприпасов для SCUM."};
export default function CalculatorsPage(){return <main><PageHeader eyebrow="Tools" title="Калькуляторы SCUM" description="Быстрые расчёты для рейда, транспорта, торговли и боеприпасов. Значения ориентировочные и зависят от сервера."/><CalculatorsClient/></main>}
