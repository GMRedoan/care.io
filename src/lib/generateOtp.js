import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (
    email,
    verificationCode
) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Email",
        html: `
            <h2>Email Verification</h2>
            <p>Your verification code is:</p>
            <h1>${verificationCode}</h1>
            <p>This code expires in 10 minutes.</p>
        `,
    });
};

export const sendResetPasswordEmail = async (
    email,
    code
) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Password OTP",
        html: `
            <h2>Password Reset Request</h2>
            <p>Your OTP is:</p>
            <h1>${code}</h1>
            <p>This code expires in 10 minutes.</p>
        `,
    });
};