import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const {auth} = NextAuth(authConfig);

const middleware = async (request: NextRequest) => {
    const {pathname} = request.nextUrl;
    const session = await auth();
    const isAuthenticated = !!session?.user;
    
    // Debug
    //console.log(isAuthenticated, pathname);

    const protectedPaths = ["/settings", "/quiz", "/matches"];

    if (!isAuthenticated && protectedPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/settings/:path*', '/quiz/:path*', '/matches/:path*']
};

export default middleware;