"use client";

import { useState } from "react";
import Button1 from "../reusable/Button1";
import { FiLogIn } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Login from "./components/login";
import Register from "./components/register";
import { IoCloseSharp } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import Animate from "../reusable/Animate";
import { openDrawer } from "../reusable/drawer-controller";
import Image from "next/image";
import Link from "next/link";



export default function AuthDrawer() {
    const [isLogin, setIsLogin] = useState(true);
    const { status } = useSession();
    const router = useRouter();
    const {data: session}  = useSession();
 
    if (status == "loading") {
        return (
            <div className="btn btn-sm md:btn-md btn-primary opacity-50 rounded-xl">
                Loading...
            </div>
        );
    }

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out from Care.io",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#11B2ED",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout",
        });

        if (result.isConfirmed) {
            await signOut({ redirect: false });

            await Swal.fire({
                icon: "success",
                title: "Logged Out",
                text: "See you again at Care.io 👋",
                timer: 1500,
                showConfirmButton: false,
            });

            router.push("/");
        }
    };

    const handleDrawer = () => {
        openDrawer();
    };

    return (
        <div className="drawer drawer-end">
            <input id="auth-drawer" type="checkbox" className="drawer-toggle" />

            {
                status === "authenticated" ? (
                    <div className="dropdown">
                        <div tabIndex={0} role="button">
                            <Image
                            src={session?.user?.image}
                            alt="Profile"
                            width={45}
                            height={45}
                            className="rounded-full border-2 border-primary/50 hover:border-primary duration-300"
                            />
                        </div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-white/15 backdrop-blur-lg rounded-box z-1 w-28 border border-accent mt-2 -ml-5 p-3 cursor-pointer font-semibold">
                            <Link href={'/dashboard'} className="hover:text-primary">Dashboard</Link>
                            <li className="hover:text-red-400" onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                 ) : (
                        <div
                        onClick={handleDrawer}
                         className="drawer-content">
                            <Button1 className="btn btn-sm md:btn-md border-none flex items-center justify-center gap-2">
                                Login <FiLogIn />
 
                        </Button1>
                    </div>

                )
            }

            <div className="drawer-side z-999">
                <label
                    htmlFor="auth-drawer"
                    className="drawer-overlay bg-black/40 backdrop-blur-lg"
                />
                <div className="bg-base-200 p-8 fixed right-0 top-0  h-screen w-full md:w-120 rounded-2xl overflow-y-auto">

                    <div className="flex justify-end">
                        <label
                            htmlFor="auth-drawer">
                            <IoCloseSharp className="text-xl text-red-600 cursor-pointer" />
                        </label>
                    </div>
                    {/* Heading */}
                    <div className="mt-6 text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLogin ? "login-heading" : "register-heading"}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.25 }}
                                className="mt-6 text-center"
                            >
                                <h1 className="text-3xl font-semibold text-base-300">
                                    {isLogin ? (<div>
                                        Welcome <span className="text-primary">Back!</span>
                                    </div>) : (<div>
                                            <span className="text-primary">Create</span> Account
                                    </div>)}
                                </h1>

                                <p className="mt-2 text-accent">
                                    {isLogin
                                        ? "Welcome back! Please sign in."
                                        : "Register to get started."}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Toggle */}
                    <div className="mt-10 bg-zinc-900 rounded-xl flex overflow-hidden relative">
                        <motion.div
                            className="absolute top-0 bottom-0 w-1/2 bg-linear-to-r from-blue-500 to-cyan-300"
                            animate={{
                                x: isLogin ? "0%" : "100%",
                                clipPath: isLogin
                                    ? "polygon(0 0,85% 0,100% 100%,0 100%)"
                                    : "polygon(15% 0,100% 0,100% 100%,0 100%)",
                            }}
                            transition={{
                                duration: 0.35,
                                ease: "easeInOut",
                            }}
                        />

                        <button
                            onClick={() => setIsLogin(true)}
                            className={`relative z-10 flex-1 py-2 font-semibold cursor-pointer transition-colors
        ${isLogin ? "text-black" : "text-white"}`}
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setIsLogin(false)}
                            className={`relative z-10 flex-1 py-2 font-semibold cursor-pointer transition-colors
        ${!isLogin ? "text-black" : "text-white"}`}
                        >
                            Register
                        </button>
                    </div>
                    {/* Form */}
                    <div className="mt-12">
                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <Animate type="fadeLeft"
                                    key="login"
                                >
                                    <Login />
                                </Animate>
                            ) : (
                                <Animate
                                type="fadeRight"
                                    key="register"
                                >
                                    <Register />
                                </Animate>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="text-center mt-10 text-md">
                        {isLogin ? (
                            <>
                                Do not have an account?{" "}
                                <button
                                    onClick={() => setIsLogin(false)}
                                    className="text-blue-400 font-semibold hover:underline hover:text-blue-500 duration-300 cursor-pointer"
                                >
                                    Create one
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className="text-blue-400 font-semibold hover:underline hover:text-blue-500 duration-300 cursor-pointer"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>

        </div>
    );
}