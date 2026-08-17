"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/Sidebar";

export default function DashboardClient({ children, currentUser }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex">
      <DashboardSidebar
        currentUser={currentUser}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 min-w-0">
        <DashboardNavbar
          currentUser={currentUser}
          onOpenMobileSidebar={() => setMobileOpen(true)}
        />

        <main className="p-4 md:p-6 bg-base-200 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
