"use client";

import Loader from "@/components/styles/Loader";

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen relative overflow-hidden">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-300/30 rounded-full blur-3xl animate-pulse"></div>

            <div>
                <Loader></Loader>
            </div>
            <p className="text-primary text-md tracking-wide mt-6 animate-ping">
                Loading care.io...
            </p>

        </div>
    );
};

export default Loading;
