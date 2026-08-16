"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import Logo from "../HomeLayout/components/Logo";
import Animate from "../reusable/Animate";
import { MdAdminPanelSettings, MdPayment, MdReviews } from "react-icons/md";

export default function DashboardSidebar({ currentUser }) {
  const pathname = usePathname();
  const role = currentUser?.role || "user";
  const [collapsed, setCollapsed] = useState(false);

  const adminLinks = [
    {
      name: "Dashboard",
      href: "/dashboard/admin",
      icon: FiHome,
    },
    {
      name: "Users",
      href: "/dashboard/admin/users",
      icon: FiUsers,
    },
    {
      name: "All Bookings",
      href: "/dashboard/admin/allBookings",
      icon: FiCalendar,
    },
    {
      name: "Payment History",
      href: "/dashboard/admin/paymentHistory",
      icon: MdPayment,
    },
    {
      name: "All Reviews",
      href: "/dashboard/admin/reviews",
      icon: MdReviews,
    },
    {
      name: "Profile",
      href: "/dashboard/admin/profile",
      icon: FiSettings,
    },
  ];

  const userLinks = [
    {
      name: "Dashboard",
      href: "/dashboard/user",
      icon: FiHome,
    },
    {
      name: "My Bookings",
      href: "/dashboard/user/myBookings",
      icon: FiCalendar,
    },
    {
      name: "Payment History",
      href: "/dashboard/user/paymentHistory",
      icon: MdPayment,
    },
    {
      name: "My Reviews",
      href: "/dashboard/user/reviews",
      icon: MdReviews,
    },
    {
      name: "Profile",
      href: "/dashboard/user/profile",
      icon: FiSettings,
    },
  ];
  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <aside
      className={`
                sticky
                top-0
                h-screen
                shrink-0
                bg-base-200
                border-r
                border-accent
                min-h-screen
                transition-all
                duration-300
                ${collapsed ? "w-20" : "w-60"}
            `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2">
        {!collapsed && (
          <Animate type="fadeLeft" delay={0.3}>
            <Logo />
          </Animate>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hover:text-primary cursor-pointer pl-5"
        >
          {collapsed ? (
            <FiMenu className="mt-4" size={25} />
          ) : (
            <FiChevronLeft size={25} />
          )}
        </button>
      </div>

      {!collapsed ? (
        <div>
          <Animate type="fadeLeft" delay={0.5}>
            <div className="capitalize text-primary/90 font-semibold text-lg pb-12 pl-10">
              <span>{role}</span> Dashboard
            </div>
          </Animate>
        </div>
      ) : (
        <div className="text-primary flex justify-center pb-14 pt-6">
          <Link href={"/"}>
            <MdAdminPanelSettings size={27} />
          </Link>
        </div>
      )}

      {/* Menu */}
      <ul className="menu w-full gap-2 px-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <li key={link.href} className="relative group">
              <Link
                href={link.href}
                className={`
                                    flex items-center 
                                    ${collapsed ? "justify-center" : "gap-3"}
                                    ${
                                      isActive
                                        ? "bg-primary text-primary-content rounded-xl"
                                        : "hover:bg-primary/60 rounded-xl"
                                    }
                                `}
              >
                <Icon size={20} />

                {!collapsed && (
                  <Animate type="fadeLeft" delay={0.5}>
                    <span>{link.name}</span>
                  </Animate>
                )}
              </Link>

              {/* Tooltip */}
              {collapsed && (
                <Animate type="fadeLeft" delay={0.5}>
                  <div
                    className="
                                        absolute
                                        left-full
                                        top-1/2
                                        -translate-y-1/2
                                        ml-3
                                        whitespace-nowrap
                                        rounded-md
                                        bg-primary/70
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
                </Animate>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
