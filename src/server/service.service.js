"use server";

import { collections, dbConnect } from "@/lib/dbConnect";

export const getServices = async () => {
    const services = await dbConnect(collections.SERVICE).find({}).toArray();
    
    return JSON.parse(JSON.stringify(services));
};

export const getSingleService = async (slug) => {
    const service = await dbConnect(collections.SERVICE).findOne({slug});

    return {
        ...service,
        _id: service._id.toString(),
    };
};