// src/components/sections/Example.tsx
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Play } from "lucide-react";
import Link from "next/link";

export default function Example() {
    return (
        <section id="example" className="py-16 md:py-20 bg-white relative">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
                        Try Kraftodent, the AI Dental Receptionist
                    </h2>
                    <p className="text-sm md:text-base text-gray-600">
                        Experience our AI dental receptionist in action with an
                        interactive demo or watch the video below.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-black rounded-xl overflow-hidden shadow-xl max-w-4xl mx-auto relative"
                >
                    <div className="flex justify-between items-center p-4 border-b border-gray-800"></div>

                    <div className="relative pb-[56.25%] h-0 overflow-hidden">
                        {/* This is a placeholder for the video. You would replace this with your actual video player */}
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-900">
                            <div className="w-full h-32 mb-8">
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 1200 100"
                                >
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <motion.rect
                                            key={i}
                                            x={i * 30}
                                            y={50}
                                            width={10}
                                            height={10}
                                            fill="#6366f1"
                                            animate={{
                                                height: [
                                                    10,
                                                    Math.random() * 50 + 20,
                                                    10,
                                                ],
                                                y: [
                                                    50,
                                                    50 -
                                                        (Math.random() * 25 +
                                                            10),
                                                    50,
                                                ],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: i * 0.05,
                                                repeatType: "reverse",
                                            }}
                                            rx={2}
                                        />
                                    ))}
                                </svg>
                            </div>
                            <p className="text-white text-xl text-center">
                                My name is Kraftodent, an advanced AI reception
                                assistant.
                            </p>

                            {/* Video controls */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                                <div className="flex items-center">
                                    <button
                                        aria-label="Play video"
                                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </button>
                                    <div className="relative flex-1 h-1 bg-gray-600 rounded-full">
                                        <div className="absolute h-full w-[30%] bg-white rounded-full"></div>
                                    </div>
                                    <div className="text-white text-xs ml-4">
                                        01:43
                                    </div>
                                    <div className="flex space-x-3 ml-4">
                                        <button aria-label="Mute">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                            </svg>
                                        </button>
                                        <button aria-label="Settings">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="12" cy="12" r="3" />
                                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                            </svg>
                                        </button>
                                        <button aria-label="Fullscreen">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="text-center mt-10 space-y-6">
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

                        <Button
                            size="lg"
                            variant="outline"
                            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 rounded-lg text-lg font-semibold transition duration-300 flex items-center gap-2"
                        >
                            <Play size={20} className="text-blue-600" />
                            Watch Full Demo
                        </Button>
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
