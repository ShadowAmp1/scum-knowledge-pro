import { NextResponse } from "next/server";
import { getContentData, withoutContentMeta } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getContentData();
  return NextResponse.json({
    ok: true,
    source: data.__meta?.source ?? data._meta?.source ?? "database",
    message: data.__meta?.message ?? data._meta?.message ?? "Content loaded",
    data: withoutContentMeta(data),
  });
}
