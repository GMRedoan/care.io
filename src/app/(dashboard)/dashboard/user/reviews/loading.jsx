import ReviewCardSkeleton from "./_components/ReviewCardSkeleton";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mt-10">
      {Array.from({ length: 6 }).map((_, index) => (
        <ReviewCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default Loading;
