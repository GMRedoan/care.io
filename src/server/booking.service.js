"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { getCurrentUser } from "./user.service";
import { ObjectId } from "mongodb";

export const createBooking = async (payload) => {
    try {
        const currentUser = await getCurrentUser()
        const bookingCollection = dbConnect(collections.BOOKING);

        const result = await bookingCollection.insertOne({
            ...payload,
            userId: currentUser.id,
            userName: currentUser.name,
            userEmail: currentUser.email,
            userPhone: currentUser.contact,
            userNid: currentUser.nid,
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
 
export const getBookings = async () => {
    try {
        const user = await getCurrentUser();
        const bookingCollection = dbConnect(collections.BOOKING);
        const result = await bookingCollection.find({ userId: user.id }).toArray();
        return {
            success: true,
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
};

export const adminAllBookings = async () => {
    try {
        const bookingCollection = dbConnect(collections.BOOKING);
        const result = await bookingCollection.find().toArray();
        return {
            success: true,
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
};

export const updateBookingStatus = async (id, status) => {
    try {
        const bookingCollection = dbConnect(collections.BOOKING);
        const result = await bookingCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status } }
        );
        return {
            success: true,
            message: "Booking status updated successfully",
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}

export const deleteBooking = async (id) => {
    try {
        const bookingCollection = dbConnect(collections.BOOKING);
        const result = await bookingCollection.deleteOne({ _id: new ObjectId(id) });
        return {
            success: true,
            message: "Booking deleted successfully",
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}