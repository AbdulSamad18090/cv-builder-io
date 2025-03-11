import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function middleware(req) {
  const session = await getServerSession();
  console.log("Session:", !!session);
  
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }
  return NextResponse.next();
}