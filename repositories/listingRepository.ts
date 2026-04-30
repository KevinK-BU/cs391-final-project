/*
Listing Repository
- A business logic file, this is just used to make calls to the database for listings
- Will be used for most CRUD operations with the "listings" collection
- made by Kevin Kupeli
*/

import { ObjectId } from "mongodb";
import { Listing, ListingInput } from "@/types/Listing";
import {getDb} from "@/lib/db";

export async function getListings(): Promise<Listing[]> {
    const db = await getDb();
    return await db.collection<Listing>("listings").find().toArray();
}
// Gets all listings from the database and returns them as an array


/*
Added section below -- Kristian Plonski
- added createListing() to insert a new listing into listings colection
- added updateListing() to update an existing listing by its mongodb _id
- now supports CRUB operations for creation and modifying posts
*/

export async function createListing(listing: ListingInput): Promise<Listing> {
    const db = await getDb();
    const result = await db.collection<ListingInput>("listings").insertOne(listing);

    return {
        _id: result.insertedId,
        ...listing, // takes all the properties from listing
    };
}

export async function updateListing(id: string, listing: ListingInput): Promise<Listing | null> {
    const db = await getDb();
    const objectId = new ObjectId(id);

    const result = await db.collection<Listing>("listings").findOneAndUpdate(
        { _id: objectId },
        { $set: listing }, //finds matching doc and replaces fields with new vals from listing
        { returnDocument: "after" }
    );

    return result;
}

export async function getListingById(id: string): Promise<Listing | null> {
    const db = await getDb();
    const objectId = new ObjectId(id);

    return await db.collection<Listing>("listings").findOne({ _id: objectId });
}


/* below this point added by Ibrahim Alburi: */
/* allows the listings API route to optionally filter results using a
user_id query parameter */
export async function getListingsByUserId(userId: string): Promise<Listing[]> {
    const db = await getDb();

    return await db
        .collection<Listing>("listings")
        .find({ user_id: userId })
        .toArray();
}
