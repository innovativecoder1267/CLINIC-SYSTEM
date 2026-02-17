import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Protect user dashboard
  if (pathname.startsWith("/userdashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // Protect admin dashboard
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/userdashboard/:path*", "/admin/:path*"],
};