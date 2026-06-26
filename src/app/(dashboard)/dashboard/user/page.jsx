import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/auth.service";

export default async function UserDashboard() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/");
    }

    if (user.role !== "user") {
        redirect("/dashboard/admin");
    }

    return <div>User Dashboard</div>;
}