// src/components/sections/Footer.tsx
import React from "react";
import { motion } from "framer-motion";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    CheckCircle,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            icon: <Facebook className="h-5 w-5" />,
            href: "https://facebook.com/kraftodent",
            label: "Facebook",
        },
        {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com/kraftodent",
            label: "Twitter",
        },
        {
            icon: <Instagram className="h-5 w-5" />,
            href: "https://instagram.com/kraftodent",
            label: "Instagram",
        },
        {
            icon: <Linkedin className="h-5 w-5" />,
            href: "https://www.linkedin.com/company/kraftodent/",
            label: "LinkedIn",
        },
    ];

    const footerLinks = [
        {
            title: "Product",
            links: [
                { text: "Features", href: "/#features" },
                { text: "How It Works", href: "/#product" },
                { text: "Pricing", href: "/#pricing" },
                { text: "Demo", href: "/demo" },
                { text: "Updates", href: "#" },
            ],
        },
        {
            title: "Resources",
            links: [
                { text: "Documentation", href: "#" },
                { text: "Tutorials", href: "#" },
                { text: "Blog", href: "#" },
                { text: "Case Studies", href: "/#case-studies" },
                { text: "FAQ", href: "/#faq" },
            ],
        },
        {
            title: "Company",
            links: [
                { text: "About Us", href: "#" },
                { text: "Careers", href: "#" },
                { text: "Contact", href: "/#contact" },
                { text: "Partners", href: "#" },
                { text: "Privacy Policy", href: "/privacy-policy" },
            ],
        },
    ];

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Newsletter Section */}
                <div className="pt-16 pb-8 border-b border-gray-800">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="max-w-lg"
                        >
                            <h3 className="text-2xl font-bold mb-4">
                                Stay updated with Kraftodent
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Get the latest news, product updates, and AI
                                innovations for dental practices delivered to
                                your inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-grow px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    Subscribe
                                </Button>
                            </div>
                            <div className="flex items-center mt-3 text-xs text-gray-500">
                                <CheckCircle
                                    size={12}
                                    className="mr-2 text-green-500"
                                />
                                <span>
                                    We respect your privacy. Unsubscribe at any
                                    time.
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-gray-800 rounded-xl p-6 lg:ml-auto"
                        >
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                                <CheckCircle
                                    size={18}
                                    className="mr-2 text-green-500"
                                />
                                Ready to transform your practice?
                            </h4>
                            <p className="text-gray-400 mb-5">
                                Join 100+ dental clinics that have already
                                revolutionized their front desk operations with
                                Kraftodent.
                            </p>
                            <Link href="/#contact">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center">
                                    Book a Free Demo
                                    <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <div className="pt-12 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {/* Logo and Description */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex items-center mb-4"
                            >
                                <img
                                    src="/Icon.png"
                                    alt="Kraftodent Logo"
                                    className="h-8 w-8 mr-2"
                                />
                                <h2 className="text-xl font-bold">
                                    Kraftodent
                                </h2>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="mb-6 max-w-sm text-gray-400"
                            >
                                India's First Dental AI Assistant That Works
                                24/7 So You Don't Have To. Revolutionizing
                                dental practice management across India.
                            </motion.p>

                            <div className="space-y-3">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
                                >
                                    <Mail size={16} className="mr-3" />
                                    <a href="mailto:contact@kraftxworks.com">
                                        contact@kraftxworks.com
                                    </a>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
                                >
                                    <Phone size={16} className="mr-3" />
                                    <a href="tel:+919822296812">
                                        +91 98222 96812
                                    </a>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="flex items-center text-gray-400"
                                >
                                    <MapPin size={16} className="mr-3" />
                                    <span>Pune, Maharashtra, India</span>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex mt-6 space-x-4"
                            >
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-blue-600 transition-colors"
                                        aria-label={`Visit Kraftodent ${link.label} page`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.icon}
                                    </a>
                                ))}
                            </motion.div>
                        </div>

                        {/* Footer Links */}
                        {footerLinks.map((column, columnIndex) => (
                            <div key={columnIndex}>
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.1 * columnIndex,
                                        duration: 0.5,
                                    }}
                                    viewport={{ once: true }}
                                    className="text-lg font-semibold mb-4 text-white"
                                >
                                    {column.title}
                                </motion.h3>
                                <ul className="space-y-2">
                                    {column.links.map((link, linkIndex) => (
                                        <motion.li
                                            key={linkIndex}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay:
                                                    0.1 * columnIndex +
                                                    0.05 * linkIndex,
                                                duration: 0.5,
                                            }}
                                            viewport={{ once: true }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                                            >
                                                {link.text}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-sm mb-4 md:mb-0 text-gray-500"
                        >
                            © {currentYear} Kraftodent. All rights reserved.
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="flex space-x-6 text-sm"
                        >
                            <Link
                                href="/terms"
                                className="text-gray-500 hover:text-gray-400"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/privacy"
                                className="text-gray-500 hover:text-gray-400"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-gray-500 hover:text-gray-400"
                            >
                                Cookie Policy
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
