"use client"

import 'swiper/css';
import 'swiper/css/effect-fade';
import Image from 'next/image';
import React from 'react';
import { FaShieldAlt, FaUserCheck, FaBolt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../../public/un1.jpg'
import img2 from '../../../public/un2.jpg'
import img3 from '../../../public/un3.jpg'
import Button1 from '../styles/Button1';
import { MdOutlineWebhook } from 'react-icons/md';
import { CgMoreVertical } from 'react-icons/cg';

const Banner = () => {
    const handleClick2 = (e) => {
        e.preventDefault();
        document.getElementById("aboutUs")
            ?.scrollIntoView({ behavior: "smooth" });
    }
    const handleClick1 = (e) => {
        e.preventDefault()
        document.getElementById("service")?.scrollIntoView({behavior:"smooth"})
    }
    return (
        <div id='BannerSection' className='bg-base-200'>
            {/* Swiper */}
            <div>
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    speed={1200}
                    effect="slide"
                    className="relative h-260 md:h-183"
                >
                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="h-full">
                            <Image
                                src={img1}
                                alt='Service'
                                sizes='100vw'
                                fill
                                className='object-cover'
                            />
                            <div className="absolute inset-0 bg-black/40"
                            />
                        </div>
                    </SwiperSlide>

                    {/* Slide 2 */}
                    <SwiperSlide>
                        <div className="h-full">
                            <Image
                                src={img2}
                                alt='Service'
                                sizes='100vw'
                                fill
                                className='object-cover'
                            />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                    </SwiperSlide>

                    {/* Slide 3 */}
                    <SwiperSlide>
                        <div className="h-full">
                            <Image
                                src={img3}
                                alt='Service'
                                sizes='100vw'
                                fill
                                className='object-cover'
                            />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                    </SwiperSlide>
                    <div className="absolute inset-0 z-20 flex items-center justify-center pt-10 sm:pt-16 md:pt-20 px-4">
                        <div className="text-center text-white px-6 md:px-16 max-w-7xl mx-auto">

                            {/* Floating Badge */}
                            <div className="inline-flex items-center gap-2 mb-8 px-6 py-3bg-white/10 backdrop-blur-md text-gray-200 font-semibold rounded-full border border-white/20 shadow-lg animate-fadeIn py-3">

                                <HiSparkles className="text-cyan-400 text-lg animate-pulse" />
                                <span className="tracking-wide text-sm font-medium">
                                    Trusted by 25,000+ Families
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight bg-linear-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent drop-shadow-xl animate-fadeIn">

                                Care That Truly Feels Like Family
                            </h1>

                            {/* Subheading */}
                            <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed animate-fadeIn">

                                Instantly connect with verified caregivers for children,
                                seniors, and loved ones — secure, reliable, and stress-free.
                            </p>

                            {/* CTA Buttons */}
                            <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fadeIn">

                                <Button1 onClick={handleClick1} className="px-8 py-4 font-semibold shadow-2xl hover:scale-110 hover:shadow-cyan-500/40 transition duration-300 flex items-center gap-2">
                                    Get Started <MdOutlineWebhook className='animate-spin text-xl' />
                                </Button1>

                                <button onClick={handleClick2} className="px-7 md:px-8 py-3 w-fit ml-20 md:ml-0 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold hover:bg-white/20 hover:scale-105 transition duration-300 cursor-pointer flex items-center gap-2">
                                    Learn More <CgMoreVertical className='text-primary'/>
                                </button>

                            </div>

                            {/* Glass Feature Cards */}
                            <div className="mt-10 sm:mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

                                {/* Card 1 */}
                                <div className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-5 sm:p-6 md:p-8  border border-white/10 shadow-xl hover:-translate-y-4 
        hover:shadow-cyan-500/20 transition duration-500">
                                    <FaUserCheck className="text-4xl text-cyan-400   
          group-hover:scale-125 transition duration-300" />

                                    <h3 className="text-xl font-semibold">
                                        Verified Caregivers
                                    </h3>

                                    <p className="text-gray-200 text-sm leading-relaxed">
                                        Every caregiver is background-checked and reviewed.
                                    </p>

                                    <div className="absolute inset-0 rounded-3xl 
          bg-linear-to-br from-cyan-400/10 to-transparent 
          opacity-0 group-hover:opacity-100 
          transition duration-500" />
                                </div>

                                {/* Card 2 */}
                                <div className="group relative bg-white/10 backdrop-blur-lg 
        rounded-3xl p-5 sm:p-6 md:p-8 border border-white/10 
        shadow-xl hover:-translate-y-4 
        hover:shadow-cyan-500/20 
        transition duration-500">

                                    <FaBolt className="text-4xl text-cyan-400  
          group-hover:scale-125 transition duration-300" />

                                    <h3 className="text-xl font-semibold">
                                        Instant Booking
                                    </h3>

                                    <p className="text-gray-200 text-sm leading-relaxed">
                                        Book reliable care in just a few clicks.
                                    </p>

                                    <div className="absolute inset-0 rounded-3xl 
          bg-linear-to-br from-cyan-400/10 to-transparent 
          opacity-0 group-hover:opacity-100 
          transition duration-500" />
                                </div>

                                {/* Card 3 */}
                                <div className="group relative bg-white/10 backdrop-blur-lg 
        rounded-3xl p-5 sm:p-6 md:p-8 border border-white/10 
        shadow-xl hover:-translate-y-4 
        hover:shadow-cyan-500/20 
        transition duration-500">

                                    <FaShieldAlt className="text-4xl text-cyan-400 
          group-hover:scale-125 transition duration-300" />

                                    <h3 className="text-xl font-semibold">
                                        Secure Platform
                                    </h3>

                                    <p className="text-gray-200 text-sm leading-relaxed">
                                        Protected payments and encrypted communication.
                                    </p>

                                    <div className="absolute inset-0 rounded-3xl 
          bg-linear-to-br from-cyan-400/10 to-transparent 
          opacity-0 group-hover:opacity-100 
          transition duration-500" />
                                </div>

                            </div>

                        </div>
                    </div>                </Swiper>
            </div>
        </div>
    );
};

export default Banner;