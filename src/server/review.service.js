"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { getCurrentUser } from "./user.service";
import { ObjectId } from "mongodb";

export const createReview = async (payload) => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return {
                success: false,
                message: "Please login first to create a review",
            };
        }
        if(user.status === "blocked"){
            return {
                success: false,
                message: "Your account is blocked",
            };
        }
        const reviewData = {
      ...payload,
      userId: new ObjectId(user.id),
      userName: user.name,
      userEmail: user.email,
      createdAt: new Date(),
    };
        const result = await dbConnect(collections.REVIEW).insertOne(reviewData);
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

export const myReviews = async () => {
    try {
    const user = await getCurrentUser();
    const result = await dbConnect(collections.REVIEW).find({ userId: new ObjectId(user.id) }).toArray();
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
}