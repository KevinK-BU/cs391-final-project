import { NextResponse } from "next/server";
import { createListing, getListings, getListingsByUserId } from "@/repositories/listingRepository";
import { ListingInput } from "@/types/Listing";

export async function GET(request: Request) {

    // ----- Ibrahim's changes ------
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    // if user id exists in the url then fetch listings and return filtered listings.
    if (userId) {
        const userListings = await getListingsByUserId(userId);
        return NextResponse.json(userListings);
    }
    // ------------------------------

    const listings = await getListings();
    return NextResponse.json(listings);
}

/*
added section below -- Kristian Plonski
- kept exisitng route for fetching ALL listings
- added POST route so frontend can send new listing data to the backend
- added validation for required fields before saving to DB
*/

export async function POST(request: Request) {
    const body = await request.json() as Partial<ListingInput>;

    if (
        !body.title ||
        !body.description ||
        !body.image ||
        typeof body.price !== "number" ||
        !body.user_id ||
        !body.sellerEmail
    ) {
        return NextResponse.json(
            { error: "Missing one or more required listing fields." },
            { status: 400 }
        );
    }

    const createdListing = await createListing({
        title: body.title,
        description: body.description,
        image: body.image,
        price: body.price,
        user_id: body.user_id,
        sellerEmail: body.sellerEmail,
    });

    return NextResponse.json(createdListing, { status: 201 });
}
