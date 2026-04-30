/*
made by Kristian Plonski
- added a route for editing an existing listing using its _id
- added validation to make sure all required fields are included before update
- returns an error if listing doesnt exist
*/

import { NextResponse } from "next/server";
import { getListingById, updateListing } from "@/repositories/listingRepository";
import { ListingInput } from "@/types/Listing";
import { getUserIdFromCookie } from "@/lib/auth";
import { findUserById } from "@/repositories/userRepository";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function PUT(request: Request, context: RouteContext) {
    const { id } = await context.params; //grabs id 
    const body = await request.json() as Partial<ListingInput>;
    const userId = await getUserIdFromCookie();

    if (!userId) {
        return NextResponse.json(
            { error: "You must be logged in to edit a listing." },
            { status: 401 }
        );
    }

    const existingListing = await getListingById(id);

    if (!existingListing) {
        return NextResponse.json(
            { error: "Listing not found." },
            { status: 404 }
        );
    }

    if (existingListing.user_id !== userId) {
        return NextResponse.json(
            { error: "You can only edit your own listings." },
            { status: 403 }
        );
    }

    const user = await findUserById(userId);

    if (!user) {
        return NextResponse.json(
            { error: "User not found." },
            { status: 404 }
        );
    }

    if ( // if no title/desc/img/ etc..., return error 
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

    const updatedListing = await updateListing(id, {
        title: body.title,
        description: body.description,
        image: body.image,
        price: body.price,
        user_id: userId,
        sellerEmail: user.email,
    });

    if (!updatedListing) {
        return NextResponse.json(
            { error: "Listing not found." },
            { status: 404 }
        );
    }

    return NextResponse.json(updatedListing);
}
