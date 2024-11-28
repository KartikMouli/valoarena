"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Gamepad2,
    Trophy,
    Users,
    Calendar,
    Shield,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
    {
        title: "Platform",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Tournaments", href: "/tournaments" },
            { label: "Teams", href: "/teams" },
            { label: "Schedule", href: "/schedule" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "Help Center", href: "/help" },
            { label: "Contact Us", href: "/contact" },
            { label: "FAQ", href: "/faq" },
            { label: "Rules", href: "/rules" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Terms of Service", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Cookie Policy", href: "/cookies" },
            { label: "Guidelines", href: "/guidelines" },
        ],
    },
];

const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className="border-t ">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 hover:opacity-80 transition-opacity mb-4"
                        >
                            <Gamepad2 className="h-8 w-8 text-red-500" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
                                VALOARENA
                            </span>
                        </Link>
                        <p className="text-gray-500 mb-6 max-w-md">
                            Join the ultimate Valorant tournament platform where legends are made.
                            Compete, connect, and conquer in professional esports competitions.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <Button
                                    key={social.label}
                                    variant="ghost"
                                    size="icon"
                                    className="hover:text-red-500 hover:bg-red-500/10"
                                    asChild
                                >
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="h-5 w-5" />
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-500 hover:white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="mb-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} VALOARENA. All rights reserved.
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:white" asChild>
                            <Link href="/terms">Terms</Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:white" asChild>
                            <Link href="/privacy">Privacy</Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:white" asChild>
                            <Link href="/cookies">Cookies</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}