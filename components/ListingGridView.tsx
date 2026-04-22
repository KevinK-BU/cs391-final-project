"use client"

import { useState } from "react";
import styled from 'styled-components';
import { Listing } from "@/types/Listing";
import ListingDetailView from "@/components/ListingDetailView";

const StyledButton = styled.button`
    padding: 20px;
    border: 2px solid red;
    background: yellow;
    cursor: pointer;

    &:hover {
        background: lime;
    }
`;

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
    background-color: #a3cef1;
    margin: 8%;
    height: 50%;
    width: 50%;
    border-radius: 12px;
    max-width: 40vw;
    position: relative;
`;

const CloseButton = styled.button`
    background: #848a89;
    color: white;
    border: none;
    padding: 1% 2%;
    border-radius: 12px;
    cursor: pointer;
    position: absolute;
    top: 90%;
    right: 88%;
    

    &:hover {
        background: #3d4851;
    }
`;

interface ListingGridViewProps {
    listing: Listing;
    onEdit: (listing: Listing) => void; // KP -- added for editting posts
}

export default function ListingGridView({ listing, onEdit }: ListingGridViewProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <StyledButton onClick={() => setShowModal(true)}>
                {listing.title}
            </StyledButton>

            {showModal && (
                <ModalOverlay>
                    <ModalContent>
                        <ListingDetailView listing={listing} onEdit={onEdit} />
                        <CloseButton onClick={() => setShowModal(false)}>
                            Close
                        </CloseButton>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
}
