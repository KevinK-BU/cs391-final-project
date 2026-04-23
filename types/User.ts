import { ObjectId } from "mongodb";

export type User = {
    _id: ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
};

export type NewUser = {
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
};
