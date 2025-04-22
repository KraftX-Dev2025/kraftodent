// src/components/sections/Hero.tsx
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";

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

    // Define fixed background bubble positions
    const backgroundBubbles = [
        { width: 180, height: 180, x: "10%", y: "15%" },
        { width: 250, height: 250, x: "30%", y: "25%" },
        { width: 150, height: 150, x: "70%", y: "20%" },
        { width: 200, height: 200, x: "85%", y: "40%" },
        { width: 300, height: 300, x: "20%", y: "60%" },
        { width: 280, height: 280, x: "50%", y: "75%" },
    ];

    return (
        <motion.section
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-gradient-to-b from-white to-blue-50"
        >
            {/* Animated Background Elements */}
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
                                duration: 10 + (i % 10),
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                    ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold text-blue-600 mb-4"
                    >
                        Start booking more patients today
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-600 mb-8"
                    >
                        Never lose a new patient to voicemail again. Schedule
                        patients 24/7.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <a
                            href="#contact"
                            aria-label="Book a demo of KraftODent AI Receptionist"
                        >
                            <Button
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-lg font-semibold transition duration-300 w-full sm:w-auto"
                            >
                                Book a Demo
                            </Button>
                        </a>
                        <a
                            href="#example"
                            aria-label="See KraftODent AI in action with feature demonstration"
                        >
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 rounded-lg text-lg font-semibold transition duration-300 flex items-center gap-2 w-full sm:w-auto"
                            >
                                <Play size={20} className="text-blue-600" />
                                See it in Action
                            </Button>
                        </a>
                    </motion.div>
                </div>

                {/* Wave Animation */}
                <div className="w-full h-32 relative">
                    {isMounted && (
                        <motion.svg
                            className="w-full h-full absolute bottom-0"
                            viewBox="0 0 1200 200"
                            preserveAspectRatio="none"
                        >
                            <motion.path
                                d="M0,40 C300,100 600,0 1200,40 L1200,200 L0,200 Z"
                                fill="rgba(255, 255, 255, 0.3)"
                                animate={{
                                    d: [
                                        "M0,40 C300,100 600,0 1200,40 L1200,200 L0,200 Z",
                                        "M0,20 C300,80 600,20 1200,20 L1200,200 L0,200 Z",
                                    ],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            />
                        </motion.svg>
                    )}
                </div>

                {/* Trusted By Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mt-12 text-center"
                >
                    <p className="text-black font-bold mb-6">
                        Trusted by hundreds of dental practices across India
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        {[
                            {
                                name: "Sukhadanta",
                                url: "http://sukhadanta.com/",
                                id: "sukhadanta",
                            },
                            {
                                name: "Ora Care",
                                url: "https://oracaredental.in/",
                                id: "oracare",
                            },
                            {
                                name: "Dental Care",
                                url: "https://www.dentalcare.com/",
                                id: "dentalcare",
                            },
                            {
                                name: "Smile Studio",
                                url: "https://www.smilestudio.com/",
                                id: "smilestudio",
                            },
                            {
                                name: "Perfect Dental",
                                url: "https://perfectdental.com/",
                                id: "perfectdental",
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
                                className="px-6"
                            >
                                <a
                                    href={practice.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit ${practice.name} website - KraftODent customer`}
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
