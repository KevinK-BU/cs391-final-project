"use client"

import styled from 'styled-components';
import {useEffect, useState} from "react";
import {Listing} from "@/types/Listing";
import ListingGridView from "@/components/ListingGridView";

const ListingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
`;


export default function Home() {
    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        const fetchListings = async () => {
            const res = await fetch("/api/listings");
            const data = await res.json();
            setListings(data);
        };
        fetchListings();
    }, []);

    return (
        <ListingGrid>
            {listings.map(listing => (
                <ListingGridView
                    key={listing._id.toString()}
                    listing={listing}
                />
            ))}
        </ListingGrid>
    );
}
