import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const url = req.nextUrl;
  const sessionToken =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  // Use getToken for local development, use cookies for production (Vercel)
  const session =
    process.env.NODE_ENV === "development"
      ? await getToken({ req, secret: process.env.AUTH_SECRET })
      : sessionToken;

  const protectedRoutes = ["/dashboard"];

  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
