import { Listing } from "@/types/Listing";
import styled from "styled-components";



interface ListingDetailViewProps {
    listing: Listing;
}

const StyledListingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50vh;
`

const StyledImage = styled.img`
    width: 45%;
    height: 100%;
    min-height: 100%;
    object-fit: cover;
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
    color: #ffffff;
`

const StyledListingDescription = styled.p`
    font-size: calc(1px + 1.45vw);
    padding-top: 5%;
    padding-bottom: 10%;
    padding-left: 2%;
    padding-right: 2%;
    background-color: #a3aeae;
    border-radius: 15px;
    border: 3px solid #849e9e;
    min-height: 65%;
    max-height: 65%;
`

const StyledListingPrice = styled.p`
    font-size: calc(1px + 1.7vw);
    position: absolute;
    bottom: 10%;
    background-color: #a3aeae;
    border-radius: 15px;
    border: 3px solid #849e9e;
`
const StyledMailTo = styled.a`
    background-color: #848a89;
    &:hover {
        background: #3d4851;
    }
    border-radius: 12px;
    width: 35%;
    position: absolute;
    bottom: 3%;  
    right: 3%;
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