import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    CheckCircle,
    Calendar,
    Clock,
    PhoneCall,
    Star,
} from "lucide-react";
import Link from "next/link";
import { ctaIcons, ctaPositions } from "@/lib/constants";

export default function CTABanner() {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Animated circles with fixed positions instead of random */}
                {[...Array(5)].map((_, i) => {
                    return (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-white/10"
                            style={{
                                width: `${100 + i * 50}px`,
                                height: `${100 + i * 50}px`,
                                top: ctaPositions[i].top,
                                left: ctaPositions[i].left,
                            }}
                            initial={{ scale: 0.8, opacity: 0.1 }}
                            animate={{
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.1, 0.2, 0.1],
                            }}
                            transition={{
                                duration: 10 + i * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-700/50 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Ready to Supercharge Your Dental Practice?
                        </h2>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                            Join over 100+ dental clinics already saving time
                            and money with Kraftodent's AI receptionist
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            {ctaIcons.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.2 + index * 0.1,
                                    }}
                                    viewport={{ once: true }}
                                    className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                                >
                                    <div className="mr-2 text-blue-300">
                                        <item.icon size={item.size} />
                                    </div>
                                    <span className="text-sm text-white font-medium">
                                        {item.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block mb-6"
                        >
                            <Link href="#contact">
                                <Button
                                    size="lg"
                                    className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 rounded-lg text-lg font-bold transition duration-300 flex items-center gap-2 shadow-lg"
                                >
                                    <span>Book Your Free Demo Now</span>
                                    <ArrowRight size={20} />
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-blue-200 text-sm flex items-center justify-center"
                        >
                            <CheckCircle size={16} className="mr-2" />
                            <span>
                                No credit card required • 30-day money-back
                                guarantee
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Testimonial or social proof */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                                    PD
                                </div>
                            </div>
                            <div className="flex-grow">
                                <p className="text-blue-50 italic mb-3">
                                    "Kraftodent has completely transformed how
                                    we handle patient calls and scheduling.
                                    We're seeing a 40% reduction in
                                    administrative work, which translates to
                                    more time focused on patient care. The ROI
                                    is incredible!"
                                </p>
                                <div className="text-white font-medium">
                                    Dr. Priya Desai
                                    <span className="text-blue-200 font-normal ml-2">
                                        • Smile Bright Dental Clinic, Mumbai
                                    </span>
                                </div>
                            </div>
                            <div className="hidden md:flex flex-col items-end space-y-1">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 text-yellow-400"
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>
                                <div className="text-sm text-blue-200">
                                    Joined June 2024
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}