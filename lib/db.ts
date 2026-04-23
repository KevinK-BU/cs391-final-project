/*

database file
- made by Kevin Kupeli
- simple file used to set up the database client so that functions and
other business logic can communicate with our MongoDB
- follows structure of mongo db initialization from labs 9 and 10
 */


import {Collection, Db, MongoClient} from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;

if(!MONGO_URI){
    throw new Error("Something is wrong with your key");
}

const DB_NAME = "ecommerce";


let client: MongoClient | null=null;
let db: Db | null=null;

async function connect(): Promise<Db> {
    // If `client` is not yet initialized, create a new MongoClient instance
    // and connect to MongoDB using the provided URI.
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    // Return the database instance for the specified database name.
    return client.db(DB_NAME);
}


export default async function getCollection(collectionName: string): Promise<Collection> {
    // If `db` is not yet initialized, call `connect` to establish the connection.
    if (!db) {
        db = await connect();
    }
    // Return the requested collection from the database.
    return db.collection(collectionName);
}
// exports our database as db so we can call it and perform CRUD operations

export async function getDb(): Promise<Db> {
    if (!db) {
        db = await connect();
    }
    return db;
}