"use server"

import { collections, dbConnect } from "@/lib/dbConnect"
import bcryptjs from 'bcryptjs'
import { createUserSchema, loginSchema } from "@/validation/auth.schema";
import { sendVerificationEmail } from "@/lib/generateOtp";


export const postUser = async (payload) => {
    const validation = createUserSchema.safeParse(payload);

    if (!validation.success) {
        return {
            success: false,
            message: "Validation failed. Please check your input.",
        };
    }

    const { name, email, password, nid, contact } = validation.data;

    const isExist = await dbConnect(collections.USER).findOne({ email });

    if (isExist) {
        return {
            success: false,
            message: "This user already exists",
        };
    }

    const verificationCode = Math.floor(
        100000 + Math.random() * 900000
    );


    const result = await dbConnect(collections.USER).insertOne({
        provider: "credentials",
        nid,
        name,
        email,
        contact,
        password: await bcryptjs.hash(password, 10),
        isVerified: false,

        verificationCode,
        createdAt: new Date().toISOString(),
    });

    if (result.insertedId) {
        await sendVerificationEmail(email, verificationCode);
    }

    return {
        success: true,
        insertedId: result.insertedId.toString(),
    };
};

export const verifyEmail = async ({
    email,
    code,
}) => {
    const user = await dbConnect(
        collections.USER
    ).findOne({ email });

    if (!user) {
        return {
            success: false,
            message: "User not found",
        };
    }

    const normalizedCode = String(code).trim();

    if (String(user.verificationCode) !== normalizedCode) {
        return {
            success: false,
            message: "Invalid code",
        };
    }


    await dbConnect(collections.USER).updateOne(
        { email },
        {
            $set: {
                isVerified: true,
            },
            $unset: {
                verificationCode: ""
            },
        }
    );

    return {
        success: true,
    };
};

export const loginUser = async (payload) => {
    const parsed = loginSchema.safeParse(payload);

    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0].message,
        };
    }

    const { email, password } = parsed.data;

    const user = await dbConnect(collections.USER).findOne({ email })
    if (!user) {
        return {
            success: false,
            message: "Invalid email or password"
        };
    }

    const isMatched = await bcryptjs.compare(password, user.password)
    if (isMatched)
     { return user }
    else {
        return {
            success: false,
            message: "Invalid email or password"
        };
    }
}