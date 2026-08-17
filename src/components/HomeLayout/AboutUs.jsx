"use client"
import React from "react";
import { FaHeart, FaUserShield, FaHandsHelping } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Button1 from "../reusable/Button1";
import { RiServiceFill } from "react-icons/ri";
import Link from "next/link";
import Animate from "../reusable/Animate";

 
export default function AboutSection() {
    return (
        <section
            id="k"
            className="relative bg-base-200 py-24 px-6 md:px-16 overflow-hidden"
        >
            {/* Background Gradient Glow */}
            <div
                className="absolute top-30 -left-12 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-40"/>

            <div
                className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-40"/>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Title */}
                <Animate type="zoom" className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 text-cyan-500 rounded-full font-semibold text-md border border-cyan-500/20 mb-6">
                        <HiSparkles />
                        Who We Are
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-linear-to-r from-base-300 via-cyan-400 to-base-300 bg-clip-text text-transparent leading-tight">
                        Making Caregiving Simple, Secure & Accessible
                    </h2>
                </Animate>

                {/* Main Layout */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side */}
                    <Animate type="fadeLeft">
                        <h3 className="text-2xl md:text-3xl font-bold leading-relaxed">
                            We provide reliable and trusted care services for
                            <span className="text-cyan-500"> children</span>,
                            <span className="text-cyan-500"> elderly family members</span>,
                            and the people who matter most.
                        </h3>

                        <p className="mt-8 text-accent text-lg leading-relaxed">
                            Our platform connects families with verified caregivers, ensuring
                            safety, transparency, and peace of mind. We believe caregiving
                            should never feel complicated or risky.
                        </p>

                        <p className="mt-6 text-accent text-lg leading-relaxed">
                            That’s why our mission is clear: to make caregiving easy, secure,
                            and accessible for everyone.
                        </p>
                    </Animate>

                    {/* Right Side */}
                    <div className="relative">
                        <Animate type="zoom" delay={0.5} className="absolute left-5 top-0 bottom-0 w-0.5 bg-linear-to-b from-cyan-500 to-blue-500"/>

                        <div className="space-y-14">
                            {/* Step 1 */}
                            <Animate
                            type="fadeRight"
                            delay={0.3}
                             className="flex items-start gap-6">
                                <div className="w-14 h-6 md:h-10 flex items-center justify-center rounded-full bg-cyan-500 text-white relative z-10">
                                    <FaHandsHelping />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold">
                                        Reliable Connections
                                    </h4>
                                    <p className="text-accent mt-2 leading-relaxed">
                                        We carefully connect families with compassionate and
                                        dependable caregivers for daily support.
                                    </p>
                                </div>
                            </Animate>

                            {/* Step 2 */}
                            <Animate
                                type="fadeRight"
                                delay={0.4}
                             className="flex items-start gap-6">
                                <div className="w-14 h-6 md:h-10 flex items-center justify-center rounded-full bg-cyan-500 text-white relative z-10">
                                    <FaUserShield />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold">Verified & Secure</h4>
                                    <p className="text-accent mt-2 leading-relaxed">
                                        Every caregiver is background-checked, ensuring a safe and
                                        trustworthy experience.
                                    </p>
                                </div>
                            </Animate>
                            {/* Step 3 */}
                            <Animate
                                type="fadeRight"
                                delay={0.5}
                             className="flex items-start gap-6">
                                <div className="w-14 h-6 md:h-10 flex items-center justify-center rounded-full bg-cyan-500 text-white relative z-10">
                                    <FaHeart />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold">
                                        Care With Compassion
                                    </h4>
                                    <p className="text-accent mt-2 leading-relaxed">
                                        We focus on emotional connection, comfort, and meaningful
                                        care for every family member.
                                    </p>
                                </div>
                            </Animate>
                        </div>

                    </div>
                </div>

                {/* Bottom Panel */}
                <Animate className="mt-24" type="zoom">
                    <div className="bg-foreground backdrop-blur-lg border border-base-100 rounded-3xl py-12 px-8 text-center shadow-2xl">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                            Trusted by Families Who Value Peace of Mind
                        </h3>

                        <p className="text-accent max-w-2xl mx-auto mb-8">
                            Join a growing community that believes caregiving should be
                            simple, secure, and stress-free.
                        </p>

                        <Button1 className="btn px-8">
                            <Link
                                className="flex justify-center items-center gap-2"
                                href={"/blog"}
                            >
                                Explore More <RiServiceFill />
                            </Link>
                        </Button1>
                    </div>
                </Animate>

                {/* Partners Section */}
                <Animate className="text-center mt-30 -mb-10" type="fadeUp">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-linear-to-r from-base-300 via-cyan-400 to-base-300 bg-clip-text text-transparent">
                        Partners Companies
                    </h2>
                    <p className="text-accent mt-2">
                        Working together with trusted partners to provide better care for
                        every family.
                    </p>
                </Animate>
            </div>
        </section>
    );
}