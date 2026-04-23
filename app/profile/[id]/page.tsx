/*
Created by Ibrahim Alburi
PROFILE PAGE
this page displays:
1) username
2) listings posted by that user
*/
import styled from "styled-components";
import ListingGridView from "@/components/ListingGridView";
import { getListingsByUserId } from "@/repositories/listingRepository";
import { findUserById } from "@/repositories/userRepository";

const PageWrapper = styled.main`
    min-height: 100vh;
    padding: 28px;
    background: #edf3f8;
`;

const Title = styled.h1`
    margin: 0 0 8px;
    color: #16324f;
    font-size: 2.5rem;
`;

const Subtitle = styled.p`
    margin: 0;
    color: #52687d;
    font-size: 1rem;
`;

const ListingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
`;

// Shows the user name & listings
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

    return (
        <PageWrapper>
            <Title>{user?.name ?? "Unknown User"}'s Profile</Title>
            <Subtitle>Total Listings: {serializedListings.length}</Subtitle>
            <ListingGrid>
                {serializedListings.map((listing: any) => (
                    <ListingGridView
                        key={listing._id}
                        listing={listing}
                    />
                ))}
            </ListingGrid>
        </PageWrapper>
    );
}