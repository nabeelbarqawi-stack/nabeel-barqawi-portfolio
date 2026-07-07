import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { SESSION_COOKIE } from "@/proxy";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function sign(value: string) {
  return createHmac("sha256", ADMIN_PASSWORD).update(value).digest("hex");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { password } = body as { password?: string };

  const providedBuf = Buffer.from(password || "");
  const expectedBuf = Buffer.from(ADMIN_PASSWORD);
  const valid = providedBuf.length === expectedBuf.length && timingSafeEqual(providedBuf, expectedBuf);

  if (!valid) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const expiry = String(Date.now() + SESSION_DURATION_MS);
  const token = `${expiry}.${sign(expiry)}`;

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
  return res;
}
