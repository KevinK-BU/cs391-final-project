/*
Kristian Plonski changes:
- added reusable listing form component for creating/editting posts
- connected form to backed using POST to create and PATCH to edit
- !! temp inputs for userid and sellerEmail until auth is done !! TO CHANGE
*/

"use client";

import { FormEvent, useState } from "react";
import styled from "styled-components";
import { Listing } from "@/types/Listing";

const FormCard = styled.div`
    background: #f8fbff;
    border: 1px solid #c9d8e6;
    border-radius: 18px;
    padding: 24px;
`;

const FormTitle = styled.h2`
    margin: 0 0 8px;
    font-size: 24px;
    color: #16324f;
`;

const FormText = styled.p`
    margin: 0 0 20px;
    color: #4f6478;
`;

const StyledForm = styled.form`
    display: grid;
    gap: 14px;
`;

const Label = styled.label`
    display: grid;
    gap: 6px;
    color: #16324f;
    font-weight: bold;
`;

const Input = styled.input`
    border: 1px solid #b9cada;
    border-radius: 12px;
    padding: 12px 14px;
    font-size: 16px;
    background: white;
    color: #10263c;
`;

const TextArea = styled.textarea`
    border: 1px solid #b9cada;
    border-radius: 12px;
    padding: 12px 14px;
    min-height: 120px;
    font-size: 16px;
    resize: vertical;
    background: white;
    color: #10263c;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;
`;

const PrimaryButton = styled.button`
    border: none;
    border-radius: 999px;
    padding: 12px 18px;
    background: #16324f;
    color: white;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background: #234c74;
    }
`;

const SecondaryButton = styled.button`
    border: 1px solid #b9cada;
    border-radius: 999px;
    padding: 12px 18px;
    background: white;
    color: #16324f;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background: #edf4fb;
    }
`;

const ErrorText = styled.p`
    margin: 0;
    color: #b42318;
    font-weight: 600;
`;

interface ListingFormProps {
    editingListing: Listing | null;
    onCancelEdit: () => void;
    onSaved: (listing: Listing, mode: "create" | "edit") => void;
    currentUserId: string;
    currentUserEmail: string;
}

export default function ListingForm({
    editingListing, onCancelEdit, onSaved, currentUserId, currentUserEmail,}: ListingFormProps) {
    const [title, setTitle] = useState(editingListing ? editingListing.title : "");
    const [description, setDescription] = useState(editingListing ? editingListing.description : "");
    const [image, setImage] = useState(editingListing ? editingListing.image : "");
    const [price, setPrice] = useState(editingListing ? editingListing.price : 0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            if (!currentUserId || !currentUserEmail) {
                setError("You must be logged in to create or edit a listing.");
                return;
            }

            const isEditing = editingListing !== null;
            let endpoint = "/api/listings";
            let method = "POST";
            let saveMode: "create" | "edit" = "create";

            if (isEditing && editingListing) {
                endpoint = `/api/listings/${editingListing._id}`;
                method = "PUT";
                saveMode = "edit";
            }

            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    image: image,
                    price: Number(price),
                    user_id: currentUserId,
                    sellerEmail: currentUserEmail,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error ?? "Unable to save listing right now.");
                return;
            }

            onSaved(data, saveMode);

            if (!isEditing) {
                setTitle("");
                setDescription("");
                setImage("");
                setPrice(0);
            }
        } catch {
            setError("Something went wrong while saving the listing.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <FormCard>
            <FormTitle>{editingListing ? "Edit Listing" : "Create a Listing"}</FormTitle>
            <FormText>
                {editingListing
                    ? "Update your listing information and save the changes."
                    : "Add a new item with its details so it appears on the marketplace."}
            </FormText>

            <StyledForm onSubmit={handleSubmit}>
                <Label>
                    Title
                    <Input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Vintage desk lamp"
                        required
                    />
                </Label>

                <Label>
                    Description
                    <TextArea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Describe the item, condition, and anything important."
                        required
                    />
                </Label>

                <Label>
                    Image URL
                    <Input
                        value={image}
                        onChange={(event) => setImage(event.target.value)}
                        placeholder="https://example.com/item.jpg"
                        required
                    />
                </Label>

                <Label>
                    Price
                    <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={price}
                        onChange={(event) => setPrice(Number(event.target.value))}
                        required
                    />
                </Label>

                {error && <ErrorText>{error}</ErrorText>}

                <ButtonRow>
                    <PrimaryButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : editingListing ? "Save Changes" : "Create Listing"}
                    </PrimaryButton>

                    {editingListing && (
                        <SecondaryButton type="button" onClick={onCancelEdit}>
                            Cancel Edit
                        </SecondaryButton>
                    )}
                </ButtonRow>
            </StyledForm>
        </FormCard>
    );
}
