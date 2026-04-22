import { ObjectId } from "mongodb";
// use this type to match the mongodb ids

/*
This file represents what a Listing is in the database, so we
can extract it as a type so we can display and manipulate the data
of a particular listing!

Made by Kevin Kupeli
 */


export type Listing = {
    _id: ObjectId,
    title: string,
    description: string,
    image: string,
    price: number,
    user_id: string,
}