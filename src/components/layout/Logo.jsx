"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link href={'/home'} className='flex justify-center items-center'>
            <Image
            src={'/logo 7.35.41 PM.png'}
                alt='logo'
                width={90}
                height={30}
                className='w-16 md:w-23 -my-10'
                >
            </Image>
            <p className='md:text-xl font-bold -ml-3'>Care <span className='text-primary'>.IO</span></p>
        </Link>
    );
};

export default Logo;