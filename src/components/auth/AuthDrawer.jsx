"use client";

import { useState } from "react";
import Button1 from "../reusable/Button1";
import { FiLayout, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Login from "./components/login";
import Register from "./components/register";
import { IoCloseSharp } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import Animate from "../reusable/Animate";
import { openDrawer } from "../hooks/drawer-controller";
import Image from "next/image";
import Link from "next/link";



export default function AuthDrawer() {
    const [isLogin, setIsLogin] = useState(true);
    const { status } = useSession();
    const router = useRouter();
    const { data: session } = useSession();
 
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
            router.refresh();

            await Swal.fire({
                icon: "success",
                title: "Logged Out",
                text: "See you again at Care.io 👋",
                timer: 1500,
                showConfirmButton: false,
            });
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
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="cursor-pointer">
                            <Image
                                src={session?.user?.image}
                                alt="Profile"
                                width={45}
                                height={45}
                                className="rounded-full border-2 border-primary/40 hover:border-primary transition-all duration-300"
                            />
                        </div>

                        <div
                            tabIndex={0}
                            className="dropdown-content mt-3 w-72 rounded-2xl border-x border-accent bg-base-200/50 backdrop-blur-lg shadow-2xl p-2 z-999"
                        >
                            {/* User Info */}
                            <div className="flex items-center gap-3 p-3">
                                <Image
                                    src={session?.user?.image}
                                    alt="Profile"
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />

                                <div>
                                    <h3 className="font-semibold text-base">
                                        {session?.user?.name}
                                    </h3>
                                    <p className="text-sm text-base-content/60 truncate">
                                        {session?.user?.email}
                                    </p>
                                </div>
                            </div>

                            <div className="divider my-1"></div>

                            {/* Menu */}
                            <ul className="menu p-0">
                                <li>
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center gap-3 rounded-lg"
                                    >
                                        <FiLayout className="text-lg text-primary" />
                                        Dashboard
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href={`/dashboard/${session?.user?.role}/profile`}
                                        className="flex items-center gap-3 rounded-lg"
                                    >
                                        <FiUser className="text-lg text-info" />
                                        Profile
                                    </Link>
                                </li>

                                <div className="divider my-1"></div>

                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 text-error hover:bg-error hover:text-white rounded-lg"
                                    >
                                        <FiLogOut className="text-lg" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
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