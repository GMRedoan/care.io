"use server"

import { collections, dbConnect } from "@/lib/dbConnect";

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