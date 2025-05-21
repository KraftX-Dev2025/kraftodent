import React, { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

const navLinks = [
    { title: "Features", href: "/#features" },
    { title: "How It Works", href: "/#product" },
    { title: "Success Stories", href: "/#case-studies" },
    { title: "Benefits", href: "/#benefits" },
    { title: "Try Demo", href: "/demo", highlight: true },
    { title: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-md py-2"
                    : "bg-transparent py-3 md:py-4"
            }`}
        >
            <nav className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center"
                    >
                        <Link
                            href="/"
                            className="flex items-center text-xl md:text-2xl font-bold text-blue-600"
                        >
                            <img
                                src="/Icon.png"
                                alt="Company Icon"
                                width={40}
                                height={40}
                                className="h-auto mr-2"
                            />
                            <img
                                src="/Text.png"
                                alt="Company Text"
                                width={120}
                                height={40}
                                className="h-auto"
                            />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="hidden md:flex space-x-1 lg:space-x-4 items-center"
                    >
                        {navLinks.map((link, index) =>
                            link.highlight ? (
                                <Link key={link.href} href={link.href}>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.1 * index,
                                            duration: 0.5,
                                        }}
                                    >
                                        <Button
                                            variant="outline"
                                            className="text-blue-600 border-blue-600 hover:bg-blue-50 flex items-center gap-1"
                                        >
                                            <MessageSquare size={16} />
                                            {link.title}
                                        </Button>
                                    </motion.div>
                                </Link>
                            ) : (
                                <Link key={link.href} href={link.href}>
                                    <motion.span
                                        className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base px-3 py-2"
                                        whileHover={{ scale: 1.05 }}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.1 * index,
                                            duration: 0.5,
                                        }}
                                    >
                                        {link.title}
                                    </motion.span>
                                </Link>
                            )
                        )}
                        <Link key="Book Demo" href="/#contact" className="ml-2">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white transition duration-300 text-sm lg:text-base">
                                Book a Demo
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
                            aria-label={
                                isMobileMenuOpen ? "Close menu" : "Open menu"
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden mt-4"
                        >
                            <div className="flex flex-col space-y-2 py-4 bg-white rounded-lg shadow-lg">
                                {navLinks.map((link) =>
                                    link.highlight ? (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <div className="px-4 py-2">
                                                <Button
                                                    variant="outline"
                                                    className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 flex items-center justify-center gap-1"
                                                >
                                                    <MessageSquare size={16} />
                                                    {link.title}
                                                </Button>
                                            </div>
                                        </Link>
                                    ) : (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 hover:bg-gray-100"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            {link.title}
                                        </Link>
                                    )
                                )}
                                <Link
                                    key="Book Demo"
                                    href="/#contact"
                                    className="px-4 py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white transition duration-300 w-full">
                                        Book Free Demo
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Progress Bar */}
            {isMounted && (
                <motion.div
                    className="h-1 bg-blue-600"
                    style={{
                        scaleX: scrollYProgress,
                        transformOrigin: "0% 50%",
                    }}
                />
            )}
        </header>
    );
}
