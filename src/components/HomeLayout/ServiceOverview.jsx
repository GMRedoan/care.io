"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowTrendUp } from "react-icons/fa6";

const services = [
    {
        title: "Baby Care",
        description:
            "Professional and compassionate caregivers ensuring your child’s safety, comfort, and joyful growth.",
        image: "https://i.ibb.co.com/q3wN6h6z/khoa-pham-9n-C7j1g-AS84-unsplash.jpg",
        link: "/services/babyCare",
    },
    {
        title: "Elderly Service",
        description:
            "Dedicated support for seniors with daily assistance, companionship, and respectful care.",
        image: "https://i.ibb.co.com/jkJJdJZ7/raychan-yk7-F8bd-D0e-U-unsplash.jpg",
        link: "/services/elderCare",
    },
    {
        title: "Sick People Service",
        description:
            "Reliable home care for recovering or ill family members with attention and medical awareness.",
        image: "https://i.ibb.co.com/Y4Zz8zjd/national-cancer-institute-DK-4-VWK1tw-unsplash.jpg",
        link: "/services/sickCare",
    },
];

const ServiceOverview = () => {
    return (
        <section id="service" className="relative bg-base-200 py-10 px-6 md:px-16 pt-20 md:pt-30 overflow-hidden">
 
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold 
            bg-linear-to-r from-base-300 via-cyan-400 to-base-300 bg-clip-text text-transparent">
                        Our Care Services
                    </h2>

                    <p className="mt-6 text-accent max-w-2xl mx-auto text-lg">
                        Reliable, secure, and compassionate caregiving solutions
                        tailored to your family’s unique needs.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative h-105 rounded-3xl overflow-hidden 
              shadow-xl transition duration-500 hover:-translate-y-2"
                        >

                            {/* Image */}
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition duration-700 group-hover:scale-105"
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8">

                                <h3 className="text-2xl font-bold text-white mb-3 
                  translate-y-6 group-hover:translate-y-0 
                  transition duration-500">
                                    {service.title}
                                </h3>

                                <p className="text-gray-300 text-sm leading-relaxed 
                  translate-y-4 group-hover:translate-y-0 
                  transition duration-500 delay-100">
                                    {service.description}
                                </p>

                                {/* Action Bar */}
                                <div className="mt-6 opacity-0 group-hover:opacity-100 
                  translate-y-6 group-hover:translate-y-0 
                  transition duration-500 delay-200">

                                         <Link href={service.link} className="btn w-fit px-5 py-5 rounded-xl 
                      bg-white/20 backdrop-blur-lg 
                      border border-white/30 text-white 
                      font-semibold hover:bg-cyan-500 
                      transition duration-300 flex items-center gap-2 cursor-pointer">
                                            Explore Now <FaArrowTrendUp />
                                     </Link>

                                </div>

                            </div>

                            {/* Bottom line */}
                            <div className="absolute bottom-0 left-0 w-full h-1 
                bg-linear-to-r from-cyan-500 to-blue-500 
                scale-x-0 group-hover:scale-x-100 
                transition duration-500 origin-left">
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default ServiceOverview;