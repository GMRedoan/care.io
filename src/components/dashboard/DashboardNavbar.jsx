"use client";

import { signOut } from "next-auth/react";
import ThemeToggle from "@/components/reusable/ThemeToggle";
import { FiBell, FiHome, FiMenu } from "react-icons/fi";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { FiUser, FiSettings, FiLogOut, FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import { RiServiceFill } from "react-icons/ri";

export default function DashboardNavbar({ currentUser, onOpenMobileSidebar }) {
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
    <header className="navbar bg-base-200 border-b border-accent px-4 sticky top-0 z-40">
      {/* Left */}
      <div className="navbar-start gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onOpenMobileSidebar}
          className="btn btn-ghost btn-circle md:hidden"
        >
          <FiMenu size={20} />
        </button>
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
            className="flex items-center gap-3 px-2 py-1 hover:bg-base-200 transition-all duration-200 cursor-pointer relative h-10 w-10 overflow-hidden rounded-full"
          >
            <Image
              src={currentUser?.image}
              alt="Profile"
              fill
              sizes="40px"
              className="rounded-full object-cover border-2 border-primary transition-all duration-300"
            />

            <div className="hidden md:block">
              <h4 className="text-sm font-semibold leading-none">
                {currentUser?.name}
              </h4>

              <p className="text-xs text-base-content/60 capitalize mt-1">
                {currentUser?.role}
              </p>
            </div>

            <FiChevronDown className="hidden md:block text-base-content/50" />
          </div>

          <div
            tabIndex={0}
            className="dropdown-content mt-3 w-72 rounded-2xl border-x border-accent bg-base-200/50 backdrop-blur-lg shadow-2xl p-2 z-999"
          >
            {/* User Header */}
            <div className="flex items-center gap-3 p-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={currentUser?.image}
                  alt="Profile"
                  fill
                  sizes="40px"
                  className="rounded-full object-cover border-2 border-primary/40 hover:border-primary transition-all duration-300"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-base truncate">
                  {currentUser?.name}
                </h3>

                <p className="text-sm text-base-content/60 truncate">
                  {currentUser?.email}
                </p>
              </div>
            </div>

            <div className="divider my-1"></div>

            {/* Menu */}
            <ul className="menu p-0">
              <li>
                <Link href="/" className="rounded-lg hover:bg-base-200">
                  <FiHome className="text-primary" />
                  Home
                </Link>
              </li>

              <li>
                <Link href="/services" className="rounded-lg hover:bg-base-200">
                  <RiServiceFill className="text-info" />
                  Services
                </Link>
              </li>

              <div className="divider my-1"></div>

              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-lg text-error hover:bg-error hover:text-white"
                >
                  <FiLogOut />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
