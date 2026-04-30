
/*
This is the detailed view modal of a given listing!
- built by Kevin Kupeli
- the component will render when a listing is clicked, and will show the details of a listing
    - details:
    - price
    - listing title and description
    - item image
 */


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
    height: 100%;
    overflow: hidden;
    padding: 2%;

    @media (max-width: 1300px) {
        flex-direction: column;
        height: auto;
    }
`

// using "object-fit: cover;" so that user inputted images fully
// fit the size of the full pop-up component!
// got styling idea for object-fit from claude.ai

const StyledImage = styled.img`
    width: 50%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: #3a6d78 2px -1px 10px;

    @media (max-width: 1300px) {
        width: 100%;
        height: 500px;
        border-radius: 12px 12px 0 0;
    }
`
// using "object-fit: cover;" so that user inputted images fully
// fit the size of the full pop-up component!
// got styling idea for object-fit from claude.ai
// - Kevin Kupeli



const StyledListingInformation = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;                
    padding: 4% 3%;
    min-height: 0;          


    @media (max-width: 1300px) {
        width: auto;
        margin: 20px;
        min-height: 320px;
    }
`

const StyledListingTitle = styled.h2`
    font-size: calc(1px + 2vw);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 600;
    text-align: center;
`

const StyledListingDescription = styled.p`
    font-size: calc(1px + 1.45vw);
    padding-top: 5%;
    padding-bottom: 10%;
`

const StyledListingPrice = styled.p`
    font-size: calc(1px + 1.7vw);
    margin-top: 25px;
    @media (max-width: 1300px) {
        position: static;
        padding-top: 20px;
    }
`


const ButtonRow = styled.div`
    display: flex;
    justify-content: space-between;   /* left + right */
    align-items: center;
    gap: 12px;
    margin-top: 16px;
    flex-direction: row;
    
    @media (max-width: 1300px) {
        flex-direction: column;
    }
    
`
const Spacer = styled.div`flex: 1;`


const StyledMailTo = styled.a`
    background-color: #848a89;
    &:hover { background: #3d4851; }
    border-radius: 12px;
    flex: 1;                
    min-width: 120px;
    max-width: 48%;
    padding: 3%;
    text-align: center;
    color: white;
    text-decoration: none;
`

const EditButton = styled.button`
    background-color: #16324f;
    color: white;
    border: none;
    border-radius: 12px;
    flex: 1;
    min-width: 120px;
    max-width: 48%;
    padding: 3%;
    cursor: pointer;
    &:hover { background: #234c74; }
`

export default function ListingDetailView({ listing, onEdit }: ListingDetailViewProps) {
    let priceString = listing.price.toString();
    const price = listing.price
    const dollars = Math.floor(price);
    const cents = Math.round((price - dollars) * 100);
    const centsString = cents < 10 ? "0" + cents : "" + cents;
    priceString = dollars + "." + centsString;
    return (
        <StyledListingWrapper>
            <StyledImage src={listing.image} alt="Listing image" />
            <StyledListingInformation>
                <StyledListingTitle>{listing.title}</StyledListingTitle>
                <StyledListingDescription>{listing.description}</StyledListingDescription>
                <Spacer />
                <StyledListingPrice>{"$ " + priceString}</StyledListingPrice>
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
