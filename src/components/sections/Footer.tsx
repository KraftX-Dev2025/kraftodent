import React from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
} from "lucide-react";

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
        <footer className="bg-blue-500 text-white">
            <div className="container mx-auto px-6">
                <div className="pt-16 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {/* Logo and Description */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center"
                            >
                                <img
                                    src="/logo.png"
                                    alt="Kraftodent Logo"
                                    className="h-18 w-auto bg-white rounded-xl mb-6"
                                />
                            </motion.div>
                            {/* <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex items-center mb-4"
                            >
                                <Sparkles className="h-8 w-8" />
                                <span className="ml-2 text-xl font-bold">
                                    Kraftodent
                                </span>
                            </motion.div> */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="mb-6 max-w-sm"
                            >
                                Transforming dental practices across India with
                                our AI-powered receptionist and practice
                                management solutions.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex items-center space-x-2 mb-6"
                            >
                                <Mail className="h-4 w-4" />
                                <span className="text-sm">
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
                                <Phone className="h-4 w-4" />
                                <span className="text-sm">
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
                                    className="text-lg font-semibold mb-4"
                                >
                                    {column.title}
                                </motion.h3>
                                <ul className="space-y-3">
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
                                                className="hover:text-blue-400 transition-colors text-sm"
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
                <div className="border-t py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-sm mb-4 md:mb-0"
                        >
                            © {currentYear} Kraftodent. All rights reserved.
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
                                    className="hover:text-blue-200 hover:scale-150 transition-colors"
                                    aria-label={`Social media link ${index + 1
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
