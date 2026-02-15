"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({ href, children }) => {
    const path = usePathname()
    return (
        <Link
            href={href}
            className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 ease-in-out
    ${path.startsWith(href)
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "text-base-content hover:text-primary hover:scale-105"
                }`} >
            {children}
        </Link>
    );
};

export default NavLink;