"use client";

import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "@/components/reusable/ThemeToggle";
import { FiBell } from "react-icons/fi";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


export default function DashboardNavbar({ currentUser }) {
    const router = useRouter();
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
                router.push("/");
                await signOut({ redirect: false });
    
                await Swal.fire({
                    icon: "success",
                    title: "Logged Out",
                    text: "See you again at Care.io 👋",
                    timer: 1500,
                    showConfirmButton: false,
                });
    
            }
        };
    

    return (
        <header className="navbar bg-base-100 border-b border-base-300 px-4 sticky top-0 z-40">
            {/* Left */}
            <div className="navbar-start gap-3">
            </div>

            {/* Right */}
            <div className="navbar-end gap-2">
                <ThemeToggle />

                <button className="btn btn-ghost btn-circle">
                    <FiBell size={18} />
                </button>

                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="flex items-center gap-3"
                    >
                        <div className=" ">
                        <div tabIndex={0} role="">
                            <Image
                            src={currentUser?.image}
                            alt="Profile"
                            width={35}
                            height={35}
                            className="rounded-full border-2 border-primary/50 hover:border-primary duration-300"
                            />
                        </div>
                        </div>

                        <div className="hidden md:block text-left cursor-pointer">
                            <p className="font-medium text-sm">
                                {currentUser?.name}
                            </p>
                            <p className="text-xs opacity-70 capitalize">
                                {currentUser?.role}
                            </p>
                        </div>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-50 w-56 p-2 shadow border border-base-300"
                    >
                        <li>
                            <a>Profile</a>
                        </li>

                        <li>
                            <a>Settings</a>
                        </li>

                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-error"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}