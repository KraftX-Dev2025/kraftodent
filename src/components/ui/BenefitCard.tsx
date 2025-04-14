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
                y: -10,
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

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {title}
            </h3>

            <p className="text-gray-600">{description}</p>
        </motion.div>
    );
}
