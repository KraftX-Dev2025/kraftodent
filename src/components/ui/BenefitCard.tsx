import React from "react";
import { motion } from "framer-motion";

interface BenefitCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function BenefitCard({
    icon,
    title,
    description,
}: BenefitCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{
                y: -5,
                boxShadow:
                    "0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            className="p-6 bg-white rounded-xl shadow-md transition-all duration-300 text-center border border-blue-50 hover:border-blue-200 h-full flex flex-col"
        >
            <motion.div
                className="flex justify-center mb-4"
                whileHover={{ scale: 1.05 }}
            >
                <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                    {icon}
                </div>
            </motion.div>

            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                {title}
            </h3>

            <p className="text-gray-600 text-sm md:text-base flex-grow">
                {description}
            </p>
        </motion.div>
    );
}
