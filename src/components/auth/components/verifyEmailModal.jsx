"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { verifyEmail } from "@/server/auth.service";
import { IoCloseSharp } from "react-icons/io5";
import Button1 from "@/components/reusable/Button1";
import { motion, AnimatePresence } from "framer-motion";
import { showToast } from "@/components/reusable/toastAlert";

export default function VerifyEmailModal({
    email,
    isOpen,
    onClose,
    onSuccess,
}) {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        const result = await verifyEmail({ email, code: otp });

        setLoading(false);

        if (!result.success) {
            setError(result.message);
            return;
        }

        showToast("success", "Email verified successfully, Login to continue");

        onSuccess?.();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <dialog className="modal modal-open">
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full h-full bg-base-200 rounded-2xl p-8 flex flex-col justify-center relative"
                    >
                        <div className="absolute top-6 right-6">
                            <button onClick={onClose}>
                                <IoCloseSharp className="text-xl text-red-600 cursor-pointer" />
                            </button>
                        </div>

                        <h3 className="font-semibold text-3xl text-base-300 text-center mb-2">
                            Verify <span className="text-primary">Email</span>
                        </h3>

                        <p className="border border-gray-400 w-40 mx-auto mb-6" />

                        <p className="py-2 text-accent">
                            An OTP has been sent to your email address. Please enter the code below to verify your email.
                        </p>

                        <p className="font-semibold text-primary mb-4">
                            {email}
                        </p>

                        <form onSubmit={handleVerify}>
                            <input
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="mt-2 w-full px-4 py-2 rounded-xl border bg-base-200 text-base-300 placeholder:text-xs placeholder:text-gray-500 focus:border-[#11B2ED] focus:ring-2 focus:ring-[#11B2ED]/30 outline-none transition"
                            />

                            {error && (
                                <p className="text-red-500 mt-2 text-sm">
                                    {error}
                                </p>
                            )}

                            <Button1 className="btn w-full mt-4" disabled={loading}>
                                {loading ? "Verifying..." : "Verify Email"}
                            </Button1>
                        </form>
                    </motion.div>
                </dialog>
            )}
        </AnimatePresence>
    );
}