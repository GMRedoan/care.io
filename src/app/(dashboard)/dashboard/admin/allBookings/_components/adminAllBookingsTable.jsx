"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaCheck,
    FaTimes,
} from "react-icons/fa";
import { updateBookingStatus } from "@/server/booking.service";
import Animate from "@/components/reusable/Animate";
import { showToast } from "@/components/reusable/toastAlert";

const AdminAllBookingTable = ({ bookings }) => {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState("");

    const handleStatusUpdate = async (id, status) => {
        const result = await Swal.fire({
            title: `${status === "approved" ? "Approve" : "Reject"} Booking?`,
            text:
                status === "approved"
                    ? "The user will be able to complete payment."
                    : "This booking request will be rejected.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor:
                status === "approved" ? "#16a34a" : "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText:
                status === "approved" ? "Approve" : "Reject",
        });
        if (!result.isConfirmed) return;
        try {
            setLoadingId(id);
            const res = await updateBookingStatus(id, status);
            if (res.success) {
                showToast("success", res.message);
                router.refresh();
            } else {
                showToast("error", res.message);
            }
        } catch (error) {
            showToast("error", error.message);
        } finally {
            setLoadingId("");
        }
    };

    if (!bookings?.length) {
        return (
            <div className="min-h-100 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold">No bookings found.</h2>
                <p className="text-sm text-accent mt-2">
                    No one has made any bookings yet.
                </p>
            </div>
        );
    }

    return (
        <Animate className="overflow-x-auto rounded-xl shadow border-x border-accent">
            <table className="table table-zebra">
                <thead className="bg-base-100 text-primary">
                    <tr>
                        <th>No</th>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Duration</th>
                        <th>Location</th>
                        <th>Total Cost</th>
                        <th>Status</th>
                        <th>Requested On</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings?.map((booking, index) => (
                        <tr key={booking._id}>
                            <td>{index + 1}</td>

                            <td>
                                <div>
                                    <p className="font-semibold">{booking.userName}</p>
                                    <p className="text-xs text-gray-500">
                                        {booking.userEmail}
                                    </p>
                                </div>
                            </td>

                            <td className="font-medium">
                                {booking.serviceName}
                            </td>

                            <td>
                                {booking.duration} {booking.durationType}
                            </td>

                            <td>
                                <div>
                                    <p>{booking.location?.address}</p>
                                    <p className="text-xs text-gray-500">
                                        {booking.location?.city}
                                    </p>
                                </div>
                            </td>

                            <td className="font-semibold text-success">
                                ৳ {booking.totalCost.toLocaleString()}
                            </td>

                            <td>
                                {booking.status === "pending" && (
                                    <span className="badge badge-warning gap-2 text-white">
                                        <FaClock />
                                        Pending
                                    </span>
                                )}

                                {booking.status === "approved" && (
                                    <span className="badge badge-success gap-2 text-white">
                                        <FaCheckCircle />
                                        Approved
                                    </span>
                                )}

                                {booking.status === "rejected" && (
                                    <span className="badge badge-error gap-2 text-white">
                                        <FaTimesCircle />
                                        Rejected
                                    </span>
                                )}
                            </td>

                            <td>
                                {new Date(
                                    booking.createdAt
                                ).toLocaleDateString("en-BD", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </td>

                            <td>
                                {booking.status === "pending" ? (
                                    <div className="flex justify-center gap-2">

                                        <button
                                            className="btn btn-success btn-xs gap-1 text-white rounded-lg"
                                            disabled={loadingId === booking._id}
                                            onClick={() =>
                                                handleStatusUpdate(
                                                    booking._id,
                                                    "approved"
                                                )
                                            }
                                        >
                                            <FaCheck />

                                            {loadingId === booking._id
                                                ? "..."
                                                : "Approve"}
                                        </button>

                                        <button
                                            className="btn btn-error btn-xs gap-1 text-white rounded-lg"
                                            disabled={loadingId === booking._id}
                                            onClick={() =>
                                                handleStatusUpdate(
                                                    booking._id,
                                                    "rejected"
                                                )
                                            }
                                        >
                                            <FaTimes />

                                            {loadingId === booking._id
                                                ? "..."
                                                : "Reject"}
                                        </button>

                                    </div>
                                ) : booking.status === "approved" ? (
                                    <span className="badge badge-success badge-outline">
                                        Approved
                                    </span>
                                ) : (
                                    <span className="badge badge-error badge-outline">
                                        Rejected
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Animate>
    );
};

export default AdminAllBookingTable;