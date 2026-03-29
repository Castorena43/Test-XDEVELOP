import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_ROUTES.includes(pathname);

  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (accessToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/users", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};