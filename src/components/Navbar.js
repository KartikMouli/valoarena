"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, LogIn, Trophy, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/button";



export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        { href: "/", label: "Home", icon: Home },
        { href: "/tournaments", label: "Tournaments", icon: Trophy },
        { href: "/teams", label: "Teams", icon: Users },
    ];

    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-700 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                    >
                        <img
                            src="/valologo.png"
                            alt="Logo"
                            className="h-8 w-auto"
                        />
                        <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
                            VALOARENA
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {links.map((link) => (
                            <Button
                                key={link.href}
                                variant={pathname === link.href ? "default" : "ghost"}
                                className={`flex items-center space-x-2 ${pathname === link.href
                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                    : "hover:bg-red-600/10 hover:text-red-600"
                                    }`}
                                asChild
                            >
                                <Link href={link.href}>
                                    <link.icon className="w-4 h-4" />
                                    <span>{link.label}</span>
                                </Link>
                            </Button>
                        ))}

                        {session ? (
                            <Button variant="default" className="flex bg-red-600 hover:bg-red-700" asChild>
                                <button onClick={() => signOut({ callbackUrl: "/" })}>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign Out
                                </button>
                            </Button>
                        ) : (
                            <Button variant="default" className="flex bg-red-600 hover:bg-red-700" asChild>
                                <Link href="/signin">
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Sign In
                                </Link>
                            </Button>
                        )}
                    </div>
                    
                    {/* <ModeToggle/> */}

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="md:hidden border-t border-border"
                    >
                        <div className="px-4 py-2 space-y-1">
                            {links.map((link) => (
                                <Button
                                    key={link.href}
                                    variant={pathname === link.href ? "default" : "ghost"}
                                    className={`w-full flex justify-start ${pathname === link.href
                                        ? "bg-red-600 hover:bg-red-700 text-white"
                                        : "hover:bg-red-600/10 hover:text-red-600"
                                        }`}
                                    asChild
                                >
                                    <Link href={link.href}>
                                        <link.icon className="w-4 h-4 mr-2" />
                                        {link.label}
                                    </Link>
                                </Button>
                            ))}

                            {session ? (
                                <Button
                                    variant="ghost"
                                    className="w-full flex justify-start hover:bg-red-600/10 hover:text-red-600"
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign Out
                                </Button>
                            ) : (
                                <Button
                                    variant="default"
                                    className="w-full flex justify-start bg-red-600 hover:bg-red-700"
                                    asChild
                                >
                                    <Link href="/signin">
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Sign In
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}