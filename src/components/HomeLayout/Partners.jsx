"use client"
import Image from 'next/image';
import React from 'react';
import Marquee from "react-fast-marquee";

const Partners = () => {
    return (
        <section>
            <div className='bg-base-100 md:py-10 shadow-2xl border border-base-100'>
                <Marquee speed={100}>
                    <Image src="https://i.ibb.co.com/WWYtq9nb/images-1-removebg-preview.png" alt='logo' width={100} height={60} className='mr-20' />
                    <Image src="https://i.ibb.co.com/Y4hJzRvm/images-2-removebg-preview.png" alt='logo' width={80} height={60} className='mr-20' />
                    <Image src="https://i.ibb.co.com/4ZNh02SL/images-3-removebg-preview.png" alt='logo' width={130} height={60} className='mr-20' />
                    <Image src="https://i.ibb.co.com/HfW2Hk65/images-5-removebg-preview-1.png" alt='logo' width={80} height={60} className='mr-20' />
                    <Image src="https://i.ibb.co.com/wF9nmzSK/images-7-removebg-preview-1.png" alt='logo' width={90} height={60} className='mr-20' />
                    <Image src="https://i.ibb.co.com/RkcthNJ9/images-removebg-preview-1.png" alt='logo' width={100} height={60} className='mr-20' />
                    <Image src="https://i.ibb.co.com/ymWfbk3Y/images-removebg-preview.png" alt='logo' width={90} height={60} className='mr-20' />
                    <Image src="https://i.ibb.co.com/60wP8Kjb/images-6-removebg-preview.png" alt='logo' width={120} height={60} className='mr-20' />
                </Marquee>
            </div>
        </section>
    );
};

export default Partners;