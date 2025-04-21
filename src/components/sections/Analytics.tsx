"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, IndianRupee, Users } from "lucide-react";
import StatCard from "@/components/ui/StatCard";

export default function Analytics() {
    // Add client-side only state
    const [isMounted, setIsMounted] = useState(false);

    // Set mounted state after hydration is complete
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Define background animation blobs with fixed coordinates
    const backgroundBlobs = [
        { width: "180px", height: "200px", left: "10%", top: "20%" },
        { width: "220px", height: "240px", left: "70%", top: "15%" },
        { width: "150px", height: "270px", left: "85%", top: "60%" },
        { width: "250px", height: "300px", left: "30%", top: "75%" },
    ];

    return (
        <section className="py-16 md:py-20 bg-white relative overflow-hidden">
            {/* Background Animation - Simplified for performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-full h-full">
                    {isMounted &&
                        backgroundBlobs.map((blob, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full bg-blue-600/5"
                                style={{
                                    width: blob.width,
                                    height: blob.height,
                                    left: blob.left,
                                    top: blob.top,
                                }}
                                animate={{
                                    x: [0, i % 2 === 0 ? 30 : -30],
                                    y: [0, i % 3 === 0 ? 30 : -30],
                                    opacity: [0.1, 0.2, 0.1],
                                }}
                                transition={{
                                    duration: 8 + i * 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            />
                        ))}
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
                        Proven Results
                    </h2>
                    <p className="text-base md:text-lg text-gray-600">
                        Our clients experience significant improvements across
                        all practice metrics
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <StatCard
                        icon={<Clock className="h-8 w-8" />}
                        value="90%"
                        endValue={90}
                        suffix="%"
                        label="Reduction in Administrative Time"
                    />
                    <StatCard
                        icon={<IndianRupee className="h-8 w-8" />}
                        value="₹25,0000"
                        endValue={250000}
                        suffix="+"
                        label="Saved Annually"
                    />
                    <StatCard
                        icon={<Users className="h-8 w-8" />}
                        value="98%"
                        endValue={98}
                        suffix="%"
                        label="Patient Satisfaction Rate"
                    />
                </div>

                {/* Performance Chart - Simplified for performance */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-white p-5 md:p-6 rounded-xl shadow-md border border-blue-50"
                >
                    <h3 className="text-lg md:text-xl font-semibold text-center mb-6 md:mb-8">
                        Average Improvement After Implementing Kraftodent
                    </h3>

                    <div className="w-full h-56 md:h-64 bg-blue-50 rounded-lg relative flex items-end p-4 overflow-hidden">
                        {/* Chart Bars */}
                        {[
                            { label: "Appointments", before: 30, after: 75 },
                            { label: "Revenue", before: 40, after: 85 },
                            {
                                label: "Patient Retention",
                                before: 45,
                                after: 90,
                            },
                            {
                                label: "Staff Efficiency",
                                before: 35,
                                after: 95,
                            },
                            { label: "New Patients", before: 25, after: 80 },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center mx-auto h-full justify-end"
                            >
                                <div className="flex space-x-1 md:space-x-2 h-[85%] items-end">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        whileInView={{
                                            height: `${item.before}%`,
                                        }}
                                        transition={{
                                            duration: 1,
                                            delay: index * 0.1,
                                        }}
                                        viewport={{ once: true }}
                                        className="w-5 md:w-8 bg-gray-200 rounded-t-md relative group"
                                    >
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            Before: {item.before}%
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ height: 0 }}
                                        whileInView={{
                                            height: `${item.after}%`,
                                        }}
                                        transition={{
                                            duration: 1,
                                            delay: 0.5 + index * 0.1,
                                        }}
                                        viewport={{ once: true }}
                                        className="w-5 md:w-8 bg-blue-500 rounded-t-md relative group"
                                    >
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            After: {item.after}%
                                        </div>
                                    </motion.div>
                                </div>
                                <div className="text-xs mt-2 text-gray-600 font-medium">
                                    {item.label}
                                </div>
                            </div>
                        ))}

                        {/* Horizontal Grid Lines - Simplified */}
                        {[0, 50, 100].map((value) => (
                            <div
                                key={value}
                                className="absolute left-0 right-0 border-b border-gray-200"
                                style={{ bottom: `${value}%` }}
                            >
                                <span className="absolute -left-2 -top-2 text-xs text-gray-400">
                                    {value}%
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-4 md:mt-6 space-x-6 md:space-x-8">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                            <span className="text-xs md:text-sm text-gray-600">
                                Before Kraftodent
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                            <span className="text-xs md:text-sm text-gray-600">
                                After Kraftodent
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
