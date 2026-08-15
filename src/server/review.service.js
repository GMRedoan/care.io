"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { getCurrentUser } from "./user.service";

export const createReview = async (payload) => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return {
                success: false,
                message: "Please login first to create a review",
            };
        }
        if(user.isVerified === false){
            return {
                success: false,
                message: "Please verify your email first",
            };
        }
        if(user.status === "blocked"){
            return {
                success: false,
                message: "Your account is blocked",
            };
        }
        const result = await dbConnect(collections.REVIEW).insertOne(payload);
        return {
            success: true,
            insertedId: result.insertedId.toString(),
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}