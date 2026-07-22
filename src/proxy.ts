import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const SESSION_COOKIE = "admin_session";

// Reuses ADMIN_PASSWORD as the HMAC key — this is a single-admin internal
// tool, not a multi-user auth system, so a second secret buys nothing.
function sign(value: string) {
  return createHmac("sha256", ADMIN_PASSWORD || "").update(value).digest("hex");
}

export function isValidSession(cookieValue: string | undefined): boolean {
  if (!cookieValue || !ADMIN_PASSWORD) return false;
  const [expiry, signature] = cookieValue.split(".");
  if (!expiry || !signature) return false;
  if (Date.now() > Number(expiry)) return false;

  const expected = sign(expiry);
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(sigBuf, expectedBuf);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const authed = isValidSession(request.cookies.get(SESSION_COOKIE)?.value);

  if (!authed) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/invoices/:path*"],
};
