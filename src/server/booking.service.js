"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { getCurrentUser } from "./user.service";

export const createBooking = async (payload) => {
    try {
        const currentUser = await getCurrentUser()
        const bookingCollection = dbConnect(collections.BOOKING);

        const result = await bookingCollection.insertOne({
            ...payload,
            userId: currentUser.id,
            userName: currentUser.name,
            userEmail: currentUser.email,
            status: "pending",
            createdAt: new Date().toISOString()
        });

        return {
            success: true,
            insertedId: result.insertedId.toString(),
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }

};