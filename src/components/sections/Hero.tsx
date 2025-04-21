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

    // Define fixed background bubble positions instead of using random values
    const backgroundBubbles = [
        { width: 180, height: 180, x: "10%", y: "15%" },
        { width: 250, height: 250, x: "30%", y: "25%" },
        { width: 150, height: 150, x: "70%", y: "20%" },
        { width: 200, height: 200, x: "85%", y: "40%" },
        { width: 300, height: 300, x: "20%", y: "60%" },
        { width: 280, height: 280, x: "50%", y: "75%" },
        { width: 170, height: 170, x: "80%", y: "80%" },
        { width: 220, height: 220, x: "40%", y: "85%" },
        { width: 190, height: 190, x: "90%", y: "10%" },
        { width: 160, height: 160, x: "15%", y: "45%" },
        { width: 240, height: 240, x: "75%", y: "50%" },
        { width: 320, height: 320, x: "55%", y: "30%" },
        { width: 200, height: 200, x: "25%", y: "35%" },
        { width: 270, height: 270, x: "60%", y: "65%" },
        { width: 210, height: 210, x: "5%", y: "70%" },
        { width: 230, height: 230, x: "45%", y: "5%" },
        { width: 340, height: 340, x: "65%", y: "90%" },
        { width: 260, height: 260, x: "35%", y: "55%" },
        { width: 140, height: 140, x: "95%", y: "60%" },
        { width: 290, height: 290, x: "5%", y: "95%" }
    ];

    return (
        <motion.section
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-gradient-to-b from-white to-blue-50"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {isMounted && backgroundBubbles.map((bubble, i) => (
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
                            duration: 10 + i % 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Welcome to{" "}
                            <span className="text-blue-600">Kraftodent</span>,
                            <br />
                            <span className="text-5xl md:text-7xl">
                                the AI Receptionist for Dentists.
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                            Transform your dental practice with Kraftodent's
                            intelligent automation. Handle scheduling, patient
                            communication, and practice management with AI
                            precision.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                key="Book Demo"
                                href="#contact"
                                className=""
                            >
                                <Button
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-lg font-semibold transition duration-300"
                                >
                                    Book Demo
                                </Button>
                            </a>
                            <a
                                key="See it in Action"
                                href="#contact"
                                className=""
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 rounded-lg text-lg font-semibold transition duration-300 flex items-center gap-2"
                                >
                                    <Play size={20} className="text-blue-600" />
                                    See it in Action
                                </Button>
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="md:w-1/2 mt-10 md:mt-0"
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
                            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-blue-100">
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
                                                <div className="w-32 h-32 rounded-full bg-blue-600/20 flex items-center justify-center">
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.2, 1],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                        }}
                                                        className="w-24 h-24 rounded-full bg-blue-600/40 flex items-center justify-center"
                                                    >
                                                        <motion.div
                                                            animate={{
                                                                scale: [1, 1.2, 1],
                                                            }}
                                                            transition={{
                                                                duration: 1.5,
                                                                repeat: Infinity,
                                                            }}
                                                            className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="32"
                                                                height="32"
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

                                            {/* Voice Waves */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                {[...Array(4)].map((_, i) => (
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
                                                <div className="w-32 h-32 rounded-full bg-blue-600/20 flex items-center justify-center">
                                                    <div className="w-24 h-24 rounded-full bg-blue-600/40 flex items-center justify-center">
                                                        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="32"
                                                                height="32"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                                                <line x1="12" x2="12" y1="19" y2="22"></line>
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

                {/* Trusted By Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mt-20 text-center"
                >
                    <p className="text-black font-bold mb-6">
                        Trusted by hundreds of dental practices across India
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        {[
                            { name: "Sukhadanta", url: "http://sukhadanta.com/" },
                            { name: "Ora Care", url: "https://oracaredental.in/" },
                            { name: "Dental Care", url: "https://www.dentalcare.com/" },
                            { name: "Smile Studio", url: "https://www.smilestudio.com/" },
                            { name: "Perfect Dental", url: "https://perfectdental.com/" },
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