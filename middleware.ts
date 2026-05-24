import { type NextRequest, NextResponse } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  isAdminConfigured,
  verifySessionToken,
} from "@/lib/admin/auth";
import { updateSession } from "@/lib/supabase/middleware";

function adminLoginPath(pathname: string) {
  return pathname === "/admin/login" || pathname.startsWith("/admin/login/");
}

function adminProtectedPath(pathname: string) {
  return pathname.startsWith("/admin") && !adminLoginPath(pathname);
}

function adminApiPublicPath(pathname: string) {
  return pathname === "/api/admin/login";
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (adminProtectedPath(pathname)) {
    if (!isAdminConfigured()) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!token || !(await verifySessionToken(token))) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname.startsWith("/api/admin") && !adminApiPublicPath(pathname)) {
    if (!isAdminConfigured()) {
      return NextResponse.json(
        { error: "Admin is not configured. Set ADMIN_PASSWORD on your host." },
        { status: 503 }
      );
    }

    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!token || !(await verifySessionToken(token))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets and images.
     */
    "/((?!_next/static|_next/image|favicon.ico|api/contact|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
