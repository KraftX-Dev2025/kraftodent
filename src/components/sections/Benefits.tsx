// src/components/sections/Benefits.tsx
import React from "react";
import { motion } from "framer-motion";
import {
    Clock,
    Calendar,
    Zap,
    Globe,
    BellRing,
    Shield,
    CheckCircle,
    XCircle,
} from "lucide-react";

export default function Benefits() {
    // Define benefits for comparison
    const benefits = [
        {
            icon: <Clock className="h-5 w-5" />,
            title: "Patient Calls",
            kraftodent: "24/7 availability for patients",
            traditional: "Limited to office hours only",
            description:
                "Never miss another call, day or night. Our AI receptionist ensures every interaction is handled professionally.",
        },
        {
            icon: <Calendar className="h-5 w-5" />,
            title: "Appointment Management",
            kraftodent: "Smart scheduling optimization",
            traditional: "Manual, error-prone scheduling",
            description:
                "Schedule appointments automatically with perfect accuracy and no staff involvement.",
        },
        {
            icon: <Zap className="h-5 w-5" />,
            title: "Response Time",
            kraftodent: "Zero wait time for calls",
            traditional: "Long hold times during busy periods",
            description:
                "Patients never wait on hold, improving satisfaction and reducing call abandonment.",
        },
        {
            icon: <Globe className="h-5 w-5" />,
            title: "Language Support",
            kraftodent: "Multiple Indian languages",
            traditional: "Limited language capabilities",
            description:
                "Our AI communicates fluently in multiple Indian languages to serve your diverse patient base.",
        },
        {
            icon: <BellRing className="h-5 w-5" />,
            title: "Patient Follow-ups",
            kraftodent: "Automated appointment reminders",
            traditional: "Manual follow-ups often forgotten",
            description:
                "Automatic reminders ensure patients remember appointments, improving attendance rates.",
        },
        {
            icon: <Shield className="h-5 w-5" />,
            title: "Data Security",
            kraftodent: "Enterprise-grade security",
            traditional: "Inconsistent security practices",
            description:
                "Your patient data is always protected with state-of-the-art encryption and security.",
        },
    ];

    return (
        <section id="benefits" className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
                        We Handle Your Admin, So You Can Focus on Patients
                    </h2>
                    <p className="text-base md:text-lg text-gray-600">
                        See how Kraftodent transforms your practice operations
                        compared to traditional front desk management
                    </p>
                </motion.div>

                {/* Comparison Chart */}
                <div className="max-w-5xl mx-auto">
                    <div className="rounded-xl overflow-hidden shadow-lg border border-blue-100">
                        {/* Chart Header */}
                        <div className="grid grid-cols-8 bg-blue-600 text-white font-semibold">
                            <div className="col-span-2 p-4 border-r border-blue-500">
                                Feature
                            </div>
                            <div className="col-span-3 p-4 flex items-center justify-center border-r border-blue-500">
                                <motion.div
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, y: -10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    With Kraftodent
                                </motion.div>
                            </div>
                            <div className="col-span-3 p-4 flex items-center justify-center">
                                <motion.div
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, y: -10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    Traditional Reception
                                </motion.div>
                            </div>
                        </div>

                        {/* Chart Body */}
                        <div className="divide-y divide-gray-200">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    viewport={{ once: true }}
                                    className="grid grid-cols-8 hover:bg-blue-50 transition-colors"
                                >
                                    <div className="col-span-2 p-4 border-r border-gray-200 flex items-center gap-2">
                                        <div className="bg-blue-100 p-2 rounded-full text-blue-600 hidden sm:flex">
                                            {benefit.icon}
                                        </div>
                                        <span className="font-medium">
                                            {benefit.title}
                                        </span>
                                    </div>
                                    <div className="col-span-3 p-4 border-r border-gray-200">
                                        <div className="flex items-start gap-2">
                                            <div className="text-green-500 flex-shrink-0 mt-1">
                                                <CheckCircle size={16} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {benefit.kraftodent}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1 hidden md:block">
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 p-4">
                                        <div className="flex items-start gap-2">
                                            <div className="text-red-500 flex-shrink-0 mt-1">
                                                <XCircle size={16} />
                                            </div>
                                            <p className="text-sm font-medium">
                                                {benefit.traditional}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Impact Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-16 bg-white p-6 rounded-xl shadow-lg border border-blue-100"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                            Business Impact with Kraftodent
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Cost Reduction */}
                            <div className="bg-blue-50 rounded-lg p-6 text-center">
                                <motion.div
                                    className="relative mx-auto w-32 h-32 mb-4"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <svg
                                        viewBox="0 0 100 100"
                                        className="w-full h-full"
                                    >
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke="#E0E7FF"
                                            strokeWidth="10"
                                        />
                                        <motion.circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke="#3B82F6"
                                            strokeWidth="10"
                                            strokeDasharray="283"
                                            strokeDashoffset="283"
                                            transform="rotate(-90 50 50)"
                                            initial={{ strokeDashoffset: 283 }}
                                            whileInView={{
                                                strokeDashoffset: 113,
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                ease: "easeOut",
                                            }}
                                            viewport={{ once: true }}
                                        />
                                        <text
                                            x="50"
                                            y="55"
                                            textAnchor="middle"
                                            fontSize="18"
                                            fontWeight="bold"
                                            fill="#3B82F6"
                                        >
                                            60%
                                        </text>
                                    </svg>
                                </motion.div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                    Cost Reduction
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Reduce receptionist costs by eliminating the
                                    need for multiple staff
                                </p>
                            </div>

                            {/* Time Saved */}
                            <div className="bg-blue-50 rounded-lg p-6 text-center">
                                <motion.div
                                    className="relative mx-auto w-32 h-32 mb-4"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <svg
                                        viewBox="0 0 100 100"
                                        className="w-full h-full"
                                    >
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke="#E0E7FF"
                                            strokeWidth="10"
                                        />
                                        <motion.circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke="#3B82F6"
                                            strokeWidth="10"
                                            strokeDasharray="283"
                                            strokeDashoffset="283"
                                            transform="rotate(-90 50 50)"
                                            initial={{ strokeDashoffset: 283 }}
                                            whileInView={{
                                                strokeDashoffset: 70,
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                ease: "easeOut",
                                            }}
                                            viewport={{ once: true }}
                                        />
                                        <text
                                            x="50"
                                            y="55"
                                            textAnchor="middle"
                                            fontSize="18"
                                            fontWeight="bold"
                                            fill="#3B82F6"
                                        >
                                            25h
                                        </text>
                                    </svg>
                                </motion.div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                    Weekly Hours Saved
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Free up staff time for more valuable patient
                                    care activities
                                </p>
                            </div>

                            {/* Patient Satisfaction */}
                            <div className="bg-blue-50 rounded-lg p-6 text-center">
                                <motion.div
                                    className="relative mx-auto w-32 h-32 mb-4"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <svg
                                        viewBox="0 0 100 100"
                                        className="w-full h-full"
                                    >
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke="#E0E7FF"
                                            strokeWidth="10"
                                        />
                                        <motion.circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke="#3B82F6"
                                            strokeWidth="10"
                                            strokeDasharray="283"
                                            strokeDashoffset="283"
                                            transform="rotate(-90 50 50)"
                                            initial={{ strokeDashoffset: 283 }}
                                            whileInView={{
                                                strokeDashoffset: 6,
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                ease: "easeOut",
                                            }}
                                            viewport={{ once: true }}
                                        />
                                        <text
                                            x="50"
                                            y="55"
                                            textAnchor="middle"
                                            fontSize="18"
                                            fontWeight="bold"
                                            fill="#3B82F6"
                                        >
                                            98%
                                        </text>
                                    </svg>
                                </motion.div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                    Patient Satisfaction
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Immediate response and 24/7 availability
                                    delights patients
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
