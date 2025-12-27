import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

const ProtectedRoutes = ["/myreservation", "/checkout", "/admin"]

export default auth(async function middleware(req) {
    const session = req.auth
    const request = req as unknown as NextRequest
    const isLoggedIn = !!session?.user
    const role = session?.user?.role
    const { pathname } = request.nextUrl

    if( !isLoggedIn && ProtectedRoutes.some((route) => pathname.startsWith(route))){
        return NextResponse.redirect(new URL("/signin", request.url))
    }

    if(isLoggedIn && role !== "admin" && pathname.startsWith("/admin")){
        return NextResponse.redirect(new URL("/", request.url))
    } //non admin trying to access admin route

    if(isLoggedIn && pathname.startsWith("/signin")){
        return NextResponse.redirect(new URL("/", request.url))
    }

})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}