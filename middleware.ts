import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const email = request.cookies.get("email")?.value;

  const pathname = request.nextUrl.pathname;

  // Allow login page without email
  if (pathname.startsWith("/dashboard/login")) {
    return NextResponse.next();
  }

  // If accessing /dashboard but no email cookie, redirect
  if (pathname.startsWith("/dashboard") && !email) {
    const loginUrl = new URL("/dashboard/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
