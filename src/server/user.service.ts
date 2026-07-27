"use server";

import { authOptions } from "@/lib/AuthOption";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

export const getCurrentUser = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return null;
    }

    const user = await dbConnect(collections.USER).findOne({
        email: session.user.email,
    });

    if (!user) {
        return null;
    }

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        contact: user.contact,
        nid: user.nid,
    };
};
