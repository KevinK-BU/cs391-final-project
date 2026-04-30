/*
Listing Grid View Component

built by Kevin Kupeli
these components will be rendered for every listing, and in a larger grid
on the homescreen, will show a simplified version of the listing!

 */

"use client"

import { useState } from "react";
import styled from 'styled-components';
import { Listing } from "@/types/Listing";
import ListingDetailView from "@/components/ListingDetailView";

const StyledButton = styled.button`
    background-color: #16324F;
    border: 3px solid #0b2237;
    padding: 2%;
    cursor: pointer;
    border-radius: 8px;
    height: 350px;

    &:hover {
        background: #52687d;
    }
`;

const StyledTitle = styled.h2`
    color: white;
    font-weight: bold;
    padding: 1%;
`

const StyledImage= styled.img`
    max-height: 225px;
    
    margin: 0 auto;
    border-radius: 8px;
    border: 3px solid lightgrey;
`

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: #16324F;
    border: 3px solid #0b2237;
    margin: 8%;
    height: 60%;
    width: 80vw;
    border-radius: 12px;
    max-width: 40vw;
    display: flex;
    flex-direction: column;

    @media (max-width: 1300px) {
        width: 90%;
        max-width: 90vw;
        height: auto;
        max-height: 85vh;
        overflow-y: auto;
        margin: 5%;
    }
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 10px 12px 0 12px;
    flex-shrink: 0;
`;

const CloseButton = styled.button`
    background: #848a89;
    color: white;
    border: none;
    padding: 6px 14px;
    border-radius: 12px;
    cursor: pointer;

    &:hover {
        background: #3d4851;
    }
`;


interface ListingGridViewProps {
    listing: Listing;
    onEdit?: (listing: Listing) => void; // KP -- added for editting posts
}

export default function ListingGridView({ listing, onEdit }: ListingGridViewProps) {
    const [showModal, setShowModal] = useState(false);
    // this use state is a true false state that will be used to conditionally render a given listing's detailed view
    let priceString = listing.price.toString();
    const price = listing.price
    const dollars = Math.floor(price);
    const cents = Math.round((price - dollars) * 100);
    const centsString = cents < 10 ? "0" + cents : "" + cents;
    priceString = dollars + "." + centsString;
    return (
        <>
            <StyledButton onClick={() => setShowModal(true)}>
                <StyledImage src={listing.image} alt={listing.title}/>
                <StyledTitle>
                    {listing.title}
                </StyledTitle>
                {'$' + priceString}
            </StyledButton>

            {showModal && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            <CloseButton onClick={() => setShowModal(false)}>Close</CloseButton>
                        </ModalHeader>
                        <ListingDetailView listing={listing} onEdit={onEdit} />
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
}
