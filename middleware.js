import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const intlMiddleware = createMiddleware(routing);
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function checkAdminSession(request) {
  const token = request.cookies.get("admin_session")?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role === "ADMIN";
  } catch {
    return false;
  }
}

export default async function middleware(request) {
  const { pathname } = request.nextUrl;

  // /admin lub /xx/admin (ale NIE /admin/login)
  const isAdmin = /^(\/[a-z]{2})?\/admin(\/|$)/.test(pathname);
  const isAdminLogin = /^(\/[a-z]{2})?\/admin\/login(\/|$)?$/.test(pathname);

  if (isAdmin && !isAdminLogin) {
    const ok = await checkAdminSession(request);
    if (!ok) {
      // przekierowanie na login - zachowujemy locale jeśli jest w URL
      const localeMatch = pathname.match(/^\/([a-z]{2})\//);
      const locale = localeMatch ? `/${localeMatch[1]}` : "";
      return NextResponse.redirect(
        new URL(`${locale}/admin/login`, request.url),
      );
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
