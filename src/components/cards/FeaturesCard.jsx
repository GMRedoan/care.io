"use client";

import Image from "next/image";

export default function FeaturesCard({ feature }) {
    const Icon = feature.icon;

    return (
        <div className="group relative w-85 h-105 rounded-3xl overflow-hidden bg-base-100 transition-all duration-500">

            {/* Image */}
            <div className="relative h-[60%] w-full">
                <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="absolute top-[55%] left-6 -translate-y-1/2 bg-primary text-white p-4 rounded-xl shadow-lg">
                <Icon size={28} />
            </div>

            <div className="pt-12 px-6 pb-6">

                <h3 className="text-xl font-bold text-base-300 mb-2">
                    {feature.title}
                </h3>

                <p className="text-accent text-sm leading-relaxed">
                    {feature.subtitle}
                </p>

            </div>
        </div>
    );
}