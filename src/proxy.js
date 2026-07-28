import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const protectedRoutes = [
    "/dashboard",
    "/booking",  
]

export async function proxy(request) {
    const { pathname, searchParams } = request.nextUrl;

    const decodedToken = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production"
     })
    const userRole = decodedToken?.role;

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const wantsLogin = searchParams.get("openLogin") === "true";

    // logged in user can not access login drawer
    if (decodedToken && wantsLogin) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // If the user is not logged in and the route is protected, redirect to the login drawer
    if (!decodedToken && isProtected) {
        return NextResponse.redirect(new URL("/?openLogin=true", request.url));
    }

    if(pathname.startsWith("/dashboard/user") && userRole !== "user") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    }else if(pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
    ]
}