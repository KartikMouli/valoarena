// src/components/Footer.jsx

"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    {/* Branding or Logo */}
                    <div className="mb-4 md:mb-0 flex">
                        <Link href="/">
                            <img
                                src="/valologo.png"
                                alt="Logo"
                                className="h-8 w-12 mr-2" // Adjust height and width of the logo
                            />
                        </Link>
                        <Link href="/" className="text-white text-2xl font-bold">
                            valoarena
                        </Link>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FaFacebookF size={20} />
                            <span className="sr-only">Facebook</span>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FaTwitter size={20} />
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FaInstagram size={20} />
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FaLinkedinIn size={20} />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Legal Links */}
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        <Link href="/" className="hover:text-white text-sm">
                            Terms and Conditions
                        </Link>
                        <Link href="/" className="hover:text-white text-sm">
                            Privacy Policy
                        </Link>
                    </div>

                    {/* Copyright */}
                    <div className="text-sm">
                        &copy; {new Date().getFullYear()} valoarena. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
