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
            <div className="py-14 px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <Image
                    src={'/logo 7.35.41 PM.png'}
                    alt="logo"
                    width={100}
                    height={80}
                    className="w-40 -my-7"
                    />
                     <p className="mt-4 text-sm leading-relaxed text-white/90">
                        <span className="text-primary font-bold text-lg">Care.io</span> is a trusted platform dedicated to providing reliable care services for children, elderly individuals, and family members in need of support.
                    </p>
                </div>

                {/* Links */}
                <div className="md:ml-20">
                    <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:underline cursor-pointer">Home</li>
                        <li className="hover:underline cursor-pointer">Products</li>
                        <li className="hover:underline cursor-pointer">About Us</li>
                        <li className="hover:underline cursor-pointer">Contact</li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:underline cursor-pointer">Privacy Policy</li>
                        <li className="hover:underline cursor-pointer">Terms & Conditions</li>
                        <li className="hover:underline cursor-pointer">Refund Policy</li>
                        <li className="hover:underline cursor-pointer">Help Center</li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="font-semibold text-lg mb-4 text-primary">
                        Follow Us
                    </h3>

                    <div className="flex gap-4 cursor-pointer
                    ">

                        <p
                            aria-label="Facebook"
                            className="flex items-center justify-center w-11 h-11 rounded-full 
                 bg-white/10 text-white text-lg
                 transition-all duration-300
                 hover:bg-[#1877F2] hover:scale-110"
                        >
                            <FaFacebookF />
                        </p>

                        <p
                            aria-label="Instagram"
                            className="flex items-center justify-center w-11 h-11 rounded-full 
                 bg-white/10 text-white text-lg
                 transition-all duration-300
                 hover:bg-linear-to-tr hover:from-pink-500 hover:via-red-500 hover:to-yellow-500
                 hover:scale-110"
                        >
                            <FaInstagram />
                        </p>

                        <p
                            aria-label="Twitter"
                            className="flex items-center justify-center w-11 h-11 rounded-full 
                 bg-white/10 text-white text-lg
                 transition-all duration-300
                 hover:bg-black hover:scale-110"
                        >
                            <FaXTwitter/>
                        </p>

                        <p
                            aria-label="LinkedIn"
                            className="flex items-center justify-center w-11 h-11 rounded-full 
                 bg-white/10 text-white text-lg
                 transition-all duration-300
                 hover:bg-[#0A66C2] hover:scale-110"
                        >
                            <FaLinkedinIn />
                        </p>

                    </div>
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
