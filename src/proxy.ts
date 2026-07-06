import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

export function proxy(request: NextRequest) {
  const auth = request.headers.get("authorization");

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    console.error("[proxy] ADMIN_USERNAME/ADMIN_PASSWORD not set — denying /admin access");
    return unauthorized();
  }

  if (!auth?.startsWith("Basic ")) {
    return unauthorized();
  }

  const [user, pass] = atob(auth.slice(6)).split(":");
  if (user !== ADMIN_USERNAME || pass !== ADMIN_PASSWORD) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
