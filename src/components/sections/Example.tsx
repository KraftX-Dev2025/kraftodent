// src/components/sections/Example.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    MessageSquare,
    Play,
    X,
    Volume2,
    PauseCircle,
    Maximize2,
} from "lucide-react";
import Link from "next/link";

export default function Example() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0);

    // Function to toggle play state
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            // Simulate video progress
            const interval = setInterval(() => {
                setProgressPercent((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 300);
        }
    };

    return (
        <section
            id="example"
            className="py-16 md:py-24 bg-white relative overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="smallGrid"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 20 0 L 0 0 0 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#smallGrid)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4"
                    >
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                            <Play size={14} className="mr-1" /> Video
                            Demonstration
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
                        See Kraftodent in Action
                    </h2>
                    <p className="text-lg text-gray-600">
                        Watch how our AI receptionist handles real patient
                        conversations and schedules appointments
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto relative"
                >
                    {/* Video Player UI */}
                    <div className="relative">
                        {/* Top Video Controls */}
                        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent">
                            <div className="text-white text-lg font-medium">
                                Kraftodent AI Receptionist Demo
                            </div>
                            <button
                                onClick={() => {}}
                                className="text-white/80 hover:text-white"
                                aria-label="Close video"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Video Container */}
                        <div className="relative pb-[56.25%] h-0 overflow-hidden">
                            {/* Video Placeholder */}
                            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                                {/* Audio Wave Animation */}
                                <div className="w-full h-28 mb-8 flex items-center justify-center">
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="h-8 w-1.5 mx-[1px] bg-blue-500"
                                            animate={{
                                                height: isPlaying
                                                    ? [
                                                          Math.random() * 20 +
                                                              10,
                                                          Math.random() * 70 +
                                                              30,
                                                          Math.random() * 20 +
                                                              10,
                                                      ]
                                                    : 8,
                                            }}
                                            transition={{
                                                duration: isPlaying ? 1 : 0.5,
                                                repeat: isPlaying
                                                    ? Infinity
                                                    : 0,
                                                delay: i * 0.02,
                                                ease: "easeInOut",
                                            }}
                                            style={{
                                                opacity: isPlaying
                                                    ? 0.7 + Math.random() * 0.3
                                                    : 0.4,
                                                borderRadius: "2px",
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Caption Text */}
                                <div className="text-white text-center px-4">
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: isPlaying ? 1 : 0.7,
                                        }}
                                        className="text-xl md:text-2xl mb-4"
                                    >
                                        {isPlaying
                                            ? "AI: How can I help you schedule your appointment today?"
                                            : "Click play to see the AI receptionist in action"}
                                    </motion.p>

                                    {isPlaying && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1.5 }}
                                            className="text-white/70 text-lg"
                                        >
                                            Patient: I need to book a dental
                                            cleaning next week.
                                        </motion.p>
                                    )}
                                </div>

                                {/* Large play button (shows when paused) */}
                                {!isPlaying && (
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={togglePlay}
                                        className="absolute inset-0 w-full h-full flex items-center justify-center"
                                        aria-label="Play video"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                            <Play size={32} className="ml-2" />
                                        </div>
                                    </motion.button>
                                )}
                            </div>
                        </div>

                        {/* Bottom Video Controls */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                            <div className="flex items-center mb-2">
                                {/* Progress bar */}
                                <div className="relative flex-1 h-1.5 bg-gray-700 rounded-full mx-2">
                                    <motion.div
                                        className="absolute h-full bg-blue-600 rounded-full"
                                        initial={{ width: "0%" }}
                                        animate={{
                                            width: `${progressPercent}%`,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                <div className="text-white text-xs ml-2 min-w-[40px]">
                                    {isPlaying ? "01:43" : "03:24"}
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex space-x-4">
                                    {/* Play/Pause button */}
                                    <button
                                        onClick={togglePlay}
                                        className="text-white hover:text-blue-400 transition"
                                        aria-label={
                                            isPlaying ? "Pause" : "Play"
                                        }
                                    >
                                        {isPlaying ? (
                                            <PauseCircle size={22} />
                                        ) : (
                                            <Play size={22} />
                                        )}
                                    </button>

                                    {/* Volume button */}
                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="text-white hover:text-blue-400 transition"
                                        aria-label={isMuted ? "Unmute" : "Mute"}
                                    >
                                        <Volume2
                                            size={22}
                                            className={
                                                isMuted ? "opacity-50" : ""
                                            }
                                        />
                                    </button>
                                </div>

                                <div className="flex space-x-4">
                                    {/* Full screen button */}
                                    <button
                                        className="text-white hover:text-blue-400 transition"
                                        aria-label="Full screen"
                                    >
                                        <Maximize2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="text-center mt-12 space-y-6">
                    <p className="text-gray-600 text-lg">
                        Want to interact directly with our AI receptionist?
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/demo">
                            <Button
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-lg font-semibold transition duration-300 flex items-center gap-2"
                            >
                                <MessageSquare size={20} />
                                Try Interactive Demo
                            </Button>
                        </Link>

                        <a href="#features">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 rounded-lg text-lg font-semibold transition duration-300"
                            >
                                Explore Features
                            </Button>
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="bg-blue-50 p-6 max-w-2xl mx-auto rounded-lg border border-blue-100"
                    >
                        <p className="text-blue-800 text-sm">
                            <strong>Note:</strong> The interactive demo gives
                            you a taste of our AI capabilities. For a complete
                            demonstration with your practice's specific
                            requirements, please book a consultation.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
