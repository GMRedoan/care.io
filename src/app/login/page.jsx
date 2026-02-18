"use client";

import SocialLogin from "@/components/Button/SocialLogin";
import Button2 from "@/components/styles/Button2";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Login = () => {
    const router = useRouter();
    const params = useSearchParams();
    const callback = params.get("callbackUrl") || "/";
    const [authError, setAuthError] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        setAuthError(null)
        const result = await signIn("credentials", { email: data.email, password: data.password, redirect: false, callbackUrl: callback })
        if (result.ok) {
            Swal.fire({
                title: "Welcome Back",
                text: "You Successfully Logged in your account",
                icon: "success",
                confirmButtonColor: "#11B2ED"
            });
            router.push(callback)
        }else{
            setAuthError("Invalid email or password");
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-base-200 py-20">


            {/* Glow Effects */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-300/50 rounded-full blur-3xl"></div>


            {/* Card */}
            <div className="w-full max-w-5xl bg-base-100 rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden z-30">

                {/* Left Side */}
                <div className="hidden md:flex flex-col justify-center bg-linear-to-bl from-blue-700 to-cyan-300 text-white p-12 relative">
                    <h2 className="text-3xl font-bold">Welcome Back to Care.io</h2>
                    <p className="mt-4 text-white/90">
                        Securely log in to book trusted caregivers for your loved ones.
                        Safe, reliable, and always here when you need support.
                    </p>

                    <div className="absolute bottom-10 left-12 text-sm text-white/70">
                        Trusted by families nationwide
                    </div>
                </div>

                {/* Right Side */}
                <div className="p-10 md:p-14">

                    <h3 className="text-2xl font-bold text-primary">
                        Login to Your Account
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-base-300">
                                Email Address
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
                                className={`mt-2 w-full px-4 py-3 rounded-xl border bg-base-200 text-base-300
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
                        <div>
                            <label className="block text-sm font-medium text-base-300">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                className={`mt-2 text-base-300 w-full px-4 py-3 rounded-xl border border-gray-300 bg-base-200
                focus:border-[#11B2ED] focus:ring-2 focus:ring-[#11B2ED]/30 outline-none transition`}
                            />
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

                        {/* Submit Button */}
                        <Button2
                            type="submit"
                            disabled={isSubmitting}
                            className="btn w-full disabled:opacity-70 mt-4"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button2>
                    </form>

                    <div className="mt-4">
                        <SocialLogin />
                    </div>

                    {/* Signup Link */}
                    <p className="mt-6 text-center text-sm text-accent">
                        Don’t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-base-300 font-semibold hover:underline hover:text-primary"
                        >
                            Create one
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;
