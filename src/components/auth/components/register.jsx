"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SocialLogin from "@/components/reusable/SocialLogin";
import { postUser } from "../../../server/auth.service";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import Button2 from "@/components/reusable/Button2";
import { createUserSchema } from "@/validation/auth.schema";


const Register = () => {
  
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm(
        {resolver: zodResolver(createUserSchema)}
    );

    const onSubmit = async (payload) => {
        const result = await postUser(payload)
        if (result?.success) {
            const result = await signIn("credentials", { email: payload.email, password: payload.password, redirect: false })

            if (result.ok) {
                reset();
                Swal.fire({
                    title: "Welcome",
                    text: "You Successfully create your account",
                    icon: "success",
                    confirmButtonColor: "#11B2ED"
                });
            }
        }else {
            Swal.fire({
                title: "Error",
                text: result.message,
                icon: "error",
                confirmButtonColor: "#11B2ED",
            });
        }
    };

    return (
        <div >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-7"
            >
                <div className="grid md:grid-cols-2 gap-5">

                    {/* NID */}
                    <div className="relative">
                        <label className="absolute -top-1 left-4 px-2 bg-base-200 text-primary text-sm font-medium">
                            NID Number
                        </label>

                        <input
                            type="text"
                            placeholder="Enter NID Number"
                            {...register("nid", { required: "NID is required" })}
                            className={`mt-2 w-full px-4 py-2 rounded-xl border bg-base-200 text-base-300 placeholder:text-xs placeholder:text-gray-500
                ${errors.nid ? "border-red-500" : "border-gray-300"}
                focus:border-[#11B2ED] focus:ring-2 focus:ring-[#11B2ED]/30 outline-none transition`}
                        />

                        {errors.nid && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.nid.message}
                            </p>
                        )}
                    </div>

                    {/* Name */}
                    <div className="relative">
                        <label className="absolute -top-1 left-4 px-2 bg-base-200 text-primary text-sm font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            {...register("name", { required: "Name is required" })}
                            className={`mt-2 w-full px-4 py-2 rounded-xl border bg-base-200 text-base-300 placeholder:text-xs placeholder:text-gray-500
                ${errors.name ? "border-red-500" : "border-gray-300"}
                focus:border-[#11B2ED] focus:ring-2 focus:ring-[#11B2ED]/30 outline-none transition`}
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <label className="absolute -top-1 left-4 px-2 bg-base-200 text-primary text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address",
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

                    {/* Contact */}
                    <div className="relative">
                        <label className="absolute -top-1 left-4 px-2 bg-base-200 text-primary text-sm font-medium">
                            Contact Number
                        </label>

                        <input
                            type="number"
                            placeholder="Enter Contact Number"
                            {...register("contact", {
                                required: "Contact number is required",
                            })}
                            className={`mt-2 w-full px-4 py-2 rounded-xl border bg-base-200 text-base-300 placeholder:text-xs placeholder:text-gray-500
                ${errors.contact ? "border-red-500" : "border-gray-300"}
                focus:border-[#11B2ED] focus:ring-2 focus:ring-[#11B2ED]/30 outline-none transition`}
                        />

                        {errors.contact && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.contact.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Password */}
                <div className="relative">
                    <label className="absolute -top-1 left-4 px-2 bg-base-200 text-primary text-sm font-medium">
                        Password
                    </label>

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
                        className={`mt-2 w-full px-4 py-2 rounded-xl border bg-base-200 text-base-300 placeholder:text-xs placeholder:text-gray-500
            ${errors.password ? "border-red-500" : "border-gray-300"}
            focus:border-[#11B2ED] focus:ring-2 focus:ring-[#11B2ED]/30 outline-none transition`}
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <Button2
                    type="submit"
                    disabled={isSubmitting}
                    className="btn w-full disabled:opacity-70 mt-2"
                >
                    {isSubmitting ? "Creating Account..." : "Register"}
                </Button2>
            </form>

            <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-accent" />
                <span className="text-accent">OR</span>
                <div className="flex-1 h-px bg-accent" />
            </div>

            <div className="mt-2">
                <SocialLogin></SocialLogin>
            </div>

        </div>
    );
};

export default Register;
