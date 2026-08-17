"use client";

import React, { useMemo, useState } from "react";
import { FaSearch, FaStar, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { deleteReview } from "@/server/review.service";
import { showToast } from "@/components/reusable/toastAlert";
import Animate from "@/components/reusable/Animate";
import Pagination from "@/components/shared/Pagination";

const AdminReviewTable = ({ reviews }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // filter users
  const filteredReviews = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchesSearch =
        !searchValue ||
        review.userName?.toLowerCase().includes(searchValue) ||
        review.userEmail?.toLowerCase().includes(searchValue);

      return matchesSearch;
    });
  }, [reviews, search]);

  // pagination
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);

  const paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredReviews.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredReviews, currentPage]);

  const handleDelete = async (review) => {
    const result = await Swal.fire({
      title: "Delete this review?",
      text: "This review will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setDeletingId(review._id);

      const response = await deleteReview(review._id);

      if (!response.success) {
        showToast("error", response.message || "Failed to delete review.");
        return;
      }

      showToast("success", "Review deleted successfully.");

      router.refresh();
    } catch (error) {
      showToast("error", error.message || "Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {/* Search */}
      <div className="relative w-full md:max-w-md mb-4">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-accent" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-xl border border-accent/20 bg-base-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      {paginatedReviews.length === 0 ? (
        <div className="rounded-2xl border border-accent/20 bg-base-200 py-20 text-center">
          <p className="text-sm font-medium text-accent">No reviews found.</p>
        </div>
      ) : (
        <Animate className="overflow-x-auto rounded-2xl border-x border-accent shadow-sm">
          <table className="table table-zebra">
            <thead className="bg-base-100 text-primary">
              <tr>
                <th>No</th>
                <th>Service</th>
                <th>Review</th>
                <th>Reviewer</th>
                <th>Reviewed On</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedReviews.map((review, index) => (
                <tr key={review._id}>
                  {/* No */}
                  <td className="font-medium">{index + 1}</td>

                  {/* Service */}
                  <td>
                    <p className="font-semibold">{review.serviceName}</p>
                  </td>

                  {/* Review & ratings*/}
                  <td className="max-w-md">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5 text-xs">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={
                              star <= review.rating
                                ? "text-warning"
                                : "text-accent/20"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <div className="max-h-20 overflow-y-auto pr-2">
                      <p className="text-sm leading-6 text-accent">
                        {review.review}
                      </p>
                    </div>
                  </td>

                  {/* Reviewer */}
                  <td>
                    <p className="text-sm font-medium">{review.userName}</p>
                    <p className="text-xs text-accent">{review.userEmail}</p>
                  </td>

                  {/* Date */}
                  <td>
                    <span className="text-sm text-accent">
                      {new Date(review.createdAt).toLocaleDateString("en-BD", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>

                  {/* Action */}
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(review)}
                      disabled={deletingId === review._id}
                      className="btn btn-sm btn-error gap-2 text-white rounded-xl"
                    >
                      {deletingId === review._id ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <FaTrash />
                          Delete
                        </>
                      )}
                    </button>{" "}
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

export default AdminReviewTable;
