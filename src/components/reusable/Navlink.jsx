"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
    const pathname = usePathname();
    const isActive = pathname.startsWith(href);

    return (
        <Link
            href={href}
            className={`
                relative inline-block px-4 py-2 font-semibold transition-all duration-300

                ${isActive
                    ? "text-primary"
                    : "text-primary hover:text-primary hover:bg-transparent"
                }

                before:absolute
                before:left-0
                before:bottom-0
                before:h-0.5
                before:bg-primary
                before:transition-all
                before:duration-300

                after:absolute
                after:left-0
                after:-bottom-1.5
                after:h-0.5
                after:bg-primary
                after:transition-all
                after:duration-300
                after:delay-150

                ${isActive
                    ? "before:w-full after:w-full"
                    : "before:w-0 after:w-0 hover:before:w-full hover:after:w-full"
                }
            `}
        >
            {children}
        </Link>
    );
};

export default NavLink;