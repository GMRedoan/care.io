import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const protectedRoutes = [
    "/dashboard",   
]

export async function middleware(request) {
    const pathname = request.nextUrl.pathname
    const sessionToken = request.cookies.get('next-auth.session-token')?.value

    const decodedToken = sessionToken ? await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET }) : null
    const userRole = decodedToken?.role;

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (!decodedToken && isProtected) {
        return NextResponse.redirect(new URL("/?openLogin=true", request.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
    ]
}