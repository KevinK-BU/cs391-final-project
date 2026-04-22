/*
Kristian Plonski changes:
- added reusable listing form component for creating/editting posts
- connected form to backed using POST to create and PATCH to edit
- !! temp inputs for userid and sellerEmail until auth is done !! TO CHANGE
*/

"use client";

import { FormEvent, useState } from "react";
import styled from "styled-components";
import { Listing, ListingInput } from "@/types/Listing";

const FormCard = styled.div`
    background: #f8fbff;
    border: 1px solid #c9d8e6;
    border-radius: 18px;
    padding: 24px;
    box-shadow: 0 12px 28px rgba(34, 62, 94, 0.12);
`;

const FormTitle = styled.h2`
    margin: 0 0 8px;
    font-size: 1.5rem;
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
    font-weight: 600;
`;

const Input = styled.input`
    border: 1px solid #b9cada;
    border-radius: 12px;
    padding: 12px 14px;
    font-size: 1rem;
    background: white;
    color: #10263c;
`;

const TextArea = styled.textarea`
    border: 1px solid #b9cada;
    border-radius: 12px;
    padding: 12px 14px;
    min-height: 120px;
    font-size: 1rem;
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
    font-weight: 600;

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
    font-weight: 600;

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
}

const emptyForm: ListingInput = {
    title: "",
    description: "",
    image: "",
    price: 0,
    user_id: "",
    sellerEmail: "",
};

function getInitialFormData(editingListing: Listing | null): ListingInput {
    if (!editingListing) {
        return emptyForm;
    }

    return {
        title: editingListing.title,
        description: editingListing.description,
        image: editingListing.image,
        price: editingListing.price,
        user_id: editingListing.user_id,
        sellerEmail: editingListing.sellerEmail,
    };
}

export default function ListingForm({
    editingListing,
    onCancelEdit,
    onSaved,
}: ListingFormProps) {
    const [formData, setFormData] = useState<ListingInput>(() => getInitialFormData(editingListing));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const isEditing = editingListing !== null;
            let endpoint = "/api/listings";
            let method = "POST";
            let saveMode: "create" | "edit" = "create";

            if (isEditing && editingListing) {
                endpoint = `/api/listings/${editingListing._id}`;
                method = "PATCH";
                saveMode = "edit";
            }

            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error ?? "Unable to save listing right now.");
                return;
            }

            onSaved(data, saveMode);

            if (!isEditing) {
                setFormData(emptyForm);
            }
        } catch {
            setError("Something went wrong while saving the listing.");
        } finally {
            setIsSubmitting(false);
        }
    }

    let formHeading = "Create a Listing";
    let formDescription = "Add a new item with its details so it appears on the marketplace.";
    let submitButtonText = "Create Listing";

    if (editingListing) {
        formHeading = "Edit Listing";
        formDescription = "Update your listing information and save the changes.";
        submitButtonText = "Save Changes";
    }

    if (isSubmitting) {
        submitButtonText = "Saving...";
    }

    return (
        <FormCard>
            <FormTitle>{formHeading}</FormTitle>
            <FormText>{formDescription}</FormText>

            <StyledForm onSubmit={handleSubmit}>
                <Label>
                    Title
                    <Input
                        value={formData.title}
                        onChange={(event) =>
                            setFormData({ ...formData, title: event.target.value })
                        }
                        placeholder="Vintage desk lamp"
                        required
                    />
                </Label>

                <Label>
                    Description
                    <TextArea
                        value={formData.description}
                        onChange={(event) =>
                            setFormData({ ...formData, description: event.target.value })
                        }
                        placeholder="Describe the item, condition, and anything important."
                        required
                    />
                </Label>

                <Label>
                    Image URL
                    <Input
                        value={formData.image}
                        onChange={(event) =>
                            setFormData({ ...formData, image: event.target.value })
                        }
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
                        value={formData.price}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                price: Number(event.target.value),
                            })
                        }
                        required
                    />
                </Label>

                <Label>
                    User ID
                    <Input
                        value={formData.user_id}
                        onChange={(event) =>
                            setFormData({ ...formData, user_id: event.target.value })
                        }
                        placeholder="temporary-user-1"
                        required
                    />
                </Label>

                <Label>
                    Seller Email
                    <Input
                        type="email"
                        value={formData.sellerEmail}
                        onChange={(event) =>
                            setFormData({ ...formData, sellerEmail: event.target.value })
                        }
                        placeholder="seller@example.com"
                        required
                    />
                </Label>

                {error && <ErrorText>{error}</ErrorText>}

                <ButtonRow>
                    <PrimaryButton type="submit" disabled={isSubmitting}>
                        {submitButtonText}
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
