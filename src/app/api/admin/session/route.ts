import { NextResponse } from "next/server";
import { checkAdminLogin, clearAdminSession, getAdminSession, makeToken, setAdminSession } from "@/lib/adminSession";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = getAdminSession();
  return NextResponse.json({ authenticated: Boolean(session), username: session?.username ?? null });
}
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { username?: string; password?: string } | null;
  const username = String(body?.username ?? "").trim();
  const password = String(body?.password ?? "");
  if (!checkAdminLogin(username, password)) return NextResponse.json({ ok: false, message: "Неверный логин или пароль" }, { status: 401 });
  setAdminSession(makeToken(username));
  return NextResponse.json({ ok: true, username });
}
export async function DELETE() {
  clearAdminSession();
  return NextResponse.json({ ok: true });
}
