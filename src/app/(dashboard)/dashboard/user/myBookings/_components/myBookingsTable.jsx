"use client";

import Animate from "@/components/reusable/Animate";
import Link from "next/link";
import {
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaCreditCard,
} from "react-icons/fa";

const MyBookingsTable = ({ bookings }) => {
    if (!bookings?.length) {
        return (
            <div className="min-h-100 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold">No bookings found.</h2>
                <p className="text-sm text-accent mt-2">
                    You have not made any bookings yet.
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
                        <th>Service</th>
                        <th>Duration</th>
                        <th>Location</th>
                        <th></th>
                        <th>Total Cost</th>
                        <th>Status</th>
                        <th>Booked On</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={booking._id}>
                            <td>{index + 1}</td>

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
                                        Awaiting Approval
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Animate>
    );
};

export default MyBookingsTable;