"use client";

import Animate from "@/components/reusable/Animate";
import Button1 from "@/components/reusable/Button1";
import { showToast } from "@/components/reusable/toastAlert";
import { deleteBooking } from "@/server/booking.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaCreditCard,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { RiFirefoxFill } from "react-icons/ri";

const MyBookingsTable = ({ bookings }) => {
    const router = useRouter();
    const handleCancelBooking = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Cancel",
        });
        if (!result.isConfirmed) return;
        try {
            const res = await deleteBooking(id);
            if (res.success) {
                showToast("success", res.message);
                router.refresh();
            } else {
                showToast("error", res.message);
            }
        } catch (error) {
            showToast("error", error.message);
        }
    }

    if (!bookings?.length) {
        return (
          <div className="min-h-100 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold">No bookings found.</h2>
            <p className="text-sm text-accent mt-2 mb-5">
              You have not made any bookings yet.
            </p>
            <Button1>
              <Link
              className="flex items-center gap-2"
               href="/services">
                Browse Services <RiFirefoxFill />
              </Link>
            </Button1>
          </div>
        );
    }

    return (
        <Animate className="overflow-x-auto rounded-xl shadow border-x border-accent">
            <table className="table table-zebra">
                <thead className="bg-base-100 text-primary">
                    <tr>
                        <th>Service</th>
                        <th>Duration</th>
                        <th>Location</th>
                        <th></th>
                        <th>Total Cost</th>
                        <th>Status</th>
                        <th>Booked On</th>
                        <th>Payment</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={booking._id}>
                            <td className="font-semibold">{booking.serviceName}</td>

                            <td>
                                {booking.duration} {booking.durationType}
                            </td>

                            <td>
                                <div>
                                    <p>{booking.location?.district}</p>
                                    <span className="text-xs text-accent">
                                        {booking.location?.city} {" "}{booking.location?.address}                     </span>
                                </div>
                            </td>
                            <td>
                            </td>

                            <td className="font-medium text-success">
                                ৳ {booking.totalCost.toLocaleString()}
                            </td>

                            <td>
                                {booking.status === "pending" && (
                                    <span className="badge badge-warning gap-2 text-white font-normal py-4">
                                        <FaClock />
                                        Pending
                                    </span>
                                )}

                                {booking.status === "approved" && (
                                    <span className="badge badge-success gap-2 text-white font-normal py-4">
                                        <FaCheckCircle />
                                        Approved
                                    </span>
                                )}

                                {booking.status === "cancelled" && (
                                    <span className="badge badge-error gap-2">
                                        <FaTimesCircle />
                                        Cancelled
                                    </span>
                                )}
                            </td>

                            <td>
                                {new Date(booking.createdAt).toLocaleDateString("en-BD", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </td>

                            <td>
                                {booking.status === "approved" ? (
                                    <Link
                                        href={`/dashboard/payment/${booking._id}`}
                                        className="btn btn-success text-white font-normal btn-sm gap-2"
                                    >
                                        <FaCreditCard />
                                        Pay Now
                                    </Link>
                                ) : (
                                    <button
                                        className="btn btn-disabled btn-sm gap-2 font-normal"
                                        disabled
                                    >
                                        <FaCreditCard />
                                        Pay Now
                                    </button>
                                )}
                            </td>
                            <td>
                                <button
                                onClick={() => handleCancelBooking(booking._id)}
                                 className="btn btn-sm btn-error text-white">
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Animate>
    );
};

export default MyBookingsTable;