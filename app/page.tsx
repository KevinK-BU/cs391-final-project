/*
Kristian Plonski changes:
- added listing for homepage layout
- added state for editting a selected listing
- update page so new created or edited listings instantly show
*/

"use client"

import styled from 'styled-components';
import {useEffect, useState} from "react";
import {Listing} from "@/types/Listing";
import ListingGridView from "@/components/ListingGridView";
import ListingForm from "@/components/ListingForm"; //KP

const PageWrapper = styled.main`
    min-height: 100vh;
    padding: 28px;
    background: #edf3f8;
`;

const PageHeader = styled.div`
    margin-bottom: 24px;
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

const ContentLayout = styled.div`
    display: grid;
    grid-template-columns: minmax(320px, 380px) 1fr;
    gap: 24px;
    align-items: start;

    @media (max-width: 980px) {
        grid-template-columns: 1fr;
    }
`;

const ListingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
`;

const ListingSection = styled.section`
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid #d5e1ec;
    border-radius: 20px;
    padding: 20px;
`;

const SectionTitle = styled.h2`
    margin: 0 0 16px;
    color: #16324f;
`;

const EmptyState = styled.p`
    margin: 0;
    color: #52687d;
`;


export default function Home() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [editingListing, setEditingListing] = useState<Listing | null>(null);

    useEffect(() => {
        const fetchListings = async () => {
            const res = await fetch("/api/listings");
            const data = await res.json();
            setListings(data);
        };
        fetchListings();
    }, []);

    function handleSavedListing(savedListing: Listing, mode: "create" | "edit") {
        if (mode === "create") {
            setListings((currentListings) => [savedListing, ...currentListings]);
            return;
        }

        setListings((currentListings) =>
            currentListings.map((listing) =>
                listing._id.toString() === savedListing._id.toString() ? savedListing : listing
            )
        );
        setEditingListing(null);
    }

    return (
        <PageWrapper>
            <PageHeader>
                <Title>Simple Shop</Title>
                <Subtitle>
                    Browse the marketplace, create a new post, or edit an existing listing.
                </Subtitle>
            </PageHeader>

            <ContentLayout>
                <ListingForm
                    key={editingListing?._id.toString() ?? "create"}
                    editingListing={editingListing}
                    onCancelEdit={() => setEditingListing(null)}
                    onSaved={handleSavedListing}
                />

                <ListingSection>
                    <SectionTitle>Marketplace Listings</SectionTitle>
                    {listings.length === 0 ? (
                        <EmptyState>No listings found yet. Create the first one on the left.</EmptyState>
                    ) : (
                        <ListingGrid>
                            {listings.map(listing => (
                                <ListingGridView
                                    key={listing._id.toString()}
                                    listing={listing}
                                    onEdit={setEditingListing}
                                />
                            ))}
                        </ListingGrid>
                    )}
                </ListingSection>
            </ContentLayout>
        </PageWrapper>
    );
}
