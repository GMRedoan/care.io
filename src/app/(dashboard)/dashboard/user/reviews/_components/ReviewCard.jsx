import Animate from "@/components/reusable/Animate";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";

const ReviewCard = ({ review, onUpdate, onDelete }) => {
  return (
    <Animate type="zoom" className="group rounded-2xl border border-accent/50 bg-base-200 p-6 shadow-sm hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-primary">
            {review.serviceName}
          </h3>

          <p className="mt-1 text-xs text-accent">
            {new Date(review.createdAt).toLocaleDateString("en-BD", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 rounded-full bg-warning/10 px-3 py-1">
          <FaStar className="text-warning" />

          <span className="text-sm font-semibold text-warning">
            {review.rating}.0
          </span>
        </div>
      </div>

      {/* Stars */}
      <div className="mt-4 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={
              star <= review.rating ? "text-warning" : "text-accent/20"
            }
          />
        ))}
      </div>

      {/* Review */}
      <div className="mt-4 min-h-32 overflow-y-auto pr-2">
        <p className="text-sm leading-6 text-accent">
          {review.review}
        </p>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-accent/50" />

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => onUpdate(review)}
          className="btn btn-sm btn-outline btn-primary gap-2 rounded-xl"
        >
          <FaEdit />
          Update
        </button>

        <button
          type="button"
          onClick={() => onDelete(review)}
          className="btn btn-sm btn-outline btn-error gap-2 rounded-xl hover:text-white"
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </Animate>
  );
};

export default ReviewCard;
