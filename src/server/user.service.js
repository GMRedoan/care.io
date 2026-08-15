"use server";

import { authOptions } from "@/lib/AuthOption";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
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
        status: user.status,
        isVerified: user.isVerified
    };
};

export const updateUser = async (payload) => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }

        const result = await dbConnect(collections.USER).updateOne(
            { email: user.email },
            { $set: payload }
        );
        if (!result.modifiedCount && !result.matchedCount) {
            return {
                success: false,
                message: "Failed to update profile.",
            };
        }

        return {
            success: true,
            message: "User updated successfully",
        };

    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

export const getAllUsers = async () => {
    try {
        const users = await dbConnect(collections.USER).find({}).toArray();
        users.sort((a, b) => {
            if (a.role === b.role) return 0;
            return a.role === "admin" ? -1 : 1;
        });
        return {
            success: true,
            data: users,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}

export const updateUserStatus = async (id, status) => {
    try {
        const result = await dbConnect(collections.USER).updateOne(
            { _id: new ObjectId(id) },
            { $set: { status } }
        );
        return {
            success: true,
            message: "User status updated successfully",
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