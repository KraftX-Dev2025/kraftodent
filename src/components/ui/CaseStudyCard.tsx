import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface CaseStudyCardProps {
    icon: React.ReactNode;
    practice: string;
    location: string;
    stats: string[];
    quote: string;
    author: string;
    image?: string;
}

export default function CaseStudyCard({
    icon,
    practice,
    location,
    stats,
    quote,
    author,
    image,
}: CaseStudyCardProps) {
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
            className="p-8 bg-white rounded-xl shadow-lg transition-all duration-300 border border-blue-50 hover:border-blue-200"
        >
            <div className="flex items-center mb-6">
                <div className="mr-4 p-3 bg-blue-50 rounded-lg text-blue-600">
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        {practice}
                    </h3>
                    <p className="text-gray-600">{location}</p>
                </div>
            </div>

            <ul className="mb-6 space-y-2">
                {stats.map((stat, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center text-gray-600"
                    >
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{stat}</span>
                    </motion.li>
                ))}
            </ul>

            <motion.blockquote
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="border-l-4 border-blue-600 pl-4 italic text-gray-600 mb-4"
            >
                "{quote}"
            </motion.blockquote>

            <div className="flex items-center">
                {image && (
                    <img
                        src={image}
                        alt={author}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                )}
                <p className="text-gray-800 font-semibold">{author}</p>
            </div>
        </motion.div>
    );
}
