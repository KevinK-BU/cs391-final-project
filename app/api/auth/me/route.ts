import { NextResponse } from "next/server";
import { getUserIdFromCookie } from "@/lib/auth";
import { findUserById } from "@/repositories/userRepository";

// Gets the current user info. Used for organizing info by user like profiles and posts. Made by Connor

export async function GET() {

    // Fairly straightforward. Grabs user ID, then returns their DB info.

    const userId = await getUserIdFromCookie();

    if (!userId) {
        return NextResponse.json({ user: null });
    }

    const user = await findUserById(userId);

    if (!user) {
        return NextResponse.json({ user: null });
    }

    return NextResponse.json({
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        },
    });
}
