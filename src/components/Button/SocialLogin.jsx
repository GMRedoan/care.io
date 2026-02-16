import React from 'react';
import { FcGoogle } from 'react-icons/fc';


const SocialLogin = () => {
    const handleSignIn = () =>{
        
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