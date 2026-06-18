"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import {
    FiHome,
    FiUsers,
    FiCalendar,
    FiSettings,
    FiMenu,
    FiChevronLeft,
    FiShield,
} from "react-icons/fi";

export default function DashboardSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const [collapsed, setCollapsed] = useState(false);

    const role = session?.user?.role;

    const adminLinks = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: FiHome,
        },
        {
            name: "Patients",
            href: "/dashboard/patients",
            icon: FiUsers,
        },
        {
            name: "Appointments",
            href: "/dashboard/appointments",
            icon: FiCalendar,
        },
        {
            name: "Admin Panel",
            href: "/dashboard/admin",
            icon: FiShield,
        },
        {
            name: "Settings",
            href: "/dashboard/settings",
            icon: FiSettings,
        },
    ];

    const userLinks = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: FiHome,
        },
        {
            name: "My Appointments",
            href: "/dashboard/appointments",
            icon: FiCalendar,
        },
        {
            name: "Settings",
            href: "/dashboard/settings",
            icon: FiSettings,
        },
    ];

    const links = role === "admin" ? adminLinks : userLinks;

    return (
        <aside
            className={`
                bg-base-100
                border-r
                border-base-300
                min-h-screen
                transition-all
                duration-300
                ${collapsed ? "w-20" : "w-64"}
            `}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4">
                {!collapsed && (
                    <h2 className="text-2xl font-bold">
                        Care.io
                    </h2>
                )}

                <button
                    onClick={() =>
                        setCollapsed(!collapsed)
                    }
                    className="btn btn-sm btn-ghost"
                >
                    {collapsed ? (
                        <FiMenu size={20} />
                    ) : (
                        <FiChevronLeft size={20} />
                    )}
                </button>
            </div>

            {/* Menu */}
            <ul className="menu w-full gap-2 px-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive =
                        pathname === link.href;

                    return (
                        <li
                            key={link.href}
                            className="relative group"
                        >
                            <Link
                                href={link.href}
                                className={`
                                    flex items-center
                                    ${collapsed
                                        ? "justify-center"
                                        : "gap-3"
                                    }
                                    ${isActive
                                        ? "active font-semibold"
                                        : ""
                                    }
                                `}
                            >
                                <Icon size={20} />

                                {!collapsed && (
                                    <span>
                                        {link.name}
                                    </span>
                                )}
                            </Link>

                            {/* Tooltip */}
                            {collapsed && (
                                <div
                                    className="
                                        absolute
                                        left-full
                                        top-1/2
                                        -translate-y-1/2
                                        ml-3
                                        whitespace-nowrap
                                        rounded-md
                                        bg-neutral
                                        px-3
                                        py-1
                                        text-neutral-content
                                        text-sm
                                        opacity-0
                                        invisible
                                        group-hover:opacity-100
                                        group-hover:visible
                                        transition
                                        z-50
                                    "
                                >
                                    {link.name}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}