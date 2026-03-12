"use client"
import { features } from "@/components/Data/features";
import FeatureCard from "@/components/cards/FeaturesCard";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
    return (
        <section className="pt-20 bg-base-200">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold 
            bg-linear-to-r from-base-300 via-cyan-400 to-base-300 bg-clip-text text-transparent">
                        Care Features
                    </h2>
                    <p className="text-accent mt-2">
                        Trusted care solutions for children, elders, and patients.
                    </p>
                </div>

                <div className="md:mx-37 py-20">
                    <Swiper
                        loop={true}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 30,
                            stretch: 1,
                            depth: 50,
                            scale: 0.75,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        pagination={true}
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                        className="mySwiper"
                    >
                        {
                            features.map(feature => <SwiperSlide
                                key={feature.id}
                                className="w-87.5! flex justify-center">
                                <FeatureCard feature={feature} />
                            </SwiperSlide>)
                        }

                    </Swiper>

                </div>

            </div>

        </section>
    );
}