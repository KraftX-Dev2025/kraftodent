import React from "react";
import { motion } from "framer-motion";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <Facebook className="h-5 w-5" />, href: "#" },
        { icon: <Twitter className="h-5 w-5" />, href: "#" },
        { icon: <Instagram className="h-5 w-5" />, href: "#" },
        { icon: <Linkedin className="h-5 w-5" />, href: "#" },
    ];

    const footerLinks = [
        {
            title: "Product",
            links: [
                { text: "Features", href: "#features" },
                { text: "Pricing", href: "#" },
                { text: "Integrations", href: "#" },
                { text: "Updates", href: "#" },
            ],
        },
        {
            title: "Resources",
            links: [
                { text: "Documentation", href: "#" },
                { text: "Tutorials", href: "#" },
                { text: "Blog", href: "#" },
                { text: "Case Studies", href: "#case-studies" },
            ],
        },
        {
            title: "Company",
            links: [
                { text: "About Us", href: "#" },
                { text: "Careers", href: "#" },
                { text: "Contact", href: "#contact" },
                { text: "Partners", href: "#" },
            ],
        },
    ];

    return (
        <footer className="bg-blue-600 text-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="pt-12 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {/* Logo and Description */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="mb-6"
                            >
                                <div className="bg-white p-1 rounded-xl inline-block shadow-md">
                                    <Image
                                        src="/logo.webp"
                                        alt="Company Logo"
                                        width={60}
                                        height={40}
                                        className="h-auto"
                                    />
                                </div>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="mb-6 max-w-sm text-blue-100"
                            >
                                India's First Dental AI Assistant That Works
                                24/7 So You Don't Have To.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex items-center space-x-2 mb-4"
                            >
                                <Mail className="h-4 w-4 text-blue-200" />
                                <span className="text-sm text-blue-100">
                                    contact@kraftxworks.com
                                </span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex items-center space-x-2"
                            >
                                <Phone className="h-4 w-4 text-blue-200" />
                                <span className="text-sm text-blue-100">
                                    +91 9822296812
                                </span>
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
                                            <a
                                                href={link.href}
                                                className="text-blue-100 hover:text-white transition-colors text-sm"
                                            >
                                                {link.text}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-blue-500 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-sm mb-4 md:mb-0 text-blue-100"
                        >
                            © {currentYear} KraftODent. All rights reserved.
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="flex space-x-4"
                        >
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="text-blue-200 hover:text-white hover:scale-110 transition-all"
                                    aria-label={`Social media link ${
                                        index + 1
                                    }`}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
