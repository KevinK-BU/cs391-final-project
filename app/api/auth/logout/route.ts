import { NextResponse } from "next/server";
import { logoutUser } from "@/lib/auth";

// This route.ts handles logouts. Just runs the logout function which
// deletes the auth cookie. Made by Connor

export async function POST() {
    await logoutUser();
    return NextResponse.json({ message: "Logged out." });
}
