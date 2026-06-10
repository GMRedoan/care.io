"use client"
import { forgotPassword, resendPassVerificationCode, resetPassword, verifyResetCode } from '@/server/auth.service';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseSharp, IoReturnDownBack } from "react-icons/io5";
import Button1 from '@/components/reusable/Button1';
import { showToast } from '@/components/reusable/toastAlert';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ForgotPasswordModal = ({
    isOpen,
    onClose,
}) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [resending, setResending] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [showPass, setShowPass] = useState(false);



    const handleSendCode = async () => {
        const result = await forgotPassword(email);

        if (!result.success) {
            showToast("error", `${result.message}`)
            return;
        }
        showToast("success", "A reset password otp sent tto your email")
        setStep(2);
    };

    const handleVerifyCode = async () => {
        const result =
            await verifyResetCode({
                email,
                code: otp,
            });

        if (!result.success) {
            showToast("error", `${result.message}`)
            return;
        }
        showToast("success", "Please enter your new password")

        setStep(3);
    };

    const handleResendOtp = async () => {
        try {
            setResending(true);

            const result =
                await resendPassVerificationCode(email);

            if (!result.success) {
                setError(result.message);
                return;
            }

            setCountdown(90);

            showToast(
                "success",
                "A new OTP has been sent to your email"
            );
        } catch (error) {
            setError(
                error.message ||
                "Failed to resend OTP"
            );
        } finally {
            setResending(false);
        }
    };

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);


    const handleResetPassword = async () => {
        const result =
            await resetPassword({
                email,
                password,
            });

        if (!result.success) {
            showToast("error", `${result.message}`)
            return;
        }

        showToast(
            "success",
            "Password updated successfully, Login now"
        );

        onClose();
    };

    const goP = () => {
        setStep(1)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <dialog className="modal modal-open">
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full h-full bg-base-200 p-8 flex flex-col justify-center relative"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6"
                        >
                            <IoCloseSharp className="text-xl text-red-500 hover:text-red-600 cursor-pointer" />
                        </button>

                        <h2 className="text-3xl font-semibold text-center text-base-300">
                            Forgot{" "}
                            <span className="text-primary">
                                Password
                            </span>
                        </h2>

                        <div className="w-34 h-0.5 bg-primary mx-auto mt-3 mb-8" />


                        {/* STEP 1 */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <p className="text-accent text-sm">
                                    Enter your email address.
                                    We will send a reset OTP.
                                </p>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-base-200 text-base-300 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                                />

                                <Button1
                                    onClick={handleSendCode}
                                    className="w-full font-semibold"
                                >
                                    Send OTP
                                </Button1>
                            </div>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <p className="text-accent">
                                    Enter the OTP sent to:
                                </p>

                                <p className="font-semibold text-primary">
                                    {email}
                                </p>

                                <input
                                    type="text"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) =>
                                        setOtp(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter OTP"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-base-200 text-base-300 text-center tracking-widest focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                                />

                                <Button1
                                    onClick={
                                        handleVerifyCode
                                    }
                                    className="w-full font-semibold"
                                >
                                    Verify OTP
                                </Button1>

                                <div>
                                    <p className="text-sm text-center mt-4">
                                        Did not receive the code?{" "}
                                        <button
                                            onClick={handleResendOtp}
                                            disabled={countdown > 0 || resending}
                                            className="text-primary font-medium hover:underline cursor-pointer
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    disabled:hover:no-underline"
                                        >
                                            {countdown > 0
                                                ? `Resend in ${countdown}s`
                                                : "Resend OTP"}
                                        </button>
                                    </p>
                                </div>

                                <div
                                    onClick={goP}>
                                    <p className='flex items-center justify-center gap-2 cursor-pointer hover:text-primary w-fit mx-auto font-semibold'>Go Back <IoReturnDownBack />
                                    </p>
                                </div>

                            </div>
                        )}

                        {/* STEP 3 */}
                        {step === 3 && (
                            <div className="space-y-4 relative">
                                <p className="text-accent">
                                    Create your new
                                    password
                                </p>

                                <label className="absolute top-7 left-4 px-2 bg-base-200 text-primary text-sm font-medium">
                                    Password
                                </label>

                                <input
                                    type={showPass ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="New Password"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-base-200 text-base-300 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none placeholder:text-sm"
                                />
                                <span
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-14 cursor-pointer"
                                >
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </span>

                                <Button1
                                    onClick={
                                        handleResetPassword
                                    }
                                    className="w-full font-semibold"
                                >
                                    Update Password
                                </Button1>
                            </div>
                        )}
                    </motion.div>
                </dialog>
            )}
        </AnimatePresence>);
};

export default ForgotPasswordModal;