import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

interface StatCardProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    endValue?: number;
    suffix?: string;
}

export default function StatCard({
    icon,
    value,
    label,
    endValue,
    suffix = "",
}: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{
                scale: 1.05,
                boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            className="p-8 bg-white rounded-xl shadow-lg transition-all duration-300 text-center border border-blue-50 hover:border-blue-200"
        >
            <motion.div
                className="flex justify-center mb-6"
                whileHover={{
                    scale: 1.1,
                    rotate: 5,
                }}
            >
                <div className="p-4 rounded-full bg-blue-50 text-blue-600">
                    {icon}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-blue-600 mb-2"
            >
                {endValue ? (
                    <CountUp
                        end={endValue}
                        suffix={suffix}
                        duration={2.5}
                        separator=","
                    />
                ) : (
                    value
                )}
            </motion.div>

            <p className="text-gray-600">{label}</p>
        </motion.div>
    );
}
