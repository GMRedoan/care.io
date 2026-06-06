"use server"

import { collections, dbConnect } from "@/lib/dbConnect"
import Swal from "sweetalert2"
import bcryptjs from 'bcryptjs'
import { createUserSchema } from "@/validation/auth.schema";


export const postUser = async (payload) => {
    const validation = createUserSchema.safeParse(payload);

    if (!validation.success) {
             Swal.fire({
                title: "Error",
                text: "Validation failed. Please check your input.",
                icon: "error",
                confirmButtonColor: "#11B2ED"
            });
        return null
    }

const { name, email, password, nid, contact } = validation.data;

const isExist = await dbConnect(collections.USER).findOne({ email });

if (isExist) {
    return {
        success: false,
        message: "This user already exists",
    };
}

const result = await dbConnect(collections.USER).insertOne({
    provider: "credentials",
    nid,
    name,
    email,
    contact,
    password: await bcryptjs.hash(password, 10),
    createdAt: new Date().toISOString(),
});

return {
    success: true,
    insertedId: result.insertedId.toString(),
};
};

export const loginUser = async (payload) => {
    const { email, password } = payload
    if (!email || !password) {
        Swal.fire("Error", "User already exist", "error")
        return null
    }

    const user = await dbConnect(collections.USER).findOne({ email })
    if (!user) return null

    const isMatched = await bcryptjs.compare(password, user.password)
    if (isMatched) { return user }
    else {
        return null
    }
}