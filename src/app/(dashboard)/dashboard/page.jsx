import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/auth.service";

export default async function Dashboard() {
    const currentUser = await getCurrentUser();
     
    if (currentUser.role === "admin") {
        redirect("/dashboard/admin");
    }else {
        redirect("/dashboard/user");
    }
}