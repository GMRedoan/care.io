import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';


const SocialLogin = () => {
    const router = useRouter
    const params = useSearchParams();
    const callback = params.get("callbackUrl") || "/"
    const handleSignIn = async () => {
        const result = await signIn("google", { callbackUrl: callback })
        if (result.ok) {
            Swal.fire({
                title: "Welcome Back",
                text: "You Successfully Logged in your account",
                icon: "success",
                confirmButtonColor: "#11B2ED"
            });
            router.push(callback)
        }
    }
    return (
        <div>
            <button onClick={handleSignIn} className="btn border border-primary bg-base-200 text-primary rounded-xl w-full flex gap-2 py-5 hover:text-base-300 shadow-2xl">
                <FcGoogle size={20} />
                <span className='text-[15px]'>Continue with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;