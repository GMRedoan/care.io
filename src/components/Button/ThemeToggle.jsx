"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(null); // start as null
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        setTheme(savedTheme);
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    if (!mounted) return <span className="loading loading-spinner text-info"></span>;

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-xl"
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
}
