"use client";

import Loader from "@/components/reusable/Loader";

const Loading = () => {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen relative overflow-hidden bg-base-200">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-300/30 rounded-full blur-3xl animate-pulse"></div>

        <div>
          <Loader />
        </div>
        <div className="flex items-center justify-center mt-6 gap-2">
          <p className="text-primary text-sm font-medium tracking-wide">
            Loading care.io
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

export default Loading;
