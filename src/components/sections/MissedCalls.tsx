// src/components/sections/MissedCalls.tsx
import React from "react";
import { motion } from "framer-motion";
import { PhoneOff, TrendingUp, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MissedCalls() {
    return (
        <section className="py-16 md:py-20 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl shadow-lg overflow-hidden"
                >
                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
                                >
                                    You could be losing{" "}
                                    <span className="text-blue-600 text-3xl md:text-4xl">
                                        ₹10,000+
                                    </span>{" "}
                                    per month in new patient production due to
                                    missed calls.
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-gray-600 mb-8"
                                >
                                    The average dental office misses 30% of
                                    their calls*. Imagine how many of those
                                    calls are new patients ready to book an
                                    appointment.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <a href="#contact">
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white transition duration-300">
                                            Stop Missing Calls Today
                                        </Button>
                                    </a>
                                </motion.div>
                            </div>

                            <div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-6 rounded-xl shadow-md"
                                >
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md"></div>
                                            <div className="relative bg-blue-600 text-white p-4 rounded-full">
                                                <PhoneOff size={32} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="bg-blue-100 p-2 rounded-md text-blue-600">
                                                <TrendingUp size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-800">
                                                    Missed Opportunity
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Each missed call is a
                                                    potential patient who may
                                                    choose another dentist.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-4">
                                            <div className="bg-blue-100 p-2 rounded-md text-blue-600">
                                                <IndianRupee size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-800">
                                                    Lost Revenue
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    New patients are worth an
                                                    average of ₹30,000 in
                                                    lifetime value to your
                                                    practice.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className="text-xs text-gray-500 mt-4 text-right italic"
                                >
                                    *Based on industry research across dental
                                    practices in India
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
