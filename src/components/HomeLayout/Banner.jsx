"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { FaShieldAlt, FaUserCheck, FaBolt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { MdOutlineWebhook } from "react-icons/md";
import { CgMoreVertical } from "react-icons/cg";

import Button1 from "../reusable/Button1";
import { Playfair_Display } from "next/font/google";

const play = Playfair_Display({
    subsets: ["latin"],
    weight: ["700"],
});

const images = [
    "https://i.ibb.co.com/N2Jk4KdY/un1.jpg",
    "https://i.ibb.co.com/Wv1Md9rM/un2.jpg",
    "https://i.ibb.co.com/S4MM9W8c/un3.jpg",
];

const Banner = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleClick1 = (e) => {
        e.preventDefault();
        document
            .getElementById("service")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    const handleClick2 = (e) => {
        e.preventDefault();
        document
            .getElementById("aboutUs")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="BannerSection"
            className="relative h-screen overflow-hidden bg-gray-950 text-white"
        >
            {/* Background Images */}
            {images.map((img, index) => (
                <motion.div
                    key={index}
                    className="absolute inset-0"
                    animate={{
                        opacity: current === index ? 1 : 0,
                        scale: current === index ? 1 : 1.05,
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                    }}
                >
                    <Image
                        src={img}
                        alt="Care Service"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                </motion.div>
            ))}


            <div className="absolute inset-0 bg-black/60" />

            {/* Glow Effect */}

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-cyan-500/20 blur-[180px] rounded-full" />

            {/* Main Content */}
            <motion.div
                className="relative z-10 flex items-center h-full"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}

            >

                ```
                <div className="max-w-7xl mx-auto w-full">
                    ```

                    ```
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT CONTENT */}
                        <div className="text-center lg:text-left">

                            <motion.div
                                initial={{ opacity: 0, y: -15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
                            >
                                <HiSparkles className="text-cyan-400 animate-pulse" />

                                <span className="text-sm font-medium tracking-wide">
                                    Trusted by 25,000+ Families
                                </span>
                            </motion.div>

                            {/* Heading */}
                            <motion.h1
                                className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-linear-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <p className={`${play.className}`}>
                                    Care That Truly
                                    <br />
                                    Feels Like Family
                                </p>
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                className="mt-8 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed mx-auto lg:mx-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                Instantly connect with verified caregivers for children,
                                seniors, and loved ones — secure, reliable, and stress-free.
                            </motion.p>

                            {/* Buttons */}
                            <motion.div
                                className="mt-10 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <Button1
                                    onClick={handleClick1}
                                    className="px-8 py-4 font-semibold flex items-center gap-2"
                                >
                                    Get Started
                                    <MdOutlineWebhook className="animate-spin text-xl" />
                                </Button1>

                                <button
                                    onClick={handleClick2}
                                    className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2 justify-center hover:scale-[1.03] cursor-pointer"
                                >
                                    Learn More
                                    <CgMoreVertical className="text-cyan-400" />
                                </button>
                            </motion.div>
                        </div>

                        {/* RIGHT CARDS */}
                        <div className="relative hidden lg:block h-125">

                            {/* Card 1 */}
                            <motion.div
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 }}
                                
                                className="absolute top-0 right-20 w-80 p-8 rounded-3xl
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:-translate-y-3 duration-500"
                            >
                                <FaUserCheck className="text-5xl text-cyan-400 mb-5" />

                                <h3 className="text-xl font-bold mb-3">
                                    Verified Caregivers
                                </h3>

                                <p className="text-gray-300">
                                    Every caregiver is background-checked and reviewed for
                                    safety and trust.
                                </p>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2 }}
                                 
                                className="absolute top-36 right-0 w-80 p-8 rounded-3xl
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:-translate-y-3 duration-500"
                            >
                                <FaBolt className="text-5xl text-cyan-400 mb-5" />

                                <h3 className="text-xl font-bold mb-3">
                                    Instant Booking
                                </h3>

                                <p className="text-gray-300">
                                    Book trusted caregivers instantly with a few simple clicks.
                                </p>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.4 }}
                                 
                                className="absolute top-72 right-24 w-80 p-8 rounded-3xl
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:-translate-y-3 duration-500"
                            >
                                <FaShieldAlt className="text-5xl text-cyan-400 mb-5" />

                                <h3 className="text-xl font-bold mb-3">
                                    Secure Platform
                                </h3>

                                <p className="text-gray-300">
                                    Protected payments and encrypted communication for peace
                                    of mind.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
                ```

            </motion.div>

            {/* BEAUTIFUL WAVE */}

            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">

                ```
                <svg
                    viewBox="0 0 1440 320"
                    className="absolute bottom-0 w-full h-32 opacity-20"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#ffffff"
                        d="M0,224L80,208C160,192,320,160,480,149.3C640,139,800,149,960,176C1120,203,1280,245,1360,266.7L1440,288L1440,320L0,320Z"
                    />
                </svg>

                <svg
                    viewBox="0 0 1440 320"
                    className="absolute bottom-0 w-full h-40 opacity-40"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,160L60,149.3C120,139,240,117,360,122.7C480,128,600,160,720,170.7C840,181,960,171,1080,154.7C1200,139,1320,117,1380,106.7L1440,96L1440,320L0,320Z"
                        className="fill-base-200"
                    />
                </svg>

                <svg
                    viewBox="0 0 1440 320"
                    className="relative block w-full h-28 translate-y-4"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,128L80,149.3C160,171,320,213,480,218.7C640,224,800,192,960,165.3C1120,139,1280,117,1360,106.7L1440,96L1440,320L0,320Z"
                        className="fill-base-200"
                    />
                </svg>
                ```

            </div>
        </section>
    );
};

export default Banner;