import React from 'react';
 
const Banner = () => {
    return (
        <section className="relative overflow-hidden">

            {/* Abstract Shapes */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl z-10"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/50 rounded-full blur-3xl z-10"></div>

            <div className="relative px-16 py-24 text-center bg-base-200">

                {/* Small Badge */}
                <div className="inline-block mb-6 px-4 py-2 bg-base-100 backdrop-blur-md rounded-full text-sm tracking-wide">
                    Trusted by Families Everywhere
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
                    Care That Feels Like Family
                </h1>

                <p className="mt-6 text-lg md:text-xl text-accent max-w-2xl mx-auto">
                    Care.io helps you instantly connect with verified caregivers for
                    children, seniors, and loved ones — safe, secure, and stress-free.
                </p>

                {/* Search Style CTA */}
                <div className="mt-10 max-w-2xl mx-auto bg-white rounded-2xl p-3 shadow-xl flex flex-col md:flex-row gap-3">

                    <input
                        type="text"
                        placeholder="What kind of care do you need?"
                        className="flex-1 px-4 py-3 rounded-xl text-gray-700 focus:outline-none"
                    />

                    <button className="px-6 py-3 rounded-xl bg-[#11B2ED] text-white font-semibold hover:bg-cyan-600 transition">
                        Find Care
                    </button>
                </div>

                {/* Floating Info Cards */}
                <div className="mt-16 grid md:grid-cols-3 gap-6">
                          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:scale-105 transition">
                            <h3 className="font-semibold text-lg">Verified Caregivers</h3>
                            <p className="text-accent mt-2 text-sm">
                                Background-checked professionals you can trust.
                            </p>
                        </div>

 
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:scale-105 transition z-20">
                        <h3 className="font-semibold text-lg">Easy Booking</h3>
                        <p className="text-accent mt-2 text-sm">
                            Book reliable care in just a few clicks.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:scale-105 transition z-20">
                        <h3 className="font-semibold text-lg">Secure Platform</h3>
                        <p className="text-accent mt-2 text-sm">
                            Safe payments and protected communication.
                        </p>
                    </div>
                 </div>
             </div>
        </section>
    );
};

export default Banner;