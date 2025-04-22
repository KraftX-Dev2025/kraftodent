// src/components/sections/Hero.tsx
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
            className="relative min-h-[85vh] flex items-center justify-center pt-16 pb-12 overflow-hidden bg-gradient-to-b from-white to-blue-50"
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
                <div className="text-center max-w-4xl mx-auto mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold text-blue-600 mb-4"
                    >
                        AI Receptionist for Dental Practices in India
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
                            aria-label="Book a demo of Kraftodent AI Receptionist"
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
                            aria-label="See Kraftodent AI in action with feature demonstration"
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
            </div>
        </motion.section>
    );
}
