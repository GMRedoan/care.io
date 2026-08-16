"use client"

import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import UpdateReviewModal from './UpdateReviewModal';
import { deleteReview } from '@/server/review.service';
import { useRouter } from 'next/navigation';
import { showToast } from '@/components/reusable/toastAlert';
import Swal from 'sweetalert2';

const ReviewManager = ({reviews}) => {
    const router = useRouter();
    const [selectedReview, setSelectedReview] = useState(null);

      const handleDelete = async (review) => {
        const result = await Swal.fire({
          title: "Delete this review?",
          text: "This action cannot be undone.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it",
          cancelButtonText: "Cancel",
          confirmButtonColor: "#ef4444",
          cancelButtonColor: "#6b7280",
          reverseButtons: true,
        });

        // User clicked Cancel
        if (!result.isConfirmed) {
          return;
        }

        try {
          const response = await deleteReview(review._id);

          if (!response.success) {
            showToast("error", response.message || "Failed to delete review.");
            return;
          }
          router.refresh();
          // Success alert
        showToast("success", "Review deleted successfully."); 
        
        } catch (error) {
          showToast("error", error.message || "Something went wrong.");
        }
      };

    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">
            My <span className="text-primary">Reviews</span>
          </h1>
          <p className="mt-2 text-sm text-accent">
            Share your experience, manage your feedback, and keep track of the
            reviews you&apos;ve shared.
          </p>
        </div>

        {reviews.length === 0 ? (
          <h2 className="text-center py-50 font-medium text-sm text-accent">
            No reviews found. please add your first review <br /> from service
            details.
          </h2>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                onUpdate={(review) => setSelectedReview(review)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
        {selectedReview && (
          <UpdateReviewModal
            review={selectedReview}
            onClose={() => setSelectedReview(null)}
          />
        )}
      </div>
    );
};

export default ReviewManager;