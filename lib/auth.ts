import { cookies } from "next/headers";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const COOKIE_NAME = "userId";

export function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64).toString("hex");
    return `${salt}:${hash}`;
}

export function passwordMatches(password: string, savedPassword: string) {
    const [salt, savedHash] = savedPassword.split(":");

    if (!salt || !savedHash) {
        return false;
    }

    const newHash = scryptSync(password, salt, 64);
    const oldHash = Buffer.from(savedHash, "hex");

    if (newHash.length !== oldHash.length) {
        return false;
    }

    return timingSafeEqual(newHash, oldHash);
}

export async function loginUser(userId: string) {
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, userId, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
    });
}

export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getUserIdFromCookie() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME);

    if (!cookie) {
        return null;
    }

    return cookie.value;
}
