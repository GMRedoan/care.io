"use client"
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import NavLink from '../Button/Navlink';
import AuthButton from '../Button/AuthButton';

const Navbar = () => {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const nav = <>
        <li>
            <NavLink href={'/home'}>Home</NavLink>
        </li>
        <li>
            <NavLink href={'/products'}>Products</NavLink>
        </li>
        <li>
            <NavLink href={'/blog'}>Blog</NavLink>
        </li>
        <li>
            <NavLink href={'/contact'}>Contact</NavLink>
        </li>
    </>

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setShow(false);
            } else {
                setShow(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);


    return (
        <div className={`navbar bg-base-100 sticky top-0 z-50 border-b border-primary px-6 ${show ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {nav}
                     </ul>
                </div>
                <div className='-ml-6 md:ml-2'>
                    <Logo></Logo>
                </div>
             </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-3">
                    {nav}
                </ul>
            </div>
            <div className="navbar-end">
                <AuthButton></AuthButton>
            </div>
        </div>    );
};

export default Navbar;