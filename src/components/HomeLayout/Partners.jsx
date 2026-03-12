"use client"
import Image from 'next/image';
import React from 'react';
import Marquee from "react-fast-marquee";

const Partners = () => {
    return (
        <section>
            <div className='bg-base-100 md:py-10 shadow-2xl border border-base-100'>
                <Marquee speed={100}>
                    <Image src="https://i.ibb.co.com/4w8pfgx3/7df710bb60e0875678041dda9695fbc0-removebg-preview.png" alt='logo' width={100} height={60} className='mr-10' />
                    <Image src="https://i.ibb.co.com/0pVJg0gn/360-F-104687503-P30-Se-VRx-RXYxy-It-Yj9-Vm5k-Oztwosjb0z-removebg-preview.png" alt='logo' width={220} height={60} />
                    <Image src="https://i.ibb.co.com/DfxLHpPJ/360-F-329628847-xfb-IZf-WE59-LPys-RILGEzi-Hf00-Fx-QY8o-L-removebg-preview.png" alt='logo' width={220} height={60} className='mr-10' />
                    <Image src="https://i.ibb.co.com/whC1QC75/clinic-logo-29223444-removebg-preview.png" alt='logo' width={70} height={60} className='mr-16' />
                    <Image src="https://i.ibb.co.com/RGWsYkmy/kids-care-family-charity-logo-emblem-design-template-hand-drawn-heart-baby-adult-hands-silhouettes-m.png" alt='logo' width={140} height={60} className='mr-10' />
                    <Image src="https://i.ibb.co.com/rGsGDDg6/old-home-care-logo-290562-77-removebg-preview.png" alt='logo' width={120} height={60} className='mr-10' />
                    <Image src="https://i.ibb.co.com/9HfzwnJP/elderly-care-icon-senior-logo-design-vector-338934787-removebg-preview.png" alt='logo' width={100} height={60} className='mr-10' />
                    <Image src="https://i.ibb.co.com/xKk8hqkF/people-care-logo-design-child-hands-star-success-vector-combination-402036279-removebg-preview.png" alt='logo' width={120} height={60} className='mr-10' />
                </Marquee>
            </div>
        </section>
    );
};

export default Partners;