import AboutSection from '@/components/HomeLayout/AboutUs';
import Banner from '@/components/HomeLayout/Banner';
import ServiceOverview from '@/components/HomeLayout/ServiceOverview';
import Testimonials from '@/components/HomeLayout/Testimonials';
import React from 'react';
 
 const HomePage = () => {
    return (
        <div> 
            <Banner/>
            <AboutSection/>
            <ServiceOverview/>
            <Testimonials/>
         </div>
    );
 };
 
export default HomePage;