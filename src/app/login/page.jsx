"use client";

import SocialLogin from "@/components/Button/SocialLogin";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Login Data:", data);

        // 👉 here you will call backend / firebase login
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6">


            {/* Glow Effects */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-300/50 rounded-full blur-3xl"></div>


            {/* Card */}
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden z-30">

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

                    <h3 className="text-2xl font-bold text-gray-800">
                        Login to Your Account
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
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
                                className={`mt-2 text-black w-full px-4 py-3 rounded-xl border 
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
                            <label className="block text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                className={`mt-2 text-black w-full px-4 py-3 rounded-xl border 
                ${errors.password ? "border-red-500" : "border-gray-300"}
                focus:border-[#11B2ED] focus:ring-2 focus:ring-[#11B2ED]/30 outline-none transition`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-[#11B2ED]" />
                                <span className="text-black">Remember me</span>
                            </label>

                            <Link
                                href="#"
                                className="text-[#11B2ED] hover:underline font-medium"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn border-none w-full py-5 rounded-xl bg-linear-to-bl from-blue-700 to-cyan-300 text-white font-semibold transition duration-300 shadow-lg disabled:opacity-70"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="mt-4">
                        <SocialLogin />
                    </div>

                    {/* Signup Link */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-[#11B2ED] font-semibold hover:underline"
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
