/*
made by Kristian Plonski
- added a route for editing an existing listing using its _id
- added validation to make sure all required fields are included before update
- returns an error if listing doesnt exist
*/

import { NextResponse } from "next/server";
import { updateListing } from "@/repositories/listingRepository";
import { ListingInput } from "@/types/Listing";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function PATCH(request: Request, context: RouteContext) {
    const { id } = await context.params; //grabs id 
    const body = await request.json() as Partial<ListingInput>;

    if ( // if no title/desc/img/ etc..., return error 
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

    const updatedListing = await updateListing(id, {
        title: body.title,
        description: body.description,
        image: body.image,
        price: body.price,
        user_id: body.user_id,
        sellerEmail: body.sellerEmail,
    });

    if (!updatedListing) {
        return NextResponse.json(
            { error: "Listing not found." },
            { status: 404 }
        );
    }

    return NextResponse.json(updatedListing);
}
