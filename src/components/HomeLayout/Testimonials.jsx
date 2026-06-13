"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FaQuoteLeft } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import Animate from "../reusable/Animate";

const reviews = [
    {
        text: "Finding reliable care for my elderly father was stressful, but this platform made it simple and secure. We finally have peace of mind.",
        name: "Sarah M.",
    },
    {
        text: "The caregivers are professional and compassionate. Booking was incredibly easy and fast.",
        name: "David R.",
    },
    {
        text: "Amazing service! I was able to find trusted care for my mother within minutes.",
        name: "Emily R.",
    },
];

const Testimonials = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.3,
    });

    const [index, setIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        setAnimating(true);

        setTimeout(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
            setAnimating(false);
        }, 400);
    };

    const current = reviews[index];
    const nextItem = reviews[(index + 1) % reviews.length];

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 3000);

        return () => clearInterval(interval);
    }, [index]);

    return (
        <section
            ref={ref}
            className="relative bg-base-200 py-18 md:py-28 pb-40 px-6 md:px-16 overflow-hidden"
        >
            {/* Background glow */}
            <div className="absolute -bottom-32 right-10 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full opacity-40" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* TITLE */}
                <Animate className="text-center mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-linear-to-r from-base-300 via-cyan-400 to-base-300 bg-clip-text text-transparent">
                        Trusted by Thousands of Families
                    </h2>

                    <p className="mt-6 text-accent max-w-2xl mx-auto text-lg">
                        Real experiences. Real families. Real impact.
                    </p>
                </Animate>

                {/* MAIN GRID */}
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    {/* LEFT - STATS */}
                    <Animate type="fadeLeft" className="grid grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-4xl md:text-5xl font-extrabold text-cyan-500">
                                {inView && <CountUp end={25} duration={4} />}K+
                            </h3>
                            <p className="text-gray-500">Families Served</p>
                        </div>

                        <div>
                            <h3 className="text-4xl md:text-5xl font-extrabold text-blue-500">
                                {inView && <CountUp end={5000} duration={3} />}+
                            </h3>
                            <p className="text-gray-500">Verified Caregivers</p>
                        </div>

                        <div>
                            <h3 className="text-4xl md:text-5xl font-extrabold text-cyan-500">
                                {inView && <CountUp end={98} duration={3} />}%
                            </h3>
                            <p className="text-gray-500">Satisfaction Rate</p>
                        </div>

                        <div>
                            <h3 className="text-4xl md:text-5xl font-extrabold text-blue-500">
                                {inView && <CountUp end={24} duration={3} />}/7
                            </h3>
                            <p className="text-gray-500">Support Available</p>
                        </div>
                    </Animate>

                    {/* RIGHT - SLIDER TESTIMONIAL */}
                    <Animate type="fadeRight" className="relative w-full max-w-md mx-auto">

                        {/* NEXT CARD (background preview) */}
                        <div className="absolute top-3 left-4 w-full h-full border border-base-300 rounded-3xl p-8 scale-95 opacity-60 bg-white/10 backdrop-blur-md -rotate-10">
                            <FaQuoteLeft className="text-cyan-500 text-2xl mb-3" />
                            <p className="text-gray-500 text-sm min-h-20">
                                “{nextItem.text}”
                            </p>
                            <div className="mt-6 font-semibold text-gray-400">
                                — {nextItem.name}
                            </div>
                        </div>

                        {/* CURRENT CARD */}
                        <div
                            onClick={next}
                            className={`relative cursor-pointer bg-white/10 backdrop-blur-sm shadow-2xl border border-accent p-8 rounded-3xl transition-all duration-500
              ${animating ? "-translate-x-6 -translate-y-4 opacity-0" : "translate-x-0 opacity-100"}
              hover:scale-[1.02] rotate-10`}
                        >
                            <FaQuoteLeft className="text-cyan-500 text-3xl mb-4" />

                            <p className="text-base-300 leading-relaxed min-h-20">
                                “{current.text}”
                            </p>

                            <div className="mt-6 font-semibold text-accent">
                                — {current.name}
                            </div>
                        </div>
                    </Animate>

                </div>
            </div>
        </section>
    );
};

export default Testimonials;