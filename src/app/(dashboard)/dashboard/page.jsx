import { getCurrentUser } from "@/server/user.service";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const currentUser = await getCurrentUser();
     
    if (currentUser.role === "admin") {
        redirect("/dashboard/admin");
    }else {
        redirect("/dashboard/user");
    }
}