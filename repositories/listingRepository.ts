/*
Listing Repository
- A business logic file, this is just used to make calls to the database for listings
- Will be used for most CRUD operations with the "listings" collection
- made by Kevin Kupeli
*/

import { Listing } from "@/types/Listing";
import {getDb} from "@/lib/db";

export async function getListings(): Promise<Listing[]> {
    const db = await getDb();
    return await db.collection<Listing>("listings").find().toArray();
}
// Gets all listings from the database and returns them as an array