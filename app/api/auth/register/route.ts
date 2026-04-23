import { NextResponse } from "next/server";
import { hashPassword, loginUser } from "@/lib/auth";
import { createUser, findUserByEmail, findUserByName } from "@/repositories/userRepository";

// This function handles registering users in the login page

export async function POST(request: Request) {

    // Creates variables based on the payload
    const body = await request.json();
    const name = body.name.trim();
    const email = body.email.trim().toLowerCase();
    const password = body.password;

    //Checks for missing fields
    if (!name || !email || !password) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const existingUser = await findUserByEmail(email);

    // Checks if email already exists
    if (existingUser) {
        return NextResponse.json({ error: "Email already exists." }, { status: 400 });
    }

    // Creates the user in the DB
    const user = await createUser({
        name,
        email,
        passwordHash: hashPassword(password),
        createdAt: new Date(),
    });

    // runs the loginUser function in auth.ts, which just creates the auth cookie
    await loginUser(user._id.toString());

    return NextResponse.json({
        name: user.name,
        email: user.email,
    });
}
