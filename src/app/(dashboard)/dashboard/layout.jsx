import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/auth.service";
import DashboardClient from "./DashboardClient";

export default async function DashboardLayout({ children }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  return (
    <DashboardClient currentUser={currentUser}>
      {children}
    </DashboardClient>
  );
}