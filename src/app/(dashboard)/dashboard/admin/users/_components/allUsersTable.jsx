"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import {
    FaUserCheck,
    FaUserSlash,
    FaUserShield,
} from "react-icons/fa";
import Animate from "@/components/reusable/Animate";
import { updateUserStatus } from "@/server/user.service";
import { showToast } from "@/components/reusable/toastAlert";

const AllUsersTable = ({ users, currentUser }) => {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState("");

    const handleStatus = async (userId, status, name) => {
        const result = await Swal.fire({
            title:
                status === "blocked"
                    ? "Block this user?"
                    : "Activate this user?",
            text:
                status === "blocked"
                    ? `${name} won't be able to access the platform.`
                    : `${name} will regain access to the platform.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor:
                status === "blocked" ? "#dc2626" : "#16a34a",
            cancelButtonColor: "#6b7280",
            confirmButtonText:
                status === "blocked" ? "Block" : "Activate",
        });

        if (!result.isConfirmed) return;

        try {
            setLoadingId(userId);
            const res = await updateUserStatus(userId, status);
            if (res.success) {
                showToast("success", res.message);
                router.refresh();
            } else {
                showToast("error", res.message);
            }
        } catch (error) {
            showToast("error", res.message);
        } finally {
            setLoadingId("");
        }
    };

    if (users.length === 0){
        return (
            <div className="text-center">
                <p className="text-2xl font-semibold">No users found.</p>
            </div>
        )
    }

    return (
        <Animate className="overflow-x-auto rounded-xl shadow border-x border-accent">
            <table className="table table-zebra">
                <thead className="bg-base-100 text-primary">
                    <tr>
                        <th>No</th>
                        <th>User</th>
                        <th>Contact</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users?.map((user, index) => {
                        const isCurrentUser = currentUser.id === user._id;

                        return (
                            <tr key={user._id}>
                                <td>{index + 1}</td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={user.image}
                                            alt={user.name}
                                            width={45}
                                            height={45}
                                            className="rounded-full"
                                        />

                                        <div>
                                            <p className="font-semibold">
                                                {user.name}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div>
                                        <p>{user.contact || "N/A"}</p>
                                        <p className="text-xs text-gray-500">
                                            NID: {user.nid || "N/A"}
                                        </p>
                                    </div>
                                </td>

                                <td>
                                    {user.role === "admin" ? (
                                        <span className="badge badge-primary gap-1">
                                            <FaUserShield />
                                            Admin
                                        </span>
                                    ) : (
                                        <span className="badge badge-outline px-7">
                                            User
                                        </span>
                                    )}
                                </td>

                                <td>
                                    {user.status === "active" ? (
                                        <span className="badge badge-success text-white">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="badge badge-error text-white">
                                            Blocked
                                        </span>
                                    )}
                                </td>

                                <td>
                                    {new Date(user.createdAt).toLocaleDateString(
                                        "en-BD",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </td>

                                <td className="text-center">
                                    {isCurrentUser ? (
                                        <button
                                            className="btn btn-disabled btn-xs"
                                            disabled
                                        >
                                            Your Account
                                        </button>
                                    ) : user.status === "active" ? (
                                        <button
                                            onClick={() =>
                                                handleStatus(
                                                    user._id,
                                                    "blocked",
                                                    user.name
                                                )
                                            }
                                            disabled={loadingId === user._id}
                                            className="btn btn-error btn-xs gap-2 text-white rounded-lg px-4"
                                        >
                                            <FaUserSlash />
                                            {loadingId === user._id
                                                ? "..."
                                                : "Block"}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleStatus(
                                                    user._id,
                                                    "active",
                                                    user.name
                                                )
                                            }
                                            disabled={loadingId === user._id}
                                            className="btn btn-success btn-xs gap-2 text-white rounded-lg"
                                        >
                                            <FaUserCheck />
                                            {loadingId === user._id
                                                ? "..."
                                                : "Activate"}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Animate>
    );
};

export default AllUsersTable;