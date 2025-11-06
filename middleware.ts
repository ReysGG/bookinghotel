import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const ProtectedRoutes = ["/myreservation", "/checkout", "/admin"]

export async function middleware(request:NextRequest) {
    const session = await auth()
    const isLoggedIn = !!session?.user
    const role = session?.user?.role
    const {pathname} = request.nextUrl

    if( !isLoggedIn && ProtectedRoutes.some((route) => pathname.startsWith(route))){
        return NextResponse.redirect(new URL("/signin", request.url))
    }

    if(isLoggedIn && role !== "admin" && pathname.startsWith("/admin")){
        return NextResponse.redirect(new URL("/", request.url))
    } //non admin trying to access admin route

    if(isLoggedIn && pathname.startsWith("/signin")){
        return NextResponse.redirect(new URL("/", request.url))
    }

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}