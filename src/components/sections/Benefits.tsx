// src/components/sections/Benefits.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Shield,
    Sparkles,
    Calendar,
    Zap,
    Users,
    Clock,
    Check,
    X,
    ArrowRight,
    Phone,
    BellRing,
    Globe,
} from "lucide-react";

export default function Benefits() {
    const [activeTab, setActiveTab] = useState("automated");

    const benefitCategories = [
        {
            id: "automated",
            title: "With KraftODent",
            icon: <Sparkles className="h-5 w-5" />,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            id: "traditional",
            title: "Traditional Reception",
            icon: <Phone className="h-5 w-5" />,
            color: "text-gray-600",
            bgColor: "bg-gray-100",
        },
    ];

    const benefitFeatures = [
        {
            title: "Patient Calls",
            automated: {
                feature: "24/7 availability for patients",
                icon: <Clock className="h-5 w-5" />,
                description:
                    "Never miss another call, day or night. Our AI receptionist ensures every patient interaction is handled professionally.",
            },
            traditional: {
                feature: "Limited to office hours only",
                icon: <Clock className="h-5 w-5" />,
                description:
                    "Calls are only answered during business hours, leading to missed opportunities and patient frustration.",
            },
        },
        {
            title: "Appointment Management",
            automated: {
                feature: "Smart scheduling optimization",
                icon: <Calendar className="h-5 w-5" />,
                description:
                    "Schedule, reschedule, and confirm appointments automatically with perfect accuracy and no staff involvement.",
            },
            traditional: {
                feature: "Sub-optimal scheduling",
                icon: <Calendar className="h-5 w-5" />,
                description:
                    "Manual scheduling is time-consuming and prone to errors, resulting in scheduling conflicts and inefficient use of dentist time.",
            },
        },
        {
            title: "Response Time",
            automated: {
                feature: "Zero wait time for phone calls",
                icon: <Zap className="h-5 w-5" />,
                description:
                    "Our automated reminder system cuts missed appointments by up to 60%, maximizing your practice's efficiency.",
            },
            traditional: {
                feature: "Long hold times during busy periods",
                icon: <Zap className="h-5 w-5" />,
                description:
                    "Patients experience frustrating wait times during peak hours, often leading to call abandonment.",
            },
        },
        {
            title: "Multi-Language Support",
            automated: {
                feature: "Fluent in multiple Indian languages",
                icon: <Globe className="h-5 w-5" />,
                description:
                    "Our AI communicates fluently in multiple Indian languages to serve your diverse patient base effectively.",
            },
            traditional: {
                feature: "Limited language capabilities",
                icon: <Globe className="h-5 w-5" />,
                description:
                    "Language barriers can prevent effective communication with patients who speak regional languages.",
            },
        },
        {
            title: "Patient Follow-ups",
            automated: {
                feature: "Automated appointment reminders",
                icon: <BellRing className="h-5 w-5" />,
                description:
                    "Automatic follow-ups ensure patients remember their appointments, improving attendance rates.",
            },
            traditional: {
                feature: "Manual follow-ups often forgotten",
                icon: <BellRing className="h-5 w-5" />,
                description:
                    "Staff may forget to make reminder calls, resulting in higher no-show rates.",
            },
        },
        {
            title: "Data Security",
            automated: {
                feature: "Enterprise-grade security protocols",
                icon: <Shield className="h-5 w-5" />,
                description:
                    "Your patient data is always protected with state-of-the-art encryption and security protocols.",
            },
            traditional: {
                feature: "Inconsistent security practices",
                icon: <Shield className="h-5 w-5" />,
                description:
                    "Manual processes often lead to inconsistent data security practices and potential HIPAA violations.",
            },
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

                {/* Interactive Tabs */}
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex p-1 bg-gray-100 rounded-lg">
                            {benefitCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveTab(category.id)}
                                    className={`flex items-center px-4 py-2 rounded-md transition-all ${
                                        activeTab === category.id
                                            ? "bg-white shadow-md text-blue-600"
                                            : "text-gray-600 hover:text-gray-800"
                                    }`}
                                >
                                    <span
                                        className={`mr-2 ${
                                            activeTab === category.id
                                                ? category.color
                                                : ""
                                        }`}
                                    >
                                        {category.icon}
                                    </span>
                                    {category.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                        {benefitFeatures.map((feature, index) => {
                            const currentFeature =
                                activeTab === "automated"
                                    ? feature.automated
                                    : feature.traditional;
                            const isAutomated = activeTab === "automated";

                            return (
                                <motion.div
                                    key={`${activeTab}-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    className={`p-5 rounded-xl shadow-md ${
                                        isAutomated
                                            ? "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
                                            : "bg-white border border-gray-200"
                                    }`}
                                >
                                    <div className="flex items-center mb-4">
                                        <div
                                            className={`p-2 rounded-lg mr-3 ${
                                                isAutomated
                                                    ? "bg-blue-200 text-blue-600"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                        >
                                            {currentFeature.icon}
                                        </div>
                                        <h3 className="font-semibold">
                                            {feature.title}
                                        </h3>
                                    </div>

                                    <div className="mb-4 flex items-start">
                                        <div
                                            className={`flex-shrink-0 mt-1 mr-2 ${
                                                isAutomated
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {isAutomated ? (
                                                <Check size={16} />
                                            ) : (
                                                <X size={16} />
                                            )}
                                        </div>
                                        <p className="text-sm">
                                            {currentFeature.feature}
                                        </p>
                                    </div>

                                    <p className="text-sm text-gray-600">
                                        {currentFeature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
