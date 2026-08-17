"use client";

import React from "react";
import Logo from "./Logo";
import NavLink from "../../reusable/Navlink";
import ThemeToggle from "../../reusable/ThemeToggle";
import AuthDrawer from "@/components/auth/AuthDrawer";

const Navbar = () => {
  const nav = (
    <>
      <li>
        <NavLink href={"/services"}>Services</NavLink>
      </li>
      <li>
        <NavLink href={"/blog"}>Blog</NavLink>
      </li>
      <li>
        <NavLink href={"/contact"}>Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar backdrop-blur-md fixed top-0 z-50 border-b border-primary md:px-6 pr-8 md:pr-14 h-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {nav}
          </ul>
        </div>
        <div className="-ml-6 md:ml-2">
          <Logo />
        </div>
      </div>

      <div className="navbar-end">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-3">{nav}</ul>
        </div>

        <div className="flex justify-end gap-2 md:gap-6">
          <ThemeToggle />
          <AuthDrawer />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
