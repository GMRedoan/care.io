"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/Sidebar";

export default function DashboardClient({
    children,
    currentUser,
}) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="flex">
            <DashboardSidebar
                currentUser={currentUser}
                collapsed={collapsed}
            />

            <div className="flex-1">
                <DashboardNavbar
                    currentUser={currentUser}
                    onToggleSidebar={() =>
                        setCollapsed(!collapsed)
                    }
                />

                <main className="p-6 bg-base-200 min-h-[calc(100vh-64px)]">
                    {children}
                </main>
            </div>
        </div>
    );
}