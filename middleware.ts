import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth")
  const { pathname } = request.nextUrl

  // Auth routes that don't require authentication
  const authRoutes = ["/sign-in", "/sign-up", "/forgot-password"]

  // Routes that require authentication
  const protectedRoutes = ["/", "/chat", "/community", "/profile", "/settings"]

  // Check if the route is protected and user is not authenticated
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !authCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  // Check if the route is an auth route and user is authenticated
  if (authRoutes.includes(pathname) && authCookie) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If none of the conditions are met, continue with the request
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

