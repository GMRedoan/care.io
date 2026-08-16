const ReviewCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-accent/20 bg-base-200 p-6 shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          {/* Service name */}
          <div className="h-5 w-32 rounded bg-accent/30" />

          {/* Date */}
          <div className="h-3 w-24 rounded bg-accent/30" />
        </div>

        {/* Rating badge */}
        <div className="h-7 w-16 rounded-full bg-accent/30" />
      </div>

      {/* Stars */}
      <div className="mt-4 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="h-4 w-4 rounded-full bg-accent/30" />
        ))}
      </div>

      {/* Review */}
      <div className="mt-4 h-32 space-y-2 overflow-hidden">
        <div className="h-3 w-full rounded bg-accent/30" />
        <div className="h-3 w-[95%] rounded bg-accent/30" />
        <div className="h-3 w-[85%] rounded bg-accent/30" />
        <div className="h-3 w-[90%] rounded bg-accent/30" />
        <div className="h-3 w-[65%] rounded bg-accent/30" />
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-accent/10" />

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <div className="h-8 w-20 rounded-btn bg-accent/30" />
        <div className="h-8 w-20 rounded-btn bg-accent/30" />
      </div>
    </div>
  );
};

export default ReviewCardSkeleton;
