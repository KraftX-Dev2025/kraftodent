import React from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign, IndianRupee, Users } from "lucide-react";
import StatCard from "@/components/ui/StatCard";

export default function Analytics() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-full h-full">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-blue-600/5"
                            style={{
                                width: `${Math.random() * 300 + 100}px`,
                                height: `${Math.random() * 300 + 100}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                x: [0, Math.random() * 100 - 50],
                                y: [0, Math.random() * 100 - 50],
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Proven Results
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Our clients experience significant improvements across
                        all practice metrics
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard
                        icon={<Clock className="h-10 w-10" />}
                        value="90%"
                        endValue={90}
                        suffix="%"
                        label="Reduction in Administrative Time"
                    />
                    <StatCard
                        icon={<IndianRupee className="h-10 w-10" />}
                        value="₹2,50,000"
                        endValue={250000}
                        suffix="+"
                        label="Average Monthly Savings"
                    />
                    <StatCard
                        icon={<Users className="h-10 w-10" />}
                        value="98%"
                        endValue={98}
                        suffix="%"
                        label="Patient Satisfaction Rate"
                    />
                </div>

                {/* Added Performance Chart/Graph */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-white p-6 rounded-xl shadow-lg border border-blue-50"
                >
                    <h3 className="text-xl font-semibold text-center mb-8">
                        Average Improvement After Implementing Kraftodent
                    </h3>

                    <div className="w-full h-64 bg-blue-50 rounded-lg relative flex items-end p-4 overflow-hidden">
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
                                <div className="flex space-x-2 h-[85%] items-end">
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
                                        className="w-8 bg-gray-200 rounded-t-md relative group"
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
                                        className="w-8 bg-blue-500 rounded-t-md relative group"
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

                        {/* Horizontal Grid Lines */}
                        {[0, 20, 40, 60, 80, 100].map((value) => (
                            <div
                                key={value}
                                className="absolute left-0 right-0 border-b border-gray-200"
                                style={{ bottom: `${value}%` }}
                            >
                                <span className="absolute -left-6 -top-2 text-xs text-gray-400">
                                    {value}%
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-6 space-x-8">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                            <span className="text-sm text-gray-600">
                                Before Kraftodent
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                            <span className="text-sm text-gray-600">
                                After Kraftodent
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
