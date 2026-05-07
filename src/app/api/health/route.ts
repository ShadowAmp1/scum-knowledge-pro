import { NextResponse } from "next/server";
import { dbQuery, hasDatabaseUrl } from "@/lib/database";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const startedAt = Date.now();
  const base = {
    ok: true,
    service: "scum-db-pro",
    timestamp: new Date().toISOString(),
    databaseConfigured: hasDatabaseUrl(),
  };

  if (!hasDatabaseUrl()) {
    return NextResponse.json({
      ...base,
      database: "not-configured",
      latencyMs: Date.now() - startedAt,
    });
  }

  try {
    await dbQuery("SELECT 1");
    return NextResponse.json({
      ...base,
      database: "ok",
      latencyMs: Date.now() - startedAt,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ...base,
        ok: false,
        database: "error",
        latencyMs: Date.now() - startedAt,
        message: error instanceof Error ? error.message : "Database check failed",
      },
      { status: 503 },
    );
  }
}
