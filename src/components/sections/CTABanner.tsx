import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
    return (
        <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg
                    className="absolute w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    {[...Array(3)].map((_, i) => (
                        <motion.circle
                            key={i}
                            cx={30 + i * 20}
                            cy={30 + i * 15}
                            r={20 + i * 10}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="0.5"
                            animate={{
                                r: [20 + i * 10, 25 + i * 10, 20 + i * 10],
                            }}
                            transition={{
                                duration: 8 + i,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
                        Ready to Supercharge Your Dental Front Desk?
                    </h2>
                    <p className="text-lg md:text-xl text-blue-100 mb-8 md:mb-10">
                        Try Kraftodent Free for 14 Days — No Credit Card Needed
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <a href="#contact">
                            <Button
                                size="lg"
                                className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-6 rounded-lg text-lg font-bold transition duration-300 flex items-center gap-2"
                            >
                                <span>Book Your Free Demo Now</span>
                                <ArrowRight size={20} />
                            </Button>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
