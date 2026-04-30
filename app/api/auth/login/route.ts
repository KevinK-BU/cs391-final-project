import { NextResponse } from "next/server";
import { loginUser, passwordMatches } from "@/lib/auth";
import { findUserByEmail } from "@/repositories/userRepository";

// This api route handles login requests. Made by Connor

export async function POST(request: Request) {
    // Getting the headers and payload for the login request
    const body = await request.json();
    const email = body.email.trim().toLowerCase();
    const password = body.password;

    // Checks that they filled out the form properly
    if (!email || !password) {
        return NextResponse.json({ error: "Missing email or password." }, { status: 400 });
    }

    const user = await findUserByEmail(email);

    // Checks if the hashed entered password matches the one in the DB
    if (!user || !passwordMatches(password, user.passwordHash)) {
        return NextResponse.json({ error: "Invalid login." }, { status: 401 });
    }

    // If it does, then log them in
    await loginUser(user._id.toString());

    return NextResponse.json({
        name: user.name,
        email: user.email,
    });
}
