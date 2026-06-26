import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/auth.service";

export default async function AdminDashboard() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/");
    }

    if (user.role !== "admin") {
        redirect("/dashboard/user");
    }

    return <div>Admin Dashboard</div>;
}