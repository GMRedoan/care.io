"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FiLogIn } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Button1 from "../styles/Button1";
   
const AuthButton = () => {
    const { status } = useSession();
    const router = useRouter();

    if(status == "loading"){
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

    return (
        <div>
            {status === "authenticated" ? (
                <Button1
                    onClick={handleLogout}
                    className="btn btn-sm md:btn-md"
                >
                    Log out <TbLogout2 />
                </Button1>
            ) : (
                <Link
                    href="/login"
                        className="btn btn-sm md:btn-md bg-linear-to-bl from-blue-500 to-cyan-300 rounded-xl border-none shadow-xl hover:text-black text-white"
                >
                        Login <FiLogIn />
                </Link>
             )}
        </div>
    );
}; 

export default AuthButton;
