import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function Hero() {
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    return (
        <motion.section
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-gradient-to-b from-white to-blue-50"
        >
            {/* Animated Background Elements */}

            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-blue-200/20 rounded-full"
                        initial={{
                            width: Math.random() * 300 + 50,
                            height: Math.random() * 300 + 50,
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: Math.random() * 0.3,
                        }}
                        animate={{
                            y: [
                                Math.random() * window.innerHeight,
                                Math.random() * window.innerHeight,
                            ],
                            x: [
                                Math.random() * window.innerWidth,
                                Math.random() * window.innerWidth,
                            ],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 10,
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
                            <Button
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-lg font-semibold transition duration-300"
                            >
                                Book Demo
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 rounded-lg text-lg font-semibold transition duration-300 flex items-center gap-2"
                            >
                                <Play size={20} className="text-blue-600" />
                                See it in Action
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="md:w-1/2 mt-10 md:mt-0"
                    >
                        <div className="relative">
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
                            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-blue-100">
                                <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden">
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
                    <p className="text-gray-500 mb-6">
                        Trusted by hundreds of dental practices across India
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        {[
                            "Sukhadanta",
                            "OraHealth",
                            "DentalCare India",
                            "Smile Studio",
                            "Perfect Dental",
                        ].map((name, index) => (
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
                                <div className="text-gray-400 font-semibold">
                                    {name}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
