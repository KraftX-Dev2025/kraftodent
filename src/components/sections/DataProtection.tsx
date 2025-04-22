// src/components/sections/DataProtection.tsx
import React from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Lock } from "lucide-react";

export default function DataProtection() {
    return (
        <section className="py-12 md:py-16 bg-blue-50">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8 relative">
                        {/* Shield Icon */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="absolute right-4 top-4 md:right-8 md:top-8 text-blue-600 opacity-20"
                        >
                            <Shield className="w-24 h-24 md:w-32 md:h-32" />
                        </motion.div>

                        <div className="relative z-10">
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-2xl md:text-3xl font-bold text-gray-800 mb-3"
                            >
                                Data Protection Standards
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="text-gray-600 mb-8"
                            >
                                Fully HIPAA compliant, ensuring your data
                                remains safe.
                            </motion.p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-blue-50 p-5 rounded-lg"
                                >
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                        <Shield className="mr-2 h-5 w-5 text-blue-600" />
                                        Fully HIPAA Compliant
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        We use best-in-class security practices
                                        and have HIPAA agreements with all
                                        partners.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="bg-blue-50 p-5 rounded-lg"
                                >
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                        <Clock className="mr-2 h-5 w-5 text-blue-600" />
                                        24/7 Monitoring
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Our systems are carefully monitored
                                        24/7.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className="bg-blue-50 p-5 rounded-lg"
                                >
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                        <Lock className="mr-2 h-5 w-5 text-blue-600" />
                                        Controlled Data Access
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        We adhere to the principles of least
                                        privilege and implement role-based
                                        permissions for accessing data.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
