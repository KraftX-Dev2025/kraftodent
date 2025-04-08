"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
    return (
        <section id="hero" className="relative pt-16 pb-24 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white opacity-50"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        <span className="text-gray-500">
                            Welcome to Kraftodent,
                        </span>{" "}
                        <span className="text-kraftodent-blue">
                            the Premium Dental Supply Company.
                        </span>
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Trusted by hundreds of dental clinics and practitioners
                        across India
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            asChild
                            className="rounded-full bg-kraftodent-accent text-white hover:bg-kraftodent-accent/90 px-6 py-6 h-auto"
                        >
                            <Link
                                href="#product"
                                className="flex items-center gap-2"
                            >
                                <Image
                                    src="/images/play-button.svg"
                                    alt="Explore"
                                    width={20}
                                    height={20}
                                />
                                Explore Our Products
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Logos section */}
                <motion.div
                    className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="w-24 h-12 relative">
                        <Image
                            src="/images/partner-logo-1.webp"
                            alt="Dental Partner"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="w-24 h-12 relative">
                        <Image
                            src="/images/partner-logo-2.webp"
                            alt="Dental Partner"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="w-24 h-12 relative">
                        <Image
                            src="/images/partner-logo-3.png"
                            alt="Dental Partner"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="w-24 h-12 relative">
                        <Image
                            src="/images/partner-logo-4.webp"
                            alt="Dental Partner"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="w-24 h-12 relative">
                        <Image
                            src="/images/partner-logo-5.webp"
                            alt="Dental Partner"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="w-24 h-12 relative">
                        <Image
                            src="/images/partner-logo-6.webp"
                            alt="Dental Partner"
                            fill
                            className="object-contain"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
