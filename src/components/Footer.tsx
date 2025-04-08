"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="bg-kraftodent-blue py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
                    {/* Logo and tagline */}
                    <div className="md:col-span-4 lg:col-span-1 mb-8">
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Link
                                href="/#hero"
                                className="flex items-center mb-4"
                            >
                                <div className="relative h-10 w-32">
                                    <Image
                                        src="/images/kraftodent-logo.svg"
                                        alt="Kraftodent logo"
                                        fill
                                        className="object-contain brightness-0 invert"
                                    />
                                </div>
                            </Link>
                        </motion.div>
                        <p className="text-kraftodent-blue-100 text-sm mb-6">
                            Trusted by hundreds of dental clinics and
                            practitioners across India
                        </p>
                        <div className="flex items-center">
                            <Image
                                src="/images/iso-certified.webp"
                                alt="ISO Certified"
                                width={120}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Learn Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Learn</h4>
                        <nav className="flex flex-col space-y-3">
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="/#hero"
                                    className="text-kraftodent-blue-100 hover:text-white text-sm"
                                >
                                    Our Story
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="/#product"
                                    className="text-kraftodent-blue-100 hover:text-white text-sm"
                                >
                                    Products
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="/#case-studies"
                                    className="text-kraftodent-blue-100 hover:text-white text-sm"
                                >
                                    Case Studies
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="/#research"
                                    className="text-kraftodent-blue-100 hover:text-white text-sm"
                                >
                                    Research
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="/#quality"
                                    className="text-kraftodent-blue-100 hover:text-white text-sm"
                                >
                                    Quality Control
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="/certifications"
                                    className="text-kraftodent-blue-100 hover:text-white text-sm"
                                >
                                    Certifications
                                </Link>
                            </motion.div>
                        </nav>
                    </div>

                    {/* Contact Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <nav className="flex flex-col space-y-3">
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="mailto:contact@kraftodent.com"
                                    className="text-kraftodent-blue-100 hover:text-white text-sm"
                                >
                                    contact@kraftodent.com
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="tel:+919028002031"
                                    className="text-kraftodent-blue-100 hover:text-white text-sm"
                                >
                                    +91 9028002031
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="https://twitter.com/kraftodent"
                                    className="text-kraftodent-blue-100 hover:text-white text-sm"
                                >
                                    Twitter/X
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="https://www.linkedin.com/company/kraftodent/"
                                    className="text-kraftodent-blue-100 hover:text-white text-sm"
                                >
                                    LinkedIn
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="https://www.facebook.com/kraftodent/"
                                    className="text-kraftodent-blue-100 hover:text-white text-sm"
                                >
                                    Facebook
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="/careers"
                                    className="text-kraftodent-blue-100 hover:text-white text-sm"
                                >
                                    We are hiring!
                                </Link>
                            </motion.div>
                        </nav>
                    </div>

                    {/* Location */}
                    <div>
                        <h4 className="font-semibold mb-4">Location</h4>
                        <address className="text-kraftodent-blue-100 text-sm not-italic">
                            Alankar Building, 25,
                            <br />
                            above Vidya Sahakari Bank,
                            <br />
                            Mukund Nagar, Pune,
                            <br />
                            Maharashtra 411037
                            <br />
                            India
                        </address>
                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Terms</h4>
                            <nav className="flex flex-col space-y-3">
                                <motion.div
                                    whileHover={{ x: 3 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        href="/privacy-policy"
                                        className="text-kraftodent-blue-100 hover:text-white text-sm"
                                    >
                                        Privacy Policy
                                    </Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{ x: 3 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        href="/terms-of-use"
                                        className="text-kraftodent-blue-100 hover:text-white text-sm"
                                    >
                                        Terms of Use
                                    </Link>
                                </motion.div>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-kraftodent-blue-200/30 text-center">
                    <p className="text-kraftodent-blue-100 text-sm">
                        © 2025 Kraftodent, all rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
