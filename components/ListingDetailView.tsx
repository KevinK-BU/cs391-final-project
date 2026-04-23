/*
Kristian Plonski changes:
- replaced hardcoded email w real sellerEmail for each listing
- added edit button so a listing can go back to form for modification
*/

import { Listing } from "@/types/Listing";
import styled from "styled-components";

interface ListingDetailViewProps {
    listing: Listing;
    onEdit?: (listing: Listing) => void; 
    //KP - prop to receive onEdit function, if does, function is called w a listing
}

const StyledListingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 100%;

    @media (max-width: 900px) {
        flex-direction: column;
    }
`

const StyledImage = styled.img`
    min-width: 45%;
    max-width: 45%;
    min-height: 100%;
    border-radius: 12px 0 0 12px;
    box-shadow: #3a6d78 2px -1px 10px;

    @media (max-width: 900px) {
        min-width: 100%;
        max-width: 100%;
        max-height: 280px;
        object-fit: cover;
        border-radius: 12px 12px 0 0;
    }
`

const StyledListingInformation = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-top: 1%;
    margin-left: 3%;
    margin-right: 2%;
    padding: 0;
    position: relative;

    @media (max-width: 900px) {
        width: auto;
        margin: 20px;
        min-height: 320px;
    }
`

const StyledListingTitle = styled.h2`
    font-size: calc(1px + 2vw);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin-top: 1%;
    margin-left: 2%;
    font-weight: 600;
`

const StyledListingDescription = styled.p`
    font-size: calc(1px + 1.45vw);
    padding-top: 5%;
    padding-bottom: 10%;
`

const StyledListingPrice = styled.p`
    font-size: calc(1px + 1.7vw);
    padding-top: 30%;
    position: absolute;
    top: 55%;

    @media (max-width: 900px) {
        position: static;
        padding-top: 20px;
    }
`

const ButtonRow = styled.div`
    position: absolute;
    top: 90%;
    left: 0;
    right: 0;
    display: flex;
    gap: 12px;
    align-items: center;

    @media (max-width: 900px) {
        position: static;
        margin-top: 24px;
        flex-wrap: wrap;
    }
`

const StyledMailTo = styled.a`
    background-color: #848a89;
    &:hover {
        background: #3d4851;
    }
    border-radius: 12px;
    width: 35%;
    min-width: 160px;
    padding: 12px 14px;
    text-align: center;
    color: white;
`

const EditButton = styled.button`
    background-color: #16324f;
    color: white;
    border: none;
    border-radius: 12px;
    min-width: 140px;
    padding: 12px 14px;
    cursor: pointer;

    &:hover {
        background: #234c74;
    }
`

export default function ListingDetailView({ listing, onEdit }: ListingDetailViewProps) {
    return (
        <StyledListingWrapper>
            <StyledImage src={listing.image} alt="Listing image" />
            <StyledListingInformation>
                <StyledListingTitle>{listing.title}</StyledListingTitle>
                <StyledListingDescription>{listing.description}</StyledListingDescription>
                <StyledListingPrice>{"$ "+ listing.price + ".00"}</StyledListingPrice>
                <ButtonRow> 
                    <StyledMailTo href={"mailto:" + listing.sellerEmail}>Contact Seller</StyledMailTo>
                    {onEdit && (
                        <EditButton type="button" onClick={() => onEdit(listing)}>
                            Edit Listing
                        </EditButton>
                    )}
                </ButtonRow>
            </StyledListingInformation>
        </StyledListingWrapper>
    );
}
//Button Row makes link which goes to the sellers email clicking it opens 
//users default email app with the to field filled out - KP