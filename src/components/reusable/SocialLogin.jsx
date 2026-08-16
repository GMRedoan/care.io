"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const params = useSearchParams();
  const callback = params.get("callbackUrl") || "/";

  const handleSignIn = async () => {
    await signIn("google", {
      callbackUrl: callback,
    });
  };

  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="btn w-full rounded-xl border border-primary bg-base-200 py-5 text-primary shadow-2xl hover:text-base-300"
    >
      <FcGoogle size={20} />
      <span className="text-[15px]">Continue with Google</span>
    </button>
  );
};

export default SocialLogin;
