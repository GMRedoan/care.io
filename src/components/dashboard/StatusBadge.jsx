export const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      label: "Pending",
      className: "bg-warning/10 text-warning border-warning/20",
      dot: "bg-warning",
    },

    approved: {
      label: "Approved",
      className: "bg-success/10 text-success border-success/20",
      dot: "bg-success",
    },

    cancelled: {
      label: "Cancelled",
      className: "bg-error/10 text-error border-error/20",
      dot: "bg-error",
    },
  };

  const config = statusConfig[status] || {
    label: status || "Unknown",
    className: "bg-accent/10 text-accent border-accent/20",
    dot: "bg-accent",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${config.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />

      {config.label}
    </span>
  );
};
