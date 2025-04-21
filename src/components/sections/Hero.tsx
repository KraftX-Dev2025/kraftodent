"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function Hero() {
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    // Client-side only state
    const [isMounted, setIsMounted] = useState(false);

    // Set mounted state after hydration is complete
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Define fixed background bubble positions with fewer elements for better performance
    const backgroundBubbles = [
        { width: 180, height: 180, x: "10%", y: "15%" },
        { width: 250, height: 250, x: "30%", y: "25%" },
        { width: 150, height: 150, x: "70%", y: "20%" },
        { width: 200, height: 200, x: "85%", y: "40%" },
        { width: 280, height: 280, x: "50%", y: "75%" },
        { width: 170, height: 170, x: "80%", y: "80%" },
        { width: 190, height: 190, x: "90%", y: "10%" },
        { width: 240, height: 240, x: "75%", y: "50%" },
    ];

    return (
        <motion.section
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-16 pb-12 lg:pt-24 lg:pb-20 overflow-hidden bg-gradient-to-b from-white to-blue-50"
        >
            {/* Animated Background Elements - Reduced for better performance */}
            <div className="absolute inset-0 overflow-hidden">
                {isMounted &&
                    backgroundBubbles.map((bubble, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-blue-200/20 rounded-full"
                            initial={{
                                width: bubble.width,
                                height: bubble.height,
                                x: bubble.x,
                                y: bubble.y,
                                opacity: 0.1 + (i % 3) * 0.1,
                            }}
                            animate={{
                                y: ["0%", i % 2 === 0 ? "5%" : "-5%"],
                                x: ["0%", i % 3 === 0 ? "5%" : "-5%"],
                            }}
                            transition={{
                                duration: 10 + (i % 5), // Reduced variability
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                    ))}
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 md:mb-6">
                            <span className="text-blue-600">
                                24/7 AI Dental Assistant
                            </span>{" "}
                            for Smarter Clinics
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl">
                            Never miss a patient call, appointment, or
                            follow-up. KraftODent automates your front desk —
                            even when you're off the clock.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#contact" className="">
                                <Button
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-lg text-base md:text-lg font-semibold transition duration-300 w-full sm:w-auto"
                                >
                                    Book a Free Demo
                                </Button>
                            </a>
                            <a href="#product" className="">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-5 rounded-lg text-base md:text-lg font-semibold transition duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
                                >
                                    <Play size={20} className="text-blue-600" />
                                    See How It Works
                                </Button>
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="md:w-1/2 mt-8 md:mt-0"
                    >
                        <div className="relative">
                            {isMounted ? (
                                <motion.div
                                    className="absolute inset-0 bg-blue-600 rounded-xl blur-2xl"
                                    animate={{
                                        opacity: [0.2, 0.4, 0.2],
                                        scale: [0.8, 1, 0.8],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    }}
                                />
                            ) : (
                                <div className="absolute inset-0 bg-blue-600/30 rounded-xl blur-2xl" />
                            )}
                            <div className="relative bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-xl border border-blue-100">
                                <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden">
                                    {isMounted ? (
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.05, 1],
                                                rotate: [0, 5, 0, -5, 0],
                                            }}
                                            transition={{
                                                duration: 8,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                            }}
                                            className="w-3/4 h-3/4 relative"
                                        >
                                            {/* AI Assistant Visualization */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-600/20 flex items-center justify-center">
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.2, 1],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                        }}
                                                        className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-600/40 flex items-center justify-center"
                                                    >
                                                        <motion.div
                                                            animate={{
                                                                scale: [
                                                                    1, 1.2, 1,
                                                                ],
                                                            }}
                                                            transition={{
                                                                duration: 1.5,
                                                                repeat: Infinity,
                                                            }}
                                                            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 flex items-center justify-center text-white"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                                                <line
                                                                    x1="12"
                                                                    x2="12"
                                                                    y1="19"
                                                                    y2="22"
                                                                ></line>
                                                            </svg>
                                                        </motion.div>
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Voice Waves - Reduced number for better performance */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                {[...Array(3)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute w-full h-full rounded-full border-2 border-blue-600/30"
                                                        animate={{
                                                            scale: [0, 1],
                                                            opacity: [1, 0],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            delay: i * 0.5,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="w-3/4 h-3/4 relative">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-600/20 flex items-center justify-center">
                                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-600/40 flex items-center justify-center">
                                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                                                <line
                                                                    x1="12"
                                                                    x2="12"
                                                                    y1="19"
                                                                    y2="22"
                                                                ></line>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Chat bubbles */}
                                <div className="mt-4 space-y-3">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.8,
                                            duration: 0.5,
                                        }}
                                        className="bg-gray-100 rounded-lg p-3 max-w-[80%]"
                                    >
                                        <p className="text-sm">
                                            I'd like to book an appointment for
                                            next week
                                        </p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 1.3,
                                            duration: 0.5,
                                        }}
                                        className="bg-blue-600 rounded-lg p-3 max-w-[80%] ml-auto text-white"
                                    >
                                        <p className="text-sm">
                                            I can schedule you for Tuesday at 2
                                            PM. Does that work for you?
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Trusted By Section - Simplified for better performance */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mt-12 md:mt-16 text-center"
                >
                    <p className="text-black font-bold mb-4 md:mb-6">
                        Trusted by hundreds of dental practices across India
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                        {[
                            {
                                name: "Sukhadanta",
                                url: "http://sukhadanta.com/",
                            },
                            {
                                name: "Ora Care",
                                url: "https://oracaredental.in/",
                            },
                            {
                                name: "Dental Care",
                                url: "https://www.dentalcare.com/",
                            },
                            {
                                name: "Smile Studio",
                                url: "https://www.smilestudio.com/",
                            },
                        ].map((practice, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.7 }}
                                whileHover={{ opacity: 1, scale: 1.05 }}
                                transition={{
                                    delay: 1.5 + index * 0.1,
                                    duration: 0.3,
                                }}
                                className="px-4 md:px-6"
                            >
                                <a
                                    href={practice.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-700 font-semibold transition-colors duration-300 hover:scale-125"
                                >
                                    {practice.name}
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
