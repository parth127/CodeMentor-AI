import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
    console.log("middleware called");
    // Check if the request is for a protected route
    const { pathname } = request.nextUrl;

    // Define protected routes
    const protectedRoutes = ['/chat'];
    const publicRoutes = ['/Login', '/register'];

    // Check if the user is trying to access a protected route
    if (protectedRoutes.includes(pathname)) {
        // Get the access token from the request cookies
        const token = request.cookies.get('accessToken'); // Check for the access token in cookies

        // If the token does not exist, redirect to the login page
        if (!token) {
            return NextResponse.redirect(new URL('/Login', request.url));
        }
    }

    // Check if the user is trying to access public routes while already logged in
    if (publicRoutes.includes(pathname)) {
        const token = request.cookies.get('accessToken'); // Check for the access token in cookies

        // If the token exists, redirect to the chat page
        if (token) {
            return NextResponse.redirect(new URL('/chat', request.url));
        }
    }

    // If the user is authenticated or accessing a public route, allow the request to continue
    return NextResponse.next();
}

// Specify which paths the middleware should run on
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
