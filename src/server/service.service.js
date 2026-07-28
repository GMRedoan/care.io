"use server";

import { collections, dbConnect } from "@/lib/dbConnect";

export const getServices = async () => {
    try {
        const services = await dbConnect(collections.SERVICE).find({}).toArray();

        return JSON.parse(JSON.stringify(services));

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
};

export const getSingleService = async (slug) => {
    try {
        const service = await dbConnect(collections.SERVICE).findOne({ slug });

        return {
            ...service,
            _id: service._id.toString(),
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
};