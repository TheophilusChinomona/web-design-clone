import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected paths check
  const isDashboardRoute = pathname.startsWith("/app/t/");
  const sessionToken = request.cookies.get("fc_session")?.value;

  // If user visits /app while logged in, redirect them directly to their team dashboard
  if (pathname === "/app" && sessionToken) {
    return NextResponse.redirect(new URL("/app/t/25bMf9wr6oN", request.url));
  }

  // Allow next response by default
  const response = NextResponse.next();

  // Add security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export const config = {
  matcher: ["/app/:path*", "/api/v1/:path*"],
};
