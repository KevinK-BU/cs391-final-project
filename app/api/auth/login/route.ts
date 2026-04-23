import { NextResponse } from "next/server";
import { loginUser, passwordMatches } from "@/lib/auth";
import { findUserByEmail } from "@/repositories/userRepository";

export async function POST(request: Request) {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
        return NextResponse.json({ error: "Missing email or password." }, { status: 400 });
    }

    const user = await findUserByEmail(email);

    if (!user || !passwordMatches(password, user.passwordHash)) {
        return NextResponse.json({ error: "Invalid login." }, { status: 401 });
    }

    await loginUser(user._id.toString());

    return NextResponse.json({
        name: user.name,
        email: user.email,
    });
}
