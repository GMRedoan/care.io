"use client";

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
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-base-300 via-cyan-400 to-base-300 bg-clip-text text-transparent">
                        Get in Touch With Us
                    </h2>
                    <p className="mt-5 text-accent max-w-2xl mx-auto text-lg">
                        Have questions or need support? We’re here to help you and your family anytime.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* LEFT - INFO CARDS */}
                    <div className="space-y-6">

                        <div className="bg-white/5 backdrop-blur-md border border-accent rounded-3xl p-6 flex items-center gap-4 shadow-xl">
                            <div className="p-4 bg-cyan-500/10 rounded-xl text-cyan-500">
                                <FaPhoneAlt size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-base-300">Phone</h4>
                                <p className="text-accent">+880 1XXX-XXXXXX</p>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md border border-accent rounded-3xl p-6 flex items-center gap-4 shadow-xl">
                            <div className="p-4 bg-blue-500/10 rounded-xl text-blue-500">
                                <FaEnvelope size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-base-300">Email</h4>
                                <p className="text-accent">support@care.io</p>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md border border-accent rounded-3xl p-6 flex items-center gap-4 shadow-xl">
                            <div className="p-4 bg-cyan-500/10 rounded-xl text-cyan-500">
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-base-300">Location</h4>
                                <p className="text-accent">Barishal, Bangladesh</p>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT - FORM */}
                    <div className="bg-white/5 backdrop-blur-md border border-accent rounded-3xl p-8 shadow-2xl">

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label className="text-sm text-accent">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full mt-2 px-5 py-3 rounded-xl bg-base-100 border border-accent focus:outline-none focus:border-cyan-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm text-accent">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full mt-2 px-5 py-3 rounded-xl bg-base-100 border border-accent focus:outline-none focus:border-cyan-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm text-accent">Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Write your message..."
                                    rows="5"
                                    className="w-full mt-2 px-5 py-3 rounded-xl bg-base-100 border border-accent focus:outline-none focus:border-cyan-500"
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

                    </div>

                </div>
            </div>
        </section>
    );
}