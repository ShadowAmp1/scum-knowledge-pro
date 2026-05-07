import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "scum_admin_session";
const USER = process.env.ADMIN_USER ?? "";
const PASS = process.env.ADMIN_PASSWORD ?? "";
const SECRET = process.env.ADMIN_SESSION_SECRET ?? "";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function isConfigured() {
  return Boolean(USER && PASS && SECRET);
}

function sign(value: string) {
  if (!SECRET) return "";
  return crypto.createHmac("sha256", SECRET).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export function checkAdminLogin(username: string, password: string) {
  if (!isConfigured()) return false;
  return safeEqual(username, USER) && safeEqual(password, PASS);
}

export function makeToken(username: string) {
  if (!isConfigured()) throw new Error("Admin auth environment variables are not configured");
  const payload = Buffer.from(JSON.stringify({ username, ts: Date.now() })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readToken(token?: string) {
  if (!token || !SECRET) return null;
  const [payload, hash] = token.split(".");
  if (!payload || !hash || !safeEqual(hash, sign(payload))) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { username?: string; ts?: number };
    if (!data.username || !data.ts || Date.now() - data.ts > SESSION_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

export function getAdminSession() {
  return readToken(cookies().get(COOKIE)?.value);
}

export function setAdminSession(token: string) {
  cookies().set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export function clearAdminSession() {
  cookies().set(COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
