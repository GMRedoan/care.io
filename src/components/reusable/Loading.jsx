const LoadingSkeleton = () => {
  const skeletonRows = Array.from({ length: 6 });

  return (
    <div className="overflow-x-auto rounded-xl shadow border-x border-accent my-20">
      <table className="table table-zebra">
        <tbody>
          {skeletonRows.map((_, index) => (
            <tr key={index}>
              {/* No */}
              <td>
                <div className="h-4 w-5 rounded bg-accent/30 animate-pulse" />
              </td>

              {/* Service */}
              <td>
                <div className="h-4 w-28 rounded bg-accent/30 animate-pulse" />
              </td>

              {/* Duration */}
              <td>
                <div className="h-4 w-20 rounded bg-accent/30 animate-pulse" />
              </td>

              {/* Location */}
              <td>
                <div className="space-y-2">
                  <div className="h-4 w-20 rounded bg-accent/30 animate-pulse" />
                  <div className="h-3 w-40 rounded bg-accent/30 animate-pulse" />
                </div>
              </td>

              {/* Empty column */}
              <td>
                <div className="h-4 w-6 rounded bg-accent/30 animate-pulse" />
              </td>

              {/* Total Cost */}
              <td>
                <div className="h-4 w-24 rounded bg-accent/30 animate-pulse" />
              </td>

              {/* Status */}
              <td>
                <div className="h-8 w-24 rounded-full bg-accent/30 animate-pulse" />
              </td>

              {/* Booked On */}
              <td>
                <div className="h-4 w-24 rounded bg-accent/30 animate-pulse" />
              </td>

              {/* Action */}
              <td>
                <div className="h-8 w-28 rounded bg-accent/30 animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingSkeleton;
