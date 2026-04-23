import { NextResponse } from "next/server";
import { hashPassword, loginUser } from "@/lib/auth";
import {
    createUser,
    findUserByEmail,
    findUserByName,
} from "@/repositories/userRepository";

export async function POST(request: Request) {
    const body = await request.json();
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!name || !email || !password) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        return NextResponse.json({ error: "Email already exists." }, { status: 400 });
    }

    const existingName = await findUserByName(name);

    if (existingName) {
        return NextResponse.json({ error: "Username already exists." }, { status: 400 });
    }

    const user = await createUser({
        name,
        email,
        passwordHash: hashPassword(password),
        createdAt: new Date(),
    });

    await loginUser(user._id.toString());

    return NextResponse.json({
        name: user.name,
        email: user.email,
    });
}
