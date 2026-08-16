import Loader from "@/components/reusable/Loader";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen relative overflow-hidden bg-base-200">
      <div>
        <Loader />
      </div>
      <div className="flex items-center justify-center mt-6 gap-2">
        <p className="text-primary text-sm font-medium tracking-wide">
          Loading Dashboard
        </p>
        <div className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1 w-1 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1 w-1 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default loading;
