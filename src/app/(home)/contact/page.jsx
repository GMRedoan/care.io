"use client";

import Animate from "@/components/reusable/Animate";
import Button1 from "@/components/reusable/Button1";
import { useState } from "react";
import { BiSend } from "react-icons/bi";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Thank you for reaching out. We will get back to you soon.",
            iconColor: "#06b6d4",
            confirmButtonColor: "#06b6d4",
        });
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <section className="relative bg-base-200 py-24 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* TITLE */}
                <Animate className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-base-300 via-cyan-400 to-base-300 bg-clip-text text-transparent">
                        Get in Touch With Us
                    </h2>
                    <p className="mt-5 text-accent max-w-2xl mx-auto text-lg">
                        Have questions or need support? We’re here to help you and your family anytime.
                    </p>
                </Animate>

                {/* GRID */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* LEFT - INFO CARDS */}
                    <Animate type="fadeLeft">

                        <div className="grid gap-6">

                            {/* Large Featured Card */}
                            <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 p-7 shadow-xl">

                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />

                                <div className="relative z-10 flex items-start gap-4">
                                    <div className="p-4 rounded-2xl bg-cyan-500/15 text-cyan-400">
                                        <FaPhoneAlt size={22} />
                                    </div>

                                    <div>
                                        <p className="text-sm text-cyan-400 font-medium">
                                            24/7 Helpline
                                        </p>

                                        <h3 className="text-xl font-bold text-base-300 mt-1">
                                            +880 1XXX-XXXXXX
                                        </h3>

                                        <p className="text-accent mt-2 text-sm">
                                            Speak directly with our support team anytime.
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* Two Small Cards */}
                            <div className="grid md:grid-cols-2 gap-5">

                                <div className="rounded-3xl border border-accent bg-white/5 backdrop-blur-xl p-6 hover:border-blue-500/30 duration-300">

                                    <div className="w-fit p-3 rounded-xl bg-blue-500/10 text-blue-400 mb-4">
                                        <FaEnvelope size={18} />
                                    </div>

                                    <h4 className="font-semibold text-base-300">
                                        Email Us
                                    </h4>

                                    <p className="text-accent text-sm mt-2">
                                        support@care.io
                                    </p>

                                </div>

                                <div className="rounded-3xl border border-accent bg-white/5 backdrop-blur-xl p-6 hover:border-cyan-500/30 duration-300">

                                    <div className="w-fit p-3 rounded-xl bg-cyan-500/10 text-cyan-400 mb-4">
                                        <FaMapMarkerAlt size={18} />
                                    </div>

                                    <h4 className="font-semibold text-base-300">
                                        Our Location
                                    </h4>

                                    <p className="text-accent text-sm mt-2">
                                        Barishal, Bangladesh
                                    </p>

                                </div>

                            </div>

                            {/* New Card */}
                            <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 to-cyan-500/10 p-6 flex items-center justify-between">

                                <div>
                                    <p className="text-primary font-medium">
                                        Response Time
                                    </p>

                                    <h3 className="text-2xl font-bold text-base-300 mt-1">
                                        Under 10 Minutes
                                    </h3>

                                    <p className="text-accent text-sm mt-2">
                                        Our team responds quickly to all care requests.
                                    </p>
                                </div>

                                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center text-primary text-2xl">
                                    ⚡
                                </div>

                            </div>

                        </div>

                    </Animate>

                    {/* RIGHT - FORM */}
                    <Animate type="fadeRight" className="bg-white/5 backdrop-blur-md border border-primary/30 rounded-3xl p-8 shadow-2xl">

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label className="text-md text-primary font-semibold">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full mt-2 px-5 py-3 rounded-xl border border-accent placeholder:text-sm focus:outline-none focus:border-cyan-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-md text-primary font-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full mt-2 px-5 py-3 rounded-xl border border-accent focus:outline-none placeholder:text-sm focus:border-cyan-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-md text-primary font-semibold">Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Write your message..."
                                    rows="5"
                                    className="w-full mt-2 px-5 py-3 rounded-xl border border-accent focus:outline-none placeholder:text-sm focus:border-cyan-500"
                                    required
                                />
                            </div>

                            <Button1
                                type="submit"
                                className="w-full py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Send Message
                                <BiSend className="-rotate-35"/>
                            </Button1>

                        </form>

                    </Animate>

                </div>
            </div>
        </section>
    );
}