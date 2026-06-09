import { z } from "zod";

export const createUserSchema = z.object({
    nid: z
        .string()
        .min(1, "NID is required")
        .min(6, "NID must be at least 6 characters"),

    name: z
        .string()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),

    contact: z
        .string()
        .min(1, "Contact number is required")
        .regex(/^\d+$/, "Contact must contain only numbers")
        .min(11, "Use a valid contact number with at least 11 digits")
        .max(11, "Use a valid contact number with at most 11 digits"),
 
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Minimum 6 characters required")
        .regex(/[A-Z]/, "At least one uppercase letter required")
        .regex(/[a-z]/, "At least one lowercase letter required"),
});


export const loginSchema = z.object({
    email: z
        .email("Please enter a valid email address")
        .min(1, "Email is required"),

    password: z
        .string()
        .min(1, "Password is required"),
});
