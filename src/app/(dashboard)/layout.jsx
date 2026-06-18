import DashboardSidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <DashboardSidebar />

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}