import { FavoritesClient } from "@/components/FavoritesClient"; import { getContentData, withoutContentMeta } from "@/lib/content";
export const dynamic="force-dynamic"; export const metadata={title:"Избранное | SCUM DB PRO", description:"Личное избранное SCUM DB PRO."};
export default async function FavoritesPage(){const data=await getContentData(); return <FavoritesClient data={withoutContentMeta(data)}/>}
