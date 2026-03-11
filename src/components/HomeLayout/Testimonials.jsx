"use client";

import React from "react";
import CountUp from "react-countup";
import { FaQuoteLeft } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

 
const Testimonials = () => {

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.3,
    });

    return (
        <section ref={ref} className="relative bg-base-200 py-28 px-6 md:px-16 overflow-hidden">

            {/* Background Glow Effects */}
            <div className="absolute -top-32 left-10 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full opacity-40"></div>
            <div className="absolute -bottom-32 right-10 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full opacity-40"></div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold 
            bg-linear-to-r from-base-300 via-cyan-400 to-base-300 bg-clip-text text-transparent">
                        Trusted by Thousands of Families
                    </h2>

                    <p className="mt-6 text-accent max-w-2xl mx-auto text-lg">
                        Real experiences. Real families. Real impact.
                    </p>
                </div>

                {/* Main Layout */}
                <div className="grid lg:grid-cols-2 gap-10 items-center ">

                    {/* LEFT SIDE */}
                    <div className="space-y-12">

                        <div>
                            <h3 className="text-6xl font-extrabold text-cyan-500">
                                 {inView && <CountUp end={25} duration={5} separator="," />}K+
                            </h3>
                            <p className="text-gray-500 text-lg">
                                Families Served
                            </p>
                        </div>

                        <div>
                            <h3 className="text-6xl font-extrabold text-blue-500">
                                {inView && <CountUp end={5000} duration={3} separator="," />}+
                            </h3>
                            <p className="text-gray-500 text-lg">
                                Verified Caregivers
                            </p>
                        </div>

                        <div>
                            <h3 className="text-6xl font-extrabold text-cyan-500">
                                {inView && <CountUp end={98} duration={5} separator="," />}%
                            </h3>
                            <p className="text-gray-500 text-lg">
                                Satisfaction Rate
                            </p>
                        </div>

                        <div>
                            <h3 className="text-6xl font-extrabold text-blue-500">
                                {inView && <CountUp end={24} duration={5} separator="," />}/7
                            </h3>
                            <p className="text-gray-500 text-lg">
                                Support Availability
                            </p>
                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="relative">

                        {/* Testimonial 1 */}
                        <div className="bg-white shadow-2xl p-8 rounded-3xl 
              relative z-20 -rotate-2 hover:rotate-0 transition duration-500">

                            <FaQuoteLeft className="text-primary text-3xl mb-4" />

                            <p className="text-gray-600 leading-relaxed">
                                “Finding reliable care for my elderly father was stressful,
                                but this platform made it simple and secure. We finally
                                have peace of mind.”
                            </p>

                            <div className="mt-6 font-semibold text-gray-800">
                                — Sarah M.
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-base-100 shadow-xl p-8 rounded-3xl 
              absolute top-32 left-10 md:left-20 
              rotate-3 
              hover:rotate-0 transition duration-500">

                            <FaQuoteLeft className="text-blue-500 text-3xl mb-4" />

                            <p className="text-accent leading-relaxed">
                                “The caregivers are professional and compassionate.
                                Booking was incredibly easy and fast.”
                            </p>

                            <div className="mt-6 font-semibold text-base-300">
                                — David R.
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Testimonials;