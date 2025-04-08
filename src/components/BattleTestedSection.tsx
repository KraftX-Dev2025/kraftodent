"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const BattleTestedSection = () => {
    return (
        <section className="py-16 bg-kraftodent-blue-50">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                        PROVEN QUALITY
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Over 1,000+ dental clinics <br /> trust our products
                        across India
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Trusted by leading dental practitioners and clinics
                        nationwide
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            asChild
                            className="rounded-full bg-kraftodent-blue text-white hover:bg-kraftodent-blue/90 px-6 py-6 h-auto"
                        >
                            <Link href="/contact">Request Quote</Link>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Map Section */}
                <motion.div
                    className="max-w-5xl mx-auto mt-16 mb-24 relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="relative w-full h-[300px] md:h-[400px]">
                            <Image
                                src="/images/india-map.webp"
                                alt="India Map"
                                fill
                                className="object-contain"
                            />

                            {/* Map indicators */}
                            <motion.div
                                className="absolute top-1/4 left-1/4"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <div className="w-6 h-6 bg-kraftodent-accent rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-full"></div>
                                </div>
                                <div className="text-xs font-medium mt-1">
                                    Mumbai
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute top-1/3 right-1/3"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    delay: 0.5,
                                }}
                            >
                                <div className="w-6 h-6 bg-kraftodent-accent rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-full"></div>
                                </div>
                                <div className="text-xs font-medium mt-1">
                                    Delhi
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute bottom-1/3 left-1/5"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    delay: 1,
                                }}
                            >
                                <div className="w-6 h-6 bg-kraftodent-accent rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-full"></div>
                                </div>
                                <div className="text-xs font-medium mt-1">
                                    Bengaluru
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute bottom-1/4 right-1/4"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    delay: 1.5,
                                }}
                            >
                                <div className="w-6 h-6 bg-kraftodent-accent rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-full"></div>
                                </div>
                                <div className="text-xs font-medium mt-1">
                                    Pune
                                </div>
                            </motion.div>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">
                            *Representative of our major market areas
                        </p>
                    </div>
                </motion.div>

                {/* Testimonial Section */}
                <motion.div
                    className="max-w-4xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-full overflow-hidden relative">
                                <Image
                                    src="/images/testimonial-avatar.png"
                                    alt="Dr. Rajesh Sharma"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-sm font-semibold mt-2">
                                Dr. Rajesh Sharma
                            </p>
                            <p className="text-xs text-gray-500">
                                Director | Smile Care Dental Clinic
                            </p>
                        </div>
                        <div>
                            <p className="text-lg">
                                Kraftodent products have{" "}
                                <span className="text-kraftodent-accent">
                                    improved our clinical outcomes by 15%
                                </span>
                                . Their superior quality composites and bonding
                                agents have significantly reduced our
                                post-operative complications. We've noticed{" "}
                                <span className="text-kraftodent-accent">
                                    increased patient satisfaction by 22%
                                </span>
                                , which has resulted in more referrals and{" "}
                                <span className="text-kraftodent-accent">
                                    18% growth in our practice
                                </span>
                                . Kraftodent has become an essential partner in
                                our success.
                            </p>
                            <div className="mt-4">
                                <Button
                                    variant="outline"
                                    className="border-kraftodent-blue text-kraftodent-blue"
                                >
                                    Full Case Study
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Metrics Section */}
                <div className="mt-24 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-sm"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Image
                                    src="/images/play-button.svg"
                                    alt="Icon"
                                    width={20}
                                    height={20}
                                    className="text-kraftodent-accent"
                                />
                                <div className="text-sm font-semibold">
                                    With Kraftodent
                                </div>
                            </div>
                            <div className="text-xs text-gray-500">
                                Performance improvements
                            </div>
                            <div className="h-32 relative mt-4">
                                <div className="absolute inset-0 flex items-end">
                                    <div className="w-1/6 h-1/4 bg-kraftodent-accent rounded-t-sm mx-1"></div>
                                    <div className="w-1/6 h-2/4 bg-kraftodent-accent rounded-t-sm mx-1"></div>
                                    <div className="w-1/6 h-3/4 bg-kraftodent-accent rounded-t-sm mx-1"></div>
                                    <div className="w-1/6 h-full bg-kraftodent-accent rounded-t-sm mx-1"></div>
                                    <div className="w-1/6 h-3/4 bg-kraftodent-accent rounded-t-sm mx-1"></div>
                                    <div className="w-1/6 h-2/4 bg-kraftodent-accent rounded-t-sm mx-1"></div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-sm"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Image
                                    src="/images/play-button.svg"
                                    alt="Icon"
                                    width={20}
                                    height={20}
                                    className="text-kraftodent-accent"
                                />
                                <div className="text-sm font-semibold">
                                    Conventional Products
                                </div>
                            </div>
                            <div className="text-xs text-gray-500">
                                Standard performance
                            </div>
                            <div className="h-32 relative mt-4">
                                <div className="absolute inset-0 flex items-end">
                                    <div className="w-1/6 h-2/5 bg-gray-300 rounded-t-sm mx-1"></div>
                                    <div className="w-1/6 h-2/5 bg-gray-300 rounded-t-sm mx-1"></div>
                                    <div className="w-1/6 h-2/5 bg-gray-300 rounded-t-sm mx-1"></div>
                                    <div className="w-1/6 h-2/5 bg-gray-300 rounded-t-sm mx-1"></div>
                                    <div className="w-1/6 h-2/5 bg-gray-300 rounded-t-sm mx-1"></div>
                                    <div className="w-1/6 h-2/5 bg-gray-300 rounded-t-sm mx-1"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BattleTestedSection;
