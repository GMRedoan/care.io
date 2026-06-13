import Image from "next/image";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
    return (
        <footer className="bg-linear-to-r from-gray-950 via-gray-800 to-gray-950 text-white">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 py-14 px-12">

                {/* Brand */}
                <div className="max-w-sm">
                    <Image
                        src={"/logo 7.35.41 PM.png"}
                        alt="logo"
                        width={100}
                        height={80}
                        className="w-40 -my-5"
                    />

                    <p className="text-sm leading-7 text-white/90">
                        <span className="text-primary font-semibold text-[16px]">
                            Care.io
                        </span>{" "}
                        is a trusted platform dedicated to providing reliable care
                        services for children, elderly individuals, and family
                        members in need of support.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold text-lg mb-5">
                        Quick Links
                    </h3>

                    <ul className="space-y-3 text-sm text-white/90">
                        <li className="hover:text-primary transition-colors duration-300 cursor-pointer">
                            Home
                        </li>

                        <li className="hover:text-primary transition-colors duration-300 cursor-pointer">
                            Products
                        </li>

                        <li className="hover:text-primary transition-colors duration-300 cursor-pointer">
                            About Us
                        </li>

                        <li className="hover:text-primary transition-colors duration-300 cursor-pointer">
                            Contact
                        </li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="font-semibold text-lg mb-5">
                        Support
                    </h3>

                    <ul className="space-y-3 text-sm text-white/90">
                        <li className="hover:text-primary transition-colors duration-300 cursor-pointer">
                            Privacy Policy
                        </li>

                        <li className="hover:text-primary transition-colors duration-300 cursor-pointer">
                            Terms & Conditions
                        </li>

                        <li className="hover:text-primary transition-colors duration-300 cursor-pointer">
                            Refund Policy
                        </li>

                        <li className="hover:text-primary transition-colors duration-300 cursor-pointer">
                            Help Center
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="font-semibold text-lg mb-5 text-primary">
                        Follow Us
                    </h3>

                    <div className="flex flex-wrap gap-4">

                        <div
                            aria-label="Facebook"
                            className="flex items-center justify-center w-11 h-11 rounded-full
                bg-white/10 text-white text-lg
                transition-all duration-300
                hover:bg-[#1877F2] hover:scale-110 cursor-pointer"
                        >
                            <FaFacebookF />
                        </div>

                        <div
                            aria-label="Instagram"
                            className="flex items-center justify-center w-11 h-11 rounded-full
                bg-white/10 text-white text-lg
                transition-all duration-300
                hover:bg-linear-to-tr hover:from-pink-500 hover:via-red-500 hover:to-yellow-500
                hover:scale-110 cursor-pointer"
                        >
                            <FaInstagram />
                        </div>

                        <div
                            aria-label="Twitter"
                            className="flex items-center justify-center w-11 h-11 rounded-full
                bg-white/10 text-white text-lg
                transition-all duration-300
                hover:bg-black hover:scale-110 cursor-pointer"
                        >
                            <FaXTwitter />
                        </div>

                        <div
                            aria-label="LinkedIn"
                            className="flex items-center justify-center w-11 h-11 rounded-full
                bg-white/10 text-white text-lg
                transition-all duration-300
                hover:bg-[#0A66C2] hover:scale-110 cursor-pointer"
                        >
                            <FaLinkedinIn />
                        </div>

                    </div>

                    <p className="mt-5 text-sm text-white/70 leading-6">
                        Stay connected with us on social media for updates,
                        caregiving tips, and community news.
                    </p>
                </div>

            </div>
            {/* Bottom Bar */}
            <div className="border-t border-white/30">
                <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-white/90">
                    © {new Date().getFullYear()} Care.IO - All rights reserved.
                </div>
            </div>

        </footer>
    );
};

export default Footer;
