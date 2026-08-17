"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCheck,
  FaTimes,
  FaFilter,
  FaSearch,
} from "react-icons/fa";
import { updateBookingStatus } from "@/server/booking.service";
import Animate from "@/components/reusable/Animate";
import { showToast } from "@/components/reusable/toastAlert";
import Pagination from "@/components/shared/Pagination";

const AdminAllBookingTable = ({ bookings }) => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        !searchValue ||
        booking?.userName?.toLowerCase().includes(searchValue) ||
        booking?.userEmail?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  // pagination
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBookings, currentPage]);

  const handleStatusUpdate = async (id, status) => {
    const result = await Swal.fire({
      title: `${status === "approved" ? "Approve" : "Reject"} Booking?`,
      text:
        status === "approved"
          ? "The user will be able to complete payment."
          : "This booking request will be rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: status === "approved" ? "Approve" : "Reject",
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

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-accent" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-xl border border-accent/20 bg-base-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <FaFilter className="text-sm text-accent" />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-sm rounded-xl border-accent/20 bg-base-200 text-sm focus:border-primary focus:outline-none"
          >
            <option value="all">All Bookings</option>

            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      {/* Result information */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-accent">
          Showing{" "}
          <span className="font-medium text-base-content">
            {filteredBookings.length}
          </span>{" "}
          {filteredBookings.length === 1 ? "booking" : "bookings"}
        </p>

        {(search || statusFilter !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
            }}
            className="text-xs text-primary cursor-pointer"
          >
            Clear filters
          </button>
        )}
      </div>
      {paginatedBookings.length === 0 ? (
        <div className="min-h-100 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold">No bookings found.</h2>
          <p className="text-sm text-accent mt-2">
            No one has made any bookings yet.
          </p>
        </div>
      ) : (
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
              {paginatedBookings?.map((booking, index) => (
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

                  <td className="font-medium">{booking.serviceName}</td>

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
                    {new Date(booking.createdAt).toLocaleDateString("en-BD", {
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
                            handleStatusUpdate(booking._id, "approved")
                          }
                        >
                          <FaCheck />

                          {loadingId === booking._id ? "..." : "Approve"}
                        </button>

                        <button
                          className="btn btn-error btn-xs gap-1 text-white rounded-lg"
                          disabled={loadingId === booking._id}
                          onClick={() =>
                            handleStatusUpdate(booking._id, "rejected")
                          }
                        >
                          <FaTimes />

                          {loadingId === booking._id ? "..." : "Reject"}
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
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default AdminAllBookingTable;
