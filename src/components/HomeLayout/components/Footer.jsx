import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-gray-950 via-gray-800 to-gray-950 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 py-14 px-12">
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
            is a trusted platform dedicated to providing reliable care services
            for children, elderly individuals, and family members in need of
            support.
          </p>
        </div>

        <div className="flex justify-between">
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Quick Links</h3>

            <div className="space-y-3 text-sm text-white/90 flex flex-col">
              <Link
                href="#BannerSection"
                className="hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                Home
              </Link>

              <Link
                href="#service"
                className="hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                Services
              </Link>

              <Link
                href="/blog"
                className="hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className="hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Support</h3>

            <div className="space-y-3 text-sm text-white/90 flex flex-col">
              <Link
                href="#aboutUs"
                className="hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                About us
              </Link>

              <Link
                href="#"
                className="hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                Terms & Conditions
              </Link>

              <Link
                href="#"
                className="hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-lg mb-5 text-primary">Follow Us</h3>

          <div className="flex flex-wrap gap-4">
            <Link
              href="https://www.facebook.com/gm.redoan"
              target="_blank"
              aria-label="Facebook"
              className="flex items-center justify-center w-11 h-11 rounded-full
                bg-white/10 text-white text-lg
                transition-all duration-300
                hover:bg-[#1877F2] hover:scale-110 cursor-pointer"
            >
              <FaFacebookF />
            </Link>

            <Link
              href="https://github.com/GMRedoan"
              target="_blank"
              aria-label="Instagram"
              className="flex items-center justify-center w-11 h-11 rounded-full
                bg-white/10 text-white text-lg
                transition-all duration-300
                hover:bg-black
                hover:scale-110 cursor-pointer"
            >
              <FaGithub />
            </Link>

            <Link
              href="https://x.com/gm_redoan"
              target="_blank"
              aria-label="Twitter"
              className="flex items-center justify-center w-11 h-11 rounded-full
                bg-white/10 text-white text-lg
                transition-all duration-300
                hover:bg-black hover:scale-110 cursor-pointer"
            >
              <FaXTwitter />
            </Link>

            <Link
              href="https://www.linkedin.com/in/gm-redoan"
              target="_blank"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-11 h-11 rounded-full
                bg-white/10 text-white text-lg
                transition-all duration-300
                hover:bg-[#0A66C2] hover:scale-110 cursor-pointer"
            >
              <FaLinkedinIn />
            </Link>
          </div>

          <p className="mt-5 text-sm text-white/70 leading-6">
            Stay connected with us on social media for updates, caregiving tips,
            and community news.
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
