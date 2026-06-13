"use client";

import SocialLogin from "@/components/reusable/SocialLogin";
import Button2 from "@/components/reusable/Button2";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/auth.schema";
import VerifyEmailModal from "./verifyEmailModal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { showToast } from "@/components/reusable/toastAlert";
import ForgotPasswordModal from "./forgotPasswordModal";
import { closeDrawer } from "@/components/reusable/drawer-controller";

const Login = () => {
    const router = useRouter();
    const params = useSearchParams();
    const [showPass, setShowPass] = useState(false);
    const callback = params.get("callbackUrl") || "/";
    const [authError, setAuthError] = useState();
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [verifyEmailAddress, setVerifyEmailAddress] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data) => {
        setAuthError(null)
        const result = await signIn("credentials", { email: data.email, password: data.password, isVerified: data.isVerified, redirect: false, callbackUrl: callback })

        if (result?.ok) {
            reset();
            closeDrawer();

            Swal.fire({
                title: "Welcome Back",
                text: "You Successfully Logged in your account",
                icon: "success",
                confirmButtonColor: "#11B2ED"
            });
            router.push(callback)
        } else {
            setAuthError(result?.error || "Login failed");
            showToast("error", result?.error || "Login failed");

            if (result?.error === "Please verify your email before logging in") {
                setVerifyEmailAddress(data.email);
                setShowVerifyModal(true);
            }
        }

    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-7">

                {/* Email */}
                <div className="relative">
                    <label className="absolute -top-1 left-4 px-2 bg-base-200 text-primary font-medium font-sm">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Please enter a valid email",
                            },
                        })}
                        className={`mt-2 w-full px-4 py-2 rounded-xl border bg-base-200 text-base-300 placeholder:text-xs placeholder:text-gray-500
                ${errors.email ? "border-red-500" : "border-gray-300"}
                focus:border-[#11B2ED] focus:ring-2 focus:ring-[#11B2ED]/30 outline-none transition`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="relative">
                    <label className="absolute -top-1 left-4 px-2 bg-base-200 text-primary text-sm font-medium">
                        Password
                    </label>
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder="••••••••"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        className={`mt-2 text-base-300 w-full px-4 py-2 rounded-xl border border-gray-300 bg-base-200 placeholder:text-xs placeholder:text-gray-500
                focus:border-[#11B2ED] focus:ring-2 focus:ring-[#11B2ED]/30 outline-none transition`}
                    />
                    <span
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-4.5 cursor-pointer"
                    >
                        {showPass ? <FaEyeSlash /> : <FaEye />}
                    </span>

                    <div className="flex flex-row-reverse items-center justify-between">
                        <div>
                            <p
                                onClick={() =>
                                    setShowForgotModal(true)
                                }
                                className="text-sm text-primary hover:underline cursor-pointer mt-2 text-right w-35">
                                Forgot Password?
                            </p>
                        </div>

                        <div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}

                            {authError && (
                                <p className="text-red-500 text-sm mt-2">
                                    {authError}
                                </p>
                            )}

                        </div>

                    </div>
                </div>

                {/* Submit Button */}
                <Button2
                    type="submit"
                    disabled={isSubmitting}
                    className="btn w-full disabled:opacity-70 mt-2"
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </Button2>
            </form>

            <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-accent" />
                <span className="text-accent">OR</span>
                <div className="flex-1 h-px bg-accent" />
            </div>

            <div className="mt-4">
                <SocialLogin />
            </div>

            <VerifyEmailModal
                email={verifyEmailAddress}
                isOpen={showVerifyModal}
                onClose={() => setShowVerifyModal(false)}
            />
            <ForgotPasswordModal
                isOpen={showForgotModal}
                onClose={() => setShowForgotModal(false)}
            />
        </div>
    );
};

export default Login;
