import { getCurrentUser } from "@/server/user.service";
import DashboardClient from "./_components/DashboardClient";

export default async function DashboardLayout({ children }) {
  const currentUser = await getCurrentUser();
 
  return (
    <DashboardClient currentUser={currentUser}>
      {children}
    </DashboardClient>
  );
}