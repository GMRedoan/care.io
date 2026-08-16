/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar, FaRegStar, FaTimes } from "react-icons/fa";
import { updateReview } from "@/server/review.service";
import Button1 from "@/components/reusable/Button1";
import { showToast } from "@/components/reusable/toastAlert";
import { useRouter } from "next/navigation";

const UpdateReviewModal = ({ review, onClose, onUpdated }) => {
    const router = useRouter();
  const [hoverRating, setHoverRating] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      rating: review?.rating || 0,
      review: review?.review || "",
    },
  });

  const rating = watch("rating");
  const reviewText = watch("review");

  useEffect(() => {
    if (review) {
      reset({
        rating: review.rating || 0,
        review: review.review || "",
      });
    }
  }, [review, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        rating: Number(data.rating),
        review: data.review.trim(),
      };

      const result = await updateReview(review._id, payload);

      if (!result.success) {
        showToast("error", result.message || "Failed to update review.");
        return;
      }
      onClose();
      router.refresh();
      await showToast("success", "Review updated successfully.");
      
    } catch (error) {
      showToast("error", error.message || "Something went wrong.");
    }
  };

  if (!review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-base-200 border border-accent p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              Update <span className="text-primary">Review</span>
            </h2>

            <p className="mt-1 text-sm text-accent">
              Update your experience with {review.serviceName}.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-circle btn-sm btn-ghost"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="mb-3 block text-sm font-medium">
              Your Rating
            </label>

            <input
              type="hidden"
              {...register("rating", {
                required: "Please select a rating.",
                validate: (value) =>
                  Number(value) > 0 || "Please select a rating.",
              })}
            />

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= (hoverRating || rating);

                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setValue("rating", star, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-2xl transition-transform hover:scale-110"
                  >
                    {active ? (
                      <FaStar className="text-warning" />
                    ) : (
                      <FaRegStar className="text-accent/40" />
                    )}
                  </button>
                );
              })}

              {rating > 0 && (
                <span className="ml-2 text-sm font-medium text-base-content/60">
                  {rating}/5
                </span>
              )}
            </div>

            {errors.rating && (
              <p className="mt-2 text-sm text-error">{errors.rating.message}</p>
            )}
          </div>

          {/* Review */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="update-review" className="text-sm font-medium">
                Your Review
              </label>

              <span className="text-xs text-base-content/50">
                {reviewText?.length || 0}/500
              </span>
            </div>

            <textarea
              id="update-review"
              rows={6}
              maxLength={500}
              placeholder="Tell us about your experience..."
              className={`border border-accent w-full focus:outline-none rounded-2xl px-5 py-2 ${
                errors.review ? "textarea-error" : "focus:border-primary"
              }`}
              {...register("review", {
                required: "Please write your review.",
                minLength: {
                  value: 10,
                  message: "Review must be at least 10 characters.",
                },
                maxLength: {
                  value: 500,
                  message: "Review cannot exceed 500 characters.",
                },
                validate: (value) =>
                  value.trim().length >= 10 ||
                  "Review must be at least 10 characters.",
              })}
            />

            {errors.review && (
              <p className="mt-2 text-sm text-error">{errors.review.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="btn btn-error rounded-xl text-white"
            >
              Cancel
            </button>

            <Button1 type="submit" disabled={isSubmitting} className="min-w-32">
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Updating...
                </span>
              ) : (
                "Update Review"
              )}
            </Button1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateReviewModal;
