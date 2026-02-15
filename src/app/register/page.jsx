"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SocialLogin from "@/components/Button/SocialLogin";

const Register = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Registration Data:", data);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center px-6">

            {/* Glow Effects */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-300/50 rounded-full blur-3xl"></div>

            {/* Glass Card */}
            <div className="relative w-full max-w-4xl backdrop-blur-xl bg-linear-to-br from-blue-700 via-[#11B2ED] to-cyan-400 border border-white/30 rounded-3xl shadow-2xl p-8 md:p-12 z-30">

                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Create Your Care.io Account
                    </h2>
                    <p className="text-white/80 mt-2">
                        Safe. Secure. Trusted Care Platform.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid md:grid-cols-2 gap-5"
                >

                    {/* NID */}
                    <div>
                        <input
                            type="text"
                            placeholder="NID Number"
                            {...register("nid", { required: "NID is required" })}
                            className="w-full px-4 py-3 rounded-xl bg-white/80 text-black focus:ring-2 focus:ring-white outline-none"
                        />
                        {errors.nid && (
                            <p className="text-red-200 text-sm mt-1">
                                {errors.nid.message}
                            </p>
                        )}
                    </div>

                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-3 rounded-xl bg-white/80 text-black focus:ring-2 focus:ring-white outline-none"
                        />
                        {errors.name && (
                            <p className="text-red-200 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            className="w-full px-4 py-3 rounded-xl bg-white/80 text-black focus:ring-2 focus:ring-white outline-none"
                        />
                        {errors.email && (
                            <p className="text-red-200 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Contact */}
                    <div>
                        <input
                            type="tel"
                            placeholder="Contact Number"
                            {...register("contact", {
                                required: "Contact number is required",
                            })}
                            className="w-full px-4 py-3 rounded-xl bg-white/80 text-black focus:ring-2 focus:ring-white outline-none"
                        />
                        {errors.contact && (
                            <p className="text-red-200 text-sm mt-1">
                                {errors.contact.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="md:col-span-2">
                        <input
                            type="password"
                            placeholder="Create Password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters required",
                                },
                                validate: {
                                    hasUppercase: (value) =>
                                        /[A-Z]/.test(value) ||
                                        "At least one uppercase letter required",
                                    hasLowercase: (value) =>
                                        /[a-z]/.test(value) ||
                                        "At least one lowercase letter required",
                                },
                            })}
                            className="w-full px-4 py-3 rounded-xl bg-white/80 text-black focus:ring-2 focus:ring-white outline-none"
                        />
                        {errors.password && (
                            <p className="text-red-200 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2 rounded-xl bg-white text-[#11B2ED] font-semibold hover:bg-gray-200 hover:text-black transition-all duration-300 shadow-lg hover:scale-105"
                        >
                            {isSubmitting ? "Creating Account..." : "Register Now"}
                        </button>
                    </div>
                </form>
                <div className="mt-2">
                    <SocialLogin></SocialLogin>
                </div>

                {/* Login Link */}
                <p className="text-center text-white/80 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold hover:underline hover:text-white transition-all duration-300">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
