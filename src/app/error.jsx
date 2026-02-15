"use client"
import Link from 'next/link';
import React from 'react';
 
const error = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">

            {/* Soft Glow Effects */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-300/30 rounded-full blur-3xl"></div>

            {/* Glass Card */}
            <div className="relative text-center backdrop-blur-xl rounded-3xl shadow-2xl p-10 md:p-16 max-w-xl w-full">

                {/* 404 Number */}
                <h1 className="text-7xl md:text-8xl font-extrabold text-white tracking-widest drop-shadow-lg">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-red-500 mt-4">
                    Oops! Page Not Found
                </h2>

                {/* Description */}
                <p className="text-white/80 mt-4 leading-relaxed">
                    The page you are looking for might have been removed,
                    had its name changed, or is temporarily unavailable.
                    Let’s take you back home safely.
                </p>

                {/* Button */}
                <Link
                    href="/"
                    className="inline-block mt-8 px-8 py-3 rounded-xl bg-linear-to-bl from-blue-700 to-cyan-300 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
                >
                    Go Back Home 
                </Link>

            </div>
        </div>    );
};

export default error;