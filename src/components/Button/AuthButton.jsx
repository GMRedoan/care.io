"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FiLogIn } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const AuthButton = () => {
    const { status } = useSession();
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
                <button
                    onClick={handleLogout}
                    className="btn btn-sm bg-red-600 hover:bg-red-700 border-none rounded-xl text-white"
                >
                    Log out <TbLogout2 />
                </button>
            ) : (
                <Link
                    href="/login"
                    className="btn btn-sm btn-primary rounded-xl"
                >
                    Login <FiLogIn />
                </Link>
            )}
        </div>
    );
};

export default AuthButton;
