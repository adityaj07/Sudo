import { NextResponse } from "next/server";

export async function middleware(request: NextResponse) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.error("Token missing");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/blog/:path*",
    "/edit/:path*",
    "/write/:path*",
    "/profile/:path*",
  ],
};
