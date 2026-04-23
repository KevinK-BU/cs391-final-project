import { NextResponse } from "next/server";
import { getUserIdFromCookie } from "@/lib/auth";
import { findUserById } from "@/repositories/userRepository";

export async function GET() {
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
