import { NextResponse } from "next/server";
import { createListing, getListings, getListingsByUserId } from "@/repositories/listingRepository";
import { ListingInput } from "@/types/Listing";
import { getUserIdFromCookie } from "@/lib/auth";
import { findUserById } from "@/repositories/userRepository";

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
    const userId = await getUserIdFromCookie();

    if (!userId) {
        return NextResponse.json(
            { error: "You must be logged in to create a listing." },
            { status: 401 }
        );
    }

    const user = await findUserById(userId);

    if (!user) {
        return NextResponse.json(
            { error: "User not found." },
            { status: 404 }
        );
    }

    if (
        !body.title ||
        !body.description ||
        !body.image ||
        typeof body.price !== "number"
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
        user_id: user._id.toString(),
        sellerEmail: user.email,
    });

    return NextResponse.json(createdListing, { status: 201 });
}
