"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Phone, CalendarCheck, BellRing } from "lucide-react";

export default function Product() {
    // Add a state to control when animations should start
    const [isMounted, setIsMounted] = useState(false);

    // Only enable animations after component mounts on client side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
            },
        }),
    };

    return (
        <section
            id="product"
            className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50"
        >
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
                        How KraftODent Works
                    </h2>
                    <p className="text-base md:text-lg text-gray-600">
                        Our AI technology integrates seamlessly with your
                        practice to automate routine tasks and enhance patient
                        experience
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:px-48">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative max-w-md mx-auto md:mx-0"
                    >
                        <div className="absolute -inset-4 bg-blue-600/10 rounded-3xl blur-xl transform -rotate-6"></div>
                        <div className="relative bg-white p-5 md:p-6 rounded-2xl shadow-xl overflow-hidden border border-blue-100">
                            <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden">
                                {isMounted ? (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0.5 }}
                                        animate={{
                                            scale: [0.9, 1, 0.9],
                                            opacity: 1,
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}
                                        className="relative"
                                    >
                                        <Bot className="h-20 w-20 md:h-24 md:w-24 text-blue-600" />

                                        {/* Animated rings - reduced for performance */}
                                        {[...Array(2)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute inset-0 rounded-full border-2 border-blue-600/30"
                                                animate={{
                                                    scale: [1, 1.5, 2],
                                                    opacity: [0.7, 0.4, 0],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: i * 0.5,
                                                }}
                                            />
                                        ))}

                                        {/* Simple animated connection lines */}
                                        <svg
                                            className="absolute inset-0 w-full h-full"
                                            viewBox="0 0 200 200"
                                        >
                                            {[
                                                {
                                                    start: "100,20",
                                                    end: "100,180",
                                                },
                                                {
                                                    start: "20,100",
                                                    end: "180,100",
                                                },
                                                {
                                                    start: "40,40",
                                                    end: "160,160",
                                                },
                                                {
                                                    start: "160,40",
                                                    end: "40,160",
                                                },
                                            ].map((line, i) => (
                                                <motion.path
                                                    key={i}
                                                    d={`M ${line.start} L ${line.end}`}
                                                    stroke="rgba(37, 99, 235, 0.3)"
                                                    strokeWidth="1"
                                                    fill="none"
                                                    strokeDasharray="5,5"
                                                    animate={{
                                                        pathLength: [0, 1],
                                                        opacity: [
                                                            0.2, 0.7, 0.2,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        delay: i * 0.5,
                                                    }}
                                                />
                                            ))}
                                        </svg>
                                    </motion.div>
                                ) : (
                                    // Static pre-hydration placeholder
                                    <div className="relative">
                                        <Bot className="h-24 w-24 md:h-32 md:w-32 text-blue-600" />
                                    </div>
                                )}
                            </div>

                            {/* Chat messages - simplified for performance */}
                            <div className="mt-5 space-y-3">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    custom={0}
                                    variants={fadeInUpVariants}
                                    className="flex items-start"
                                >
                                    <div className="bg-gray-100 rounded-2xl rounded-tl-none py-3 px-4 max-w-[85%]">
                                        <p className="text-sm text-gray-700">
                                            Hello, I need to reschedule my tooth
                                            cleaning appointment.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    custom={1}
                                    variants={fadeInUpVariants}
                                    className="flex items-start justify-end"
                                >
                                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none py-3 px-4 max-w-[85%]">
                                        <p className="text-sm">
                                            I'd be happy to help you reschedule.
                                            Your current appointment is for
                                            March 15th at 2:00 PM. What day and
                                            time works better for you?
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6 md:space-y-8 pt-10 md:pt-0"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg text-blue-600">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold mb-2">
                                    Step 1: Call is received by AI
                                </h3>
                                <p className="text-gray-600">
                                    When a patient calls, our AI receptionist
                                    answers immediately with a natural, friendly
                                    voice, eliminating wait times and missed
                                    calls.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg text-blue-600">
                                <CalendarCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold mb-2">
                                    Step 2: Patient is guided, qualified, and
                                    scheduled
                                </h3>
                                <p className="text-gray-600">
                                    The AI intelligently collects patient
                                    information, understands their needs, and
                                    schedules appointments based on your
                                    calendar availability.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg text-blue-600">
                                <BellRing className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold mb-2">
                                    Step 3: Clinic gets notified with synced
                                    updates
                                </h3>
                                <p className="text-gray-600">
                                    All interactions are instantly logged in
                                    your practice management system, with
                                    notifications and summaries sent to your
                                    team.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
