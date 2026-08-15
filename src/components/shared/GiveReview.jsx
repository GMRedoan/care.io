"use client";

import { createReview } from "@/server/review.service";
import { useState } from "react";
import { FaStar, FaRegStar, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";
import Button1 from "../reusable/Button1";

const GiveReview = ({ serviceId, serviceName }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      return Swal.fire({
        icon: "warning",
        title: "Rating required",
        text: "Please select a rating before submitting your review.",
      });
    }

    if (!review.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Review required",
        text: "Please write something about your experience.",
      });
    }

    if (review.trim().length < 10) {
      return Swal.fire({
        icon: "warning",
        title: "Review is too short",
        text: "Please write at least 10 characters.",
      });
    }

    setLoading(true);

    const payload = {
      serviceId,
      serviceName,
      rating,
      review: review.trim(),
      createdAt: new Date(),
    };

    const result = await createReview(payload);

    setLoading(false);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Review submitted!",
        text: "Thank you for sharing your experience.",
        timer: 1800,
        showConfirmButton: false,
      });

      setRating(0);
      setReview("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Unable to submit",
        text: result.message || "Something went wrong.",
      });
    }
  };

  return (
    <section className="rounded-2xl border border-accent/20 bg-base-200 p-6 shadow-sm max-w-7xl mx-24 px-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Give Your <span className="text-primary">Review</span>
        </h2>

        <p className="mt-1 text-sm text-accent">
          Share your experience with this service.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="mb-3 block text-sm font-medium">Your Rating</label>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = star <= (hoverRating || rating);

              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
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
        </div>

        {/* Review */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="review" className="text-sm font-medium">
              Your Review
            </label>

            <span className="text-xs text-base-content/50">
              {review.length}/500
            </span>
          </div>

          <textarea
            id="review"
            value={review}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setReview(e.target.value);
              }
            }}
            placeholder="Tell us about your experience..."
            rows={5}
            className="textarea textarea-bordered w-full resize-none focus:border-primary focus:outline-none"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button1
            type="submit"
            className="flex items-center gap-2 font-medium"
          >
            {loading ? (
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
