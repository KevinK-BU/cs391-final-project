import { ObjectId } from "mongodb";

// Type file for the user json

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
