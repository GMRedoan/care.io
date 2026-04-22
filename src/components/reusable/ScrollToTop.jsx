"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-100 bg-linear-to-bl from-blue-500 to-cyan-300 text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer hover:from-blue-600 hover:to-cyan-400"
        >
            <FaArrowUp className="bounce-custom"/>
        </button>
    );
}