import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, CalendarClock, Share2, Bot } from "lucide-react";

export default function Product() {
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
            className="py-24 bg-gradient-to-b from-white to-blue-50"
        >
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        How Kraftodent Works
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Our AI technology integrates seamlessly with your
                        practice to automate routine tasks and enhance patient
                        experience
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-blue-600/10 rounded-3xl blur-xl transform -rotate-6"></div>
                        <div className="relative bg-white p-6 rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
                            <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0.5 }}
                                    animate={{
                                        scale: [0.8, 1.02, 0.98, 1],
                                        opacity: 1,
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    }}
                                    className="relative"
                                >
                                    <Bot className="h-32 w-32 text-blue-600" />

                                    {/* Animated rings */}
                                    {[...Array(3)].map((_, i) => (
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

                                    {/* Animated data points */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {[...Array(12)].map((_, i) => {
                                            const angle =
                                                (i * 30 * Math.PI) / 180;
                                            const x = Math.cos(angle) * 100;
                                            const y = Math.sin(angle) * 100;

                                            return (
                                                <motion.div
                                                    key={i}
                                                    className="absolute w-2 h-2 bg-blue-600 rounded-full"
                                                    style={{
                                                        left: `calc(50% + ${x}px)`,
                                                        top: `calc(50% + ${y}px)`,
                                                    }}
                                                    animate={{
                                                        opacity: [0, 1, 0],
                                                        scale: [0.5, 1.5, 0.5],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        delay: i * 0.25,
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>

                                    {/* Digital connection lines */}
                                    <svg
                                        className="absolute inset-0 w-full h-full"
                                        viewBox="0 0 200 200"
                                    >
                                        {[...Array(6)].map((_, i) => {
                                            const startAngle =
                                                (i * 60 * Math.PI) / 180;
                                            const endAngle =
                                                ((i + 3) * 60 * Math.PI) / 180;

                                            const startX =
                                                Math.cos(startAngle) * 80 + 100;
                                            const startY =
                                                Math.sin(startAngle) * 80 + 100;
                                            const endX =
                                                Math.cos(endAngle) * 80 + 100;
                                            const endY =
                                                Math.sin(endAngle) * 80 + 100;

                                            return (
                                                <motion.path
                                                    key={i}
                                                    d={`M ${startX} ${startY} L ${endX} ${endY}`}
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
                                            );
                                        })}
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Chat messages */}
                            <div className="mt-6 space-y-4">
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

                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    custom={2}
                                    variants={fadeInUpVariants}
                                    className="flex items-start"
                                >
                                    <div className="bg-gray-100 rounded-2xl rounded-tl-none py-3 px-4 max-w-[85%]">
                                        <p className="text-sm text-gray-700">
                                            Can I come in next Thursday
                                            afternoon?
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    custom={3}
                                    variants={fadeInUpVariants}
                                    className="flex items-start justify-end"
                                >
                                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none py-3 px-4 max-w-[85%]">
                                        <p className="text-sm">
                                            Thursday, March 23rd has openings at
                                            1:30 PM, 3:00 PM, and 4:15 PM. Which
                                            time would you prefer?
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
                        className="space-y-8"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg text-blue-600">
                                <PhoneCall className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Call & Message Handling
                                </h3>
                                <p className="text-gray-600">
                                    Our AI receptionist answers calls, processes
                                    text messages, and handles emails with
                                    natural conversation abilities in multiple
                                    Indian languages.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg text-blue-600">
                                <CalendarClock className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Intelligent Scheduling
                                </h3>
                                <p className="text-gray-600">
                                    The AI handles complex scheduling scenarios,
                                    manages conflicts, and sends automated
                                    reminders to reduce no-shows by up to 60%.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg text-blue-600">
                                <Share2 className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Practice Integration
                                </h3>
                                <p className="text-gray-600">
                                    Seamlessly integrates with your existing
                                    practice management software, requiring
                                    minimal setup time and providing immediate
                                    benefits.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
