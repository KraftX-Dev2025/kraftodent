import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Calendar, Zap, Users, Clock } from "lucide-react";
import BenefitCard from "@/components/ui/BenefitCard";

export default function Benefits() {
    const benefits = [
        {
            icon: <Clock className="h-8 w-8" />,
            title: "Answer 100% of Patient Calls",
            description:
                "Never miss another call, day or night. Our AI receptionist ensures every patient interaction is handled professionally.",
        },
        {
            icon: <Calendar className="h-8 w-8" />,
            title: "Smart Appointment Management",
            description:
                "Schedule, reschedule, and confirm appointments automatically with perfect accuracy and no staff involvement.",
        },
        {
            icon: <Zap className="h-8 w-8" />,
            title: "Reduce No-Shows",
            description:
                "Our automated reminder system cuts missed appointments by up to 60%, maximizing your practice's efficiency.",
        },
        {
            icon: <Sparkles className="h-8 w-8" />,
            title: "Seamless Software Integration",
            description:
                "Works with your existing practice management software with minimal setup time and no data migration.",
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: "Multi-Language Support",
            description:
                "Our AI communicates fluently in multiple Indian languages to serve your diverse patient base effectively.",
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: "Enterprise-Grade Security",
            description:
                "Your patient data is always protected with state-of-the-art encryption and security protocols.",
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
                        KraftODent is a voice-enabled AI receptionist built for
                        dental clinics. We take care of your incoming calls,
                        appointment booking, and follow-ups — no staff required.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {benefits.map((benefit, index) => (
                        <BenefitCard
                            key={index}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                        />
                    ))}
                </div>

                {/* Comparative Illustration - Simplified for performance */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 max-w-4xl mx-auto"
                >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-blue-600 text-white p-4 text-center">
                            <h3 className="text-xl font-semibold">
                                KraftODent vs. Traditional Reception
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                            <div className="p-5 md:p-6">
                                <div className="flex items-center mb-4">
                                    <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
                                    <h4 className="text-lg font-semibold">
                                        With KraftODent
                                    </h4>
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        "24/7 availability for patients",
                                        "Zero wait time for phone calls",
                                        "Multi-language support",
                                        "Automated appointment reminders",
                                        "Smart scheduling optimization",
                                        "No sick days or staff turnover",
                                        "Scales with your practice",
                                    ].map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: index * 0.1,
                                                duration: 0.5,
                                            }}
                                            viewport={{ once: true }}
                                            className="flex items-start"
                                        >
                                            <svg
                                                className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-gray-700">
                                                {item}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-5 md:p-6">
                                <div className="flex items-center mb-4">
                                    <Calendar className="h-6 w-6 text-gray-600 mr-2" />
                                    <h4 className="text-lg font-semibold">
                                        Traditional Reception
                                    </h4>
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        "Limited to office hours only",
                                        "Long hold times during busy periods",
                                        "Limited language capabilities",
                                        "Manual follow-ups often forgotten",
                                        "Sub-optimal scheduling",
                                        "Affected by staff unavailability",
                                        "Requires additional staff as you grow",
                                    ].map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 0.5 + index * 0.1,
                                                duration: 0.5,
                                            }}
                                            viewport={{ once: true }}
                                            className="flex items-start"
                                        >
                                            <svg
                                                className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-gray-700">
                                                {item}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
