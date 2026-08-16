/* eslint-disable react-hooks/incompatible-library */
"use client";

import { createReview } from "@/server/review.service";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar, FaRegStar, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";
import Button1 from "../reusable/Button1";
import { showToast } from "../reusable/toastAlert";

const GiveReview = ({ serviceId, serviceName }) => {
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
      rating: 0,
      review: "",
    },
  });

  const rating = watch("rating");
  const review = watch("review");

  const onSubmit = async (data) => {
    const payload = {
      serviceId,
      serviceName,
      rating: Number(data.rating),
      review: data.review.trim(),
      createdAt: new Date(),
    };

    try {
      const result = await createReview(payload);

      if (!result.success) {
        showToast(
          "error",
          result.message || "Something went wrong. Please try again.",
        );
        return;
      }

      reset();

      await Swal.fire({
        icon: "success",
        title: "Review submitted!",
        text: "Thank you for sharing your experience.",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      showToast("error", error.message || "Failed to submit your review.");
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto rounded-2xl border border-primary/30 bg-base-100/10 backdrop-blur-md p-6 shadow-sm md:px-10">
      {/* Background Glow */}
      <div className="absolute -bottom-50 left-0 w-76 h-76 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-50 right-10 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full" />

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Give Your <span className="text-primary">Review</span>
        </h2>

        <p className="mt-1 text-sm text-accent">
          Share your experience with this service.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="mb-3 block text-sm font-medium">Your Rating</label>

          {/* Hidden field for React Hook Form */}
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
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
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
            <label htmlFor="review" className="text-sm font-medium">
              Your Review
            </label>

            <span className="text-xs text-base-content/50">
              {review?.length || 0}/500
            </span>
          </div>

          <textarea
            id="review"
            rows={5}
            maxLength={500}
            placeholder="Tell us about your experience..."
            className={`border border-accent w-full focus:outline-none rounded-2xl px-5 py-2 ${
              errors.review ? "textarea-error" : "focus:border-primary"
            }`}
            {...register("review", {
              required: "Please write something about your experience.",
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

        {/* Submit */}
        <div className="flex">
          <Button1
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Submitting...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Submit Review
              </>
            )}
          </Button1>
        </div>
      </form>
    </section>
  );
};

export default GiveReview;
