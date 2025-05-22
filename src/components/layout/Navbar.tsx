import React, { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    MessageSquare,
    Menu,
    X,
    ChevronDown,
    ExternalLink,
} from "lucide-react";

const navLinks = [
    {
        title: "Features",
        href: "/#features",
        hasChildren: false,
    },
    {
        title: "How It Works",
        href: "/#product",
        hasChildren: false,
    },
    {
        title: "Benefits",
        href: "/#benefits",
        hasChildren: false,
    },
    {
        title: "Success Stories",
        href: "/#case-studies",
        hasChildren: false,
    },
    {
        title: "Pricing",
        href: "/#pricing",
        hasChildren: false,
    },
    {
        title: "FAQ",
        href: "/#faq",
        hasChildren: false,
    },
    {
        title: "Try Demo",
        href: "/demo",
        highlight: true,
        hasChildren: false,
    },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleDropdown = (title: string) => {
        if (activeDropdown === title) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(title);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setActiveDropdown(null);
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

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
                                alt="Kraftodent Icon"
                                width={40}
                                height={40}
                                className="h-auto mr-2"
                            />
                            <img
                                src="/Text.png"
                                alt="Kraftodent"
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
                        className="hidden md:flex space-x-1 lg:space-x-2 items-center"
                    >
                        {navLinks.map((link, index) =>
                            link.hasChildren ? (
                                // Dropdown menu
                                <div
                                    key={link.title}
                                    className="relative"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleDropdown(link.title);
                                    }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.1 * index,
                                            duration: 0.5,
                                        }}
                                        className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base px-3 py-2 cursor-pointer flex items-center"
                                    >
                                        {link.title}
                                        <ChevronDown
                                            size={16}
                                            className="ml-1"
                                        />
                                    </motion.div>
                                </div>
                            ) : (
                                // Regular link
                                <Link key={link.href} href={link.href}>
                                    {link.highlight ? (
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
                                    ) : (
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
                                    )}
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
                            {isMobileMenuOpen ? (
                                <X size={24} />
                            ) : (
                                <Menu size={24} />
                            )}
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
                            className="md:hidden mt-4 bg-white rounded-lg shadow-xl overflow-hidden"
                        >
                            <div className="flex flex-col py-2">
                                {navLinks.map((link, index) => (
                                    <div
                                        key={link.title}
                                        className="border-b border-gray-100 last:border-b-0"
                                    >
                                        {link.hasChildren ? (
                                            // Mobile dropdown
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        toggleDropdown(
                                                            link.title
                                                        )
                                                    }
                                                    className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
                                                >
                                                    <span>{link.title}</span>
                                                    <ChevronDown
                                                        size={16}
                                                        className={`transition-transform ${
                                                            activeDropdown ===
                                                            link.title
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        ) : (
                                            // Regular mobile link
                                            <Link
                                                href={link.href}
                                                className={`block px-4 py-3 ${
                                                    link.highlight
                                                        ? "text-blue-600 font-medium"
                                                        : "text-gray-700"
                                                } hover:bg-gray-50`}
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                <div className="flex items-center">
                                                    {link.highlight && (
                                                        <MessageSquare
                                                            size={16}
                                                            className="mr-2"
                                                        />
                                                    )}
                                                    {link.title}
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                ))}
                                <div className="px-4 py-3">
                                    <Link
                                        href="/#contact"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition duration-300">
                                            Book a Demo
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}
