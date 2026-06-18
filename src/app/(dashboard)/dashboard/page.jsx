"use client"

import { useSession } from "next-auth/react";
import AdminDashboard from "./admin/page";
import UserDashboard from "./user/page";
 
export default function DashboardPage() {
    const { data: session } = useSession();

    const role = session?.user?.role;

    return (
        <div className="p-10 bg-base-200 min-h-screen">
            {role === "admin" ? (
                <AdminDashboard />
            ) : (
                <UserDashboard />
            )}
        </div>
    );
}