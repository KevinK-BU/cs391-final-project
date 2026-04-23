import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
    const userId = request.cookies.get("userId")?.value;
    const isLoginPage = request.nextUrl.pathname === "/login";
    const isAuthRoute = request.nextUrl.pathname.startsWith("/api/auth");

    if (isAuthRoute) {
        return NextResponse.next();
    }

    if (!userId && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (userId && isLoginPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
