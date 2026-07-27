import AboutSection from "@/components/HomeLayout/AboutUs";
import Banner from '@/components/HomeLayout/Banner';
import Features from '@/components/HomeLayout/Features';
import Partners from '@/components/HomeLayout/Partners';
import Services from "@/components/HomeLayout/Services";
import Testimonials from '@/components/HomeLayout/Testimonials';
import { Suspense } from "react";

export default function Home() {
    return (
        <div>
            <Suspense fallback={null}>
                <Banner />
            </Suspense>
            <AboutSection />
            <Partners />
            <Services />
            <Features />
            <Testimonials />
        </div>
    );
}
