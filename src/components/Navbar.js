// components/Navbar.jsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        { href: "/", label: "Home" },
        { href: "/tournaments", label: "Tournaments" },
        { href: "/teams", label: "Teams" },
    ];

    const authLinks = session ? (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-[#ff4655]"
        >
            Sign Out
        </button>
    ) : (
        <Link
            href="/signin"
            className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/signin"
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-[#ff4655]"
                }`}
        >
            Sign In
        </Link>
    );

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-[#0f1923]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo or Brand Name */}
                    <div className="flex items-center">
                        {/* Logo Image */}
                        <Link href="/">
                            <img
                                src="/valologo.png"
                                alt="Logo"
                                className="h-11 w-15 mr-2" // Adjust height and width of the logo
                            />
                        </Link>
                        <Link href="/" className="text-[#ff4655] text-2xl font-extrabold tracking-widest">
                            VALOARENA
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-md text-sm font-semibold ${pathname === link.href
                                        ? "bg-[#ff4655] text-white"
                                        : "text-gray-300 hover:bg-[#ff4655] hover:text-white transition-colors duration-300"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {/* Authentication Links */}
                            {authLinks}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === link.href
                                        ? "bg-[#ff4655] text-white"
                                        : "text-gray-300 hover:bg-[#ff4655] hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {/* Authentication Links for Mobile */}
                            {authLinks}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
