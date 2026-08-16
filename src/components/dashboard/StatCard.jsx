import React from "react";
import Animate from "../reusable/Animate";

const colorStyles = {
  primary: {
    iconBg: "bg-primary/10",
    icon: "text-primary",
  },
  secondary: {
    iconBg: "bg-secondary/10",
    icon: "text-secondary",
  },
  info: {
    iconBg: "bg-info/10",
    icon: "text-info",
  },
  success: {
    iconBg: "bg-success/10",
    icon: "text-success",
  },
  warning: {
    iconBg: "bg-warning/10",
    icon: "text-warning",
  },
  error: {
    iconBg: "bg-error/10",
    icon: "text-error",
  },
};

const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  color = "primary",
  valueClassName = "",
}) => {
  const styles = colorStyles[color] || colorStyles.primary;

  return (
    <Animate type="zoom" className="rounded-2xl border-x border-primary/70 bg-base-200/50 p-5 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm">{title}</p>

          <h2 className={`mt-2 text-2xl font-semibold ${valueClassName}`}>
            {value}
          </h2>
        </div>

        <div className={`rounded-xl p-3 ${styles.iconBg}`}>
          <Icon className={`text-xl ${styles.icon}`} />
        </div>
      </div>

      <p className="mt-4 text-xs text-accent">{description}</p>
    </Animate>
  );
};

export default StatsCard;
