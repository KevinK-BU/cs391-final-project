import { NextResponse } from "next/server";
import { getListings } from "@/repositories/listingRepository";

export async function GET() {
    const listings = await getListings();
    return NextResponse.json(listings);
}