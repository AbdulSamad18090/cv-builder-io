import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // Log the request URL and headers for debugging
  console.log("Request URL:", req.nextUrl.pathname);

  try {
    // Try getting the token with explicit options for production
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      secureCookie: process.env.VERCEL_ENV === "production",
      cookieName: process.env.NEXTAUTH_COOKIE_NAME || "next-auth.session-token",
    });

    console.log("Token exists:", !!token);

    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      if (!token) {
        console.log("No token found, redirecting to auth");
        return NextResponse.redirect(new URL("/auth", req.url));
      }
      console.log("Token valid, proceeding to dashboard");
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // Fallback to redirecting to auth page if there's an error
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
