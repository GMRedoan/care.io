import nodemailer from "nodemailer";

export const sendVerificationEmail = async (
    email,
    verificationCode
) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

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