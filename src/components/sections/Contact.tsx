import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Contact() {
    return (
        <section
            id="contact"
            className="py-24 bg-gradient-to-r from-blue-50 to-indigo-100 relative overflow-hidden"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <svg
                    className="absolute w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.path
                            key={i}
                            d={`M0,${20 + i * 15} C${30 + i * 10},${
                                60 + i * 5
                            } ${70 - i * 10},${40 - i * 5} 100,${80 - i * 15}`}
                            stroke="rgba(37, 99, 235, 0.1)"
                            strokeWidth="2"
                            fill="none"
                            animate={{
                                d: `M0,${25 + i * 15} C${40 + i * 10},${
                                    70 + i * 5
                                } ${60 - i * 10},${30 - i * 5} 100,${
                                    75 - i * 15
                                }`,
                            }}
                            transition={{
                                duration: 8 + i * 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-lg mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Transform Your Practice Today
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Join hundreds of dental practices across India that
                            have revolutionized their operations with Kraftodent
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100"
                    >
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Practice Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="practice-size"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Practice Size
                                </label>
                                <select
                                    id="practice-size"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                                >
                                    <option>1-3 Dentists</option>
                                    <option>4-9 Dentists</option>
                                    <option>10+ Dentists</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                                />
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300"
                                >
                                    Schedule Free Demo
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>

                    {/* Additional contact information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mt-8 text-center"
                    >
                        <p className="text-gray-600 mb-2">
                            Or reach us directly:
                        </p>
                        <p className="text-blue-600 font-semibold">
                            contact@kraftodent.com | +91 9876543210
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
