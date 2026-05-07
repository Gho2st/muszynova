import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

function basicAuth(request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const base64 = authHeader.split(" ")[1];
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const [user, pass] = decoded.split(":");

    const validUser = process.env.ADMIN_USER ?? "admin";
    const validPass = process.env.ADMIN_PASSWORD;

    if (!validPass) {
      return new NextResponse("ADMIN_PASSWORD nie jest ustawione w .env", {
        status: 500,
      });
    }

    if (user === validUser && pass === validPass) {
      return null; // auth ok
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Panel"' },
  });
}

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAdmin = /^(\/[a-z]{2})?\/restauracja\/admin(\/|$)/.test(pathname);

  if (isAdmin) {
    const authResponse = basicAuth(request);
    if (authResponse) return authResponse;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
