/*
Created by Ibrahim Alburi
PROFILE PAGE
this page displays:
1) username
2) listings posted by that user
*/

import ListingGridView from "@/components/ListingGridView";
import { getListingsByUserId } from "@/repositories/listingRepository";
import { findUserById } from "@/repositories/userRepository";
import { Listing } from "@/types/Listing";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id: userId } = await params;

    const [user, listings] = await Promise.all([
        findUserById(userId),
        getListingsByUserId(userId),
    ]);

    const serializedListings = listings.map((listing) => ({
        ...listing,
        _id: listing._id.toString(),
    }));
    let profileName = "Unknown User";

    if (user) {
        profileName = user.name;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>{profileName}&apos;s Profile</h1>
            <p>Total Listings: {serializedListings.length}</p>
            {serializedListings.map((listing: Listing) => (
                <ListingGridView
                    key={listing._id}
                    listing={listing} 
                />
            ))}
        </div>
    );
}
