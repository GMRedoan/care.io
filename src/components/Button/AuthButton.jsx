"use client"
import Link from 'next/link';
import React from 'react';
import { FiLogIn } from "react-icons/fi";


const AuthButton = () => {
    return (
        <div>
            <Link href={'/login'} className="btn btn-sm btn-primary rounded-xl">Login<FiLogIn /></Link>

        </div>
    );
};

export default AuthButton;