"use server"

import { collections, dbConnect } from "@/lib/dbConnect"
import bcryptjs from 'bcryptjs'
import { createUserSchema, loginSchema } from "@/validation/auth.schema";
import { sendResetPasswordEmail, sendVerificationEmail } from "@/lib/generateOtp";

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
    const isNidExist = await dbConnect(collections.USER).findOne({ nid });

    if (isNidExist) {
        return {
            success: false,
            message: "This nid already exists",
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
        image: "https://i.ibb.co.com/B2Qcfsgh/user-circles-set-78370-4704-Photoroom.png",
        contact,
        password: await bcryptjs.hash(password, 10),
        role: "user",
        status: "active",
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

export const resendVerificationCode = async (email) => {
    const user = await dbConnect(collections.USER).findOne({
        email,
    });

    if (!user) {
        return {
            success: false,
            message: "User not found",
        };
    }

    if (user.isVerified) {
        return {
            success: false,
            message: "Email already verified",
        };
    }

    const verificationCode = Math.floor(
        100000 + Math.random() * 900000
    );

    await dbConnect(collections.USER).updateOne(
        { email },
        {
            $set: {
                verificationCode
            },
        }
    );

    await sendVerificationEmail(
        email,
        verificationCode
    );

    return {
        success: true,
        message: "OTP sent successfully",
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

    if (!user.isVerified) {
        return {
            success: false,
            message:
                "Please verify your email first",
        };
    }
    if(user.status === "blocked"){
        return {
            success: false,
            message:
                "Your account has been blocked",
        };
    }

    const isMatched = await bcryptjs.compare(password, user.password)

    if (isMatched){
        return user 
    }
     
    else {
        return {
            success: false,
            message: "Invalid email or password"
        };
    }
}

export const forgotPassword = async (email) => {
    const user = await dbConnect(
        collections.USER
    ).findOne({ email });

    if (!user) {
        return {
            success: false,
            message: "User not found",
        };
    }

    const code = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    const expires =
        Date.now() + 10 * 60 * 1000;

    await dbConnect(collections.USER).updateOne(
        { email },
        {
            $set: {
                resetPasswordCode: code,
                resetPasswordCodeExpires: expires,
            },
        }
    );

    await sendResetPasswordEmail(
        email,
        code
    );

    return {
        success: true,
    };
};

export const verifyResetCode = async ({
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

    if (
        String(user.resetPasswordCode) !==
        String(code)
    ) {
        return {
            success: false,
            message: "Invalid code",
        };
    }

    if (
        Date.now() >
        user.resetPasswordCodeExpires
    ) {
        return {
            success: false,
            message: "Code expired",
        };
    }

    return {
        success: true,
    };
};

export const resendPassVerificationCode = async (email) => {
    const user = await dbConnect(collections.USER).findOne({
        email,
    });

    if (!user) {
        return {
            success: false,
            message: "User not found",
        };
    }

    if (!user.isVerified) {
        return {
            success: false,
            message:
                "Please verify your email first",
        };
    }

    const code = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await dbConnect(collections.USER).updateOne(
        { email },
        {
            $set: {
                resetPasswordCode: code,
                resetPasswordCodeExpires: expires,
            },
        }
    );

    await sendResetPasswordEmail(email, code);

    return {
        success: true,
        message: "Reset code sent successfully",
    };
};

export const resetPassword = async ({
    email,
    password,
}) => {
    const isValidPassword = (password) => {
        return (
            password.length >= 6 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password)
        );
    };

    if (!isValidPassword(password)) {
        return {
            success: false,
            message:
                "Password must be at least 6 characters and include uppercase, lowercase, and a number",
        };
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    await dbConnect(collections.USER).updateOne(
        { email },
        {
            $set: {
                password: hashedPassword,
            },
            $unset: {
                resetPasswordCode: "",
                resetPasswordCodeExpires: "",
            },
        }
    );

    return {
        success: true
    };
};