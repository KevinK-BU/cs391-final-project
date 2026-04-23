import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { NewUser, User } from "@/types/User";

export async function findUserByEmail(email: string) {
    const db = await getDb();
    return db.collection<User>("users").findOne({ email });
}

export async function findUserByName(name: string) {
    const db = await getDb();
    return db.collection<User>("users").findOne({ name });
}

export async function findUserById(id: string) {
    const db = await getDb();
    return db.collection<User>("users").findOne({ _id: new ObjectId(id) });
}

export async function createUser(user: NewUser) {
    const db = await getDb();
    const result = await db.collection<NewUser>("users").insertOne(user);

    return {
        _id: result.insertedId,
        ...user,
    };
}
