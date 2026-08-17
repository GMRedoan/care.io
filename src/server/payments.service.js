"use server"

import { collections, dbConnect } from "@/lib/dbConnect";
import { getCurrentUser } from "./user.service";

export const adminAllPayments = async () => {
    try {
        const result = (await dbConnect(collections.PAYMENT).find().toArray()).reverse();
        return {
            success: true,
            data: result,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        }       
    }
};

export const myPaymentHistory = async () => {
    try {
        const user = await getCurrentUser();
        const result = (await dbConnect(collections.PAYMENT).find({ userId: user.id }).toArray()).reverse();
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