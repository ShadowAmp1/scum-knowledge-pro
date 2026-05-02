import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "scum_admin_session";
const USER = process.env.ADMIN_USER || "Shadow";
const PASSWORD = process.env.ADMIN_PASSWORD || "5623741";
const SECRET = process.env.ADMIN_SESSION_SECRET || "scum-admin-dev-secret-change-me";

function sign(value: string) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("base64url");
}
function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}
export function checkAdminLogin(username: string, password: string) {
  return safeEqual(username, USER) && safeEqual(password, PASSWORD);
}
export function makeToken(username: string) {
  const payload = Buffer.from(JSON.stringify({ username, ts: Date.now() })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}
export function readToken(token?: string) {
  if (!token) return null;
  const [payload, hash] = token.split(".");
  if (!payload || !hash || !safeEqual(hash, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { username?: string; ts?: number };
    if (!data.username || !data.ts || Date.now() - data.ts > 1000 * 60 * 60 * 12) return null;
    return data;
  } catch { return null; }
}
export function getAdminSession() { return readToken(cookies().get(COOKIE)?.value); }
export function setAdminSession(token: string) {
  cookies().set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 12 });
}
export function clearAdminSession() {
  cookies().set(COOKIE, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
}
