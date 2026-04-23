import { cookies } from "next/headers";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

// Meat and potatoes of auth. Uses the crypto library to hash
// passwords, create cookies, and handle basic auth functions/

const COOKIE_NAME = "userId";

// Uses hash functions from crypto to encrypt the password
export function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64).toString("hex");
    return `${salt}:${hash}`;
}

// Checks if the password matches another hash
export function passwordMatches(password: string, savedPassword: string) {
    const [salt, savedHash] = savedPassword.split(":");

    // Checks if each have values
    if (!salt || !savedHash) {
        return false;
    }

    // Hashs the entered password, and grabs the hash of the saved password
    const newHash = scryptSync(password, salt, 64);
    const oldHash = Buffer.from(savedHash, "hex");

    // Uses the crypto function to check if they are equal
    return timingSafeEqual(newHash, oldHash);
}

// Logs the user in
export async function loginUser(userId: string) {
    // Gets the user's cookies
    const cookieStore = await cookies();

    // Sets an auth cookie that lasts one day
    cookieStore.set(COOKIE_NAME, userId, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 86400,
    });
}

// Logs the user out by deleting the auth cookie
export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}


// Gets the userID from the cookie, used for checking user info
// in the /me route.
export async function getUserIdFromCookie() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME);

    if (!cookie) {
        return null;
    }

    return cookie.value;
}
