// src/components/sections/Hero.tsx
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Play,
    MessageSquare,
    PhoneCall,
    CalendarCheck,
    Bot,
} from "lucide-react";
import Link from "next/link";

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

    // Animated typing text
    const typingTexts = [
        "Never miss a call again.",
        "Schedule appointments 24/7.",
        "Save 40% on staff costs.",
        "Improve patient experience.",
        "Automate routine tasks.",
    ];

    const [typingTextIndex, setTypingTextIndex] = useState(0);

    useEffect(() => {
        if (!isMounted) return;

        const interval = setInterval(() => {
            setTypingTextIndex((prev) => (prev + 1) % typingTexts.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isMounted, typingTexts.length]);

    return (
        <motion.section
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative min-h-[90vh] flex items-center justify-center pt-16 pb-12 overflow-hidden bg-gradient-to-b from-white to-blue-50"
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-left max-w-2xl"
                    >
                        <div className="mb-2">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4"
                            >
                                AI Automation for Dental Practices
                            </motion.span>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl font-bold text-blue-600 mb-4 leading-tight"
                        >
                            Your AI Receptionist That Works 24/7
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative h-8 md:h-12 mb-8"
                        >
                            {typingTexts.map((text, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity:
                                            typingTextIndex === index ? 1 : 0,
                                        y: typingTextIndex === index ? 0 : 10,
                                    }}
                                    className="absolute text-xl md:text-2xl text-gray-600 left-0 right-0"
                                >
                                    {text}
                                </motion.p>
                            ))}
                        </motion.div>

                        <motion.ul
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-8 space-y-2"
                        >
                            {[
                                {
                                    icon: <PhoneCall size={16} />,
                                    text: "Answer every call with a human-like voice",
                                },
                                {
                                    icon: <CalendarCheck size={16} />,
                                    text: "Schedule appointments automatically",
                                },
                                {
                                    icon: <Bot size={16} />,
                                    text: "Supports multiple Indian languages",
                                },
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.4 + index * 0.1,
                                        duration: 0.5,
                                    }}
                                    className="flex items-center text-gray-600"
                                >
                                    <span className="mr-2 text-blue-500">
                                        {item.icon}
                                    </span>
                                    {item.text}
                                </motion.li>
                            ))}
                        </motion.ul>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4"
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

                            <Link
                                href="/demo"
                                aria-label="Try Kraftodent AI receptionist in interactive demo"
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 rounded-lg text-lg font-semibold transition duration-300 flex items-center gap-2 w-full sm:w-auto"
                                >
                                    <MessageSquare
                                        size={20}
                                        className="text-blue-600"
                                    />
                                    Try Interactive Demo
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Animation/Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hidden lg:flex justify-center relative"
                    >
                        <div className="relative w-full max-w-md">
                            {/* Main illustration */}
                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: [-10, 10, -10] }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                }}
                                className="p-6 bg-white rounded-2xl shadow-xl border border-blue-100 relative z-10"
                            >
                                {/* Mock UI */}
                                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2">
                                                <Bot size={16} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium">
                                                    Kraftodent AI
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Online
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chat bubbles */}
                                    <div className="space-y-3">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                delay: 0.8,
                                                duration: 0.5,
                                            }}
                                            className="bg-blue-600 text-white p-3 rounded-lg rounded-tl-none max-w-[80%] ml-2"
                                        >
                                            <p className="text-sm">
                                                Hello! How can I help you today?
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                delay: 1.3,
                                                duration: 0.5,
                                            }}
                                            className="bg-gray-200 p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto"
                                        >
                                            <p className="text-sm">
                                                I need to schedule a dental
                                                cleaning
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                delay: 1.8,
                                                duration: 0.5,
                                            }}
                                            className="bg-blue-600 text-white p-3 rounded-lg rounded-tl-none max-w-[80%] ml-2"
                                        >
                                            <p className="text-sm">
                                                I'd be happy to help you
                                                schedule that. What day works
                                                best for you?
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Buttons and UI elements */}
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <div className="text-xs text-gray-500 mb-1">
                                            Available Slots
                                        </div>
                                        <div className="flex space-x-2">
                                            {["9:30", "11:00", "2:15"].map(
                                                (time, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{
                                                            scale: 0.9,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            scale: 1,
                                                            opacity: 1,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                2.2 + i * 0.1,
                                                            duration: 0.3,
                                                        }}
                                                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
                                                    >
                                                        {time}
                                                    </motion.div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            delay: 2.5,
                                            duration: 0.3,
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
                                    >
                                        Schedule Now
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Decorative elements */}
                            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-blue-400/10 rounded-full z-0" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-blue-200/20 rounded-full z-0" />

                            {/* Floating elements */}
                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: [-15, 5, -15] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    delay: 1,
                                }}
                                className="absolute top-[-15%] left-[15%] p-2 bg-white rounded-lg shadow-lg z-20"
                            >
                                <PhoneCall
                                    size={20}
                                    className="text-blue-500"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: [10, -10, 10] }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    delay: 0.5,
                                }}
                                className="absolute bottom-[-10%] right-[20%] p-2 bg-white rounded-lg shadow-lg z-20"
                            >
                                <CalendarCheck
                                    size={20}
                                    className="text-green-500"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Floating stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12"
                >
                    {[
                        { value: "40%", label: "Cost Reduction" },
                        { value: "24/7", label: "Availability" },
                        { value: "98%", label: "Patient Satisfaction" },
                        { value: "100+", label: "Clinics Trust Us" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.7 + index * 0.1,
                                duration: 0.5,
                            }}
                            className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md flex items-center"
                        >
                            <span className="text-xl font-bold text-blue-600 mr-2">
                                {stat.value}
                            </span>
                            <span className="text-gray-600">{stat.label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}
