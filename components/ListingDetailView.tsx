import { Listing } from "@/types/Listing";
import styled from "styled-components";



interface ListingDetailViewProps {
    listing: Listing;
}

const StyledListingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 100%;
`

const StyledImage = styled.img`
    min-width: 45%;
    max-width: 45%;
    min-height: 100%;
    border-radius: 12px 0 0 12px;
    box-shadow: #3a6d78 2px -1px 10px;

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
`
const StyledMailTo = styled.a`
    background-color: #848a89;
    &:hover {
        background: #3d4851;
    }
    border-radius: 12px;
    width: 35%;
    position: absolute;
    top: 90%;
    left: 60%;
    padding: 2.3% 1%;
    text-align: center;
    height: 7.5%;
    
    
`

const getUserEmailFromID = (id: string) => {
    return "johndoe@gmail.com"
}

export default function ListingDetailView({ listing }: ListingDetailViewProps) {
    const email = getUserEmailFromID(listing._id.toString());

    return (
        <StyledListingWrapper>
            <StyledImage src={listing.image} alt="Listing image" />
            <StyledListingInformation>
                <StyledListingTitle>{listing.title}</StyledListingTitle>
                <StyledListingDescription>{listing.description}</StyledListingDescription>
                <StyledListingPrice>{"$ "+ listing.price + ".00"}</StyledListingPrice>
                <StyledMailTo href={"mailto:" + email}>Contact Seller</StyledMailTo>
            </StyledListingInformation>
        </StyledListingWrapper>
    );
}