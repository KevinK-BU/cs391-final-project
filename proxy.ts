import { NextRequest, NextResponse } from "next/server";

// Using Next.js proxy file to handle fallbacks for unauthenticated users
// https://nextjs.org/docs/app/getting-started/proxy

export default function proxy(request: NextRequest) {
    // Gets the user cookie based on the userID
    const userIdCookie = request.cookies.get("userId");
    let userId: string | undefined;

    if (userIdCookie) {
        userId = userIdCookie.value;
    }

    // Checks which page the user is at
    const isLoginPage = request.nextUrl.pathname === "/login";
    const isAuthRoute = request.nextUrl.pathname.startsWith("/api/auth");

    // If authenticating, then let them auth
    if (isAuthRoute) {
        return NextResponse.next();
    }

    // If unauthenticated, and not at the login screen, force them there.
    if (!userId && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If authenticated and trying to access login page, just push them to home
    if (userId && isLoginPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// config function that shows which paths are affected by the proxy/middleware
// Using star matching for all paths
export const config = {
    matcher: ["/", "/login", "/profile/:path*"],
};
