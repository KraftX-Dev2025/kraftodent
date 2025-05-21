import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Bot,
    Mic,
    Clock,
    Calendar,
    MessageSquare,
    Layers,
    Globe,
    ChevronRight,
    CheckCircle,
    ArrowRight,
} from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Features() {
    const [activeFeature, setActiveFeature] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Auto-advance features every 4 seconds
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: <Mic className="h-8 w-8" />,
            title: "Voice AI That Sounds Human",
            description:
                "Our AI speaks in natural, empathetic tones — no robotic scripts. Patients won't know they're talking to an AI.",
            color: "blue",
            image: "/feature-voice.jpg", // Placeholder - would be replaced with actual image
            detailItems: [
                "Natural language processing understands varied accents and dialects",
                "Context-aware responses adapt to patient needs",
                "Personalized voice styles match your clinic's brand",
                "Seamless handoff to human staff when needed",
            ],
        },
        {
            icon: <Clock className="h-8 w-8" />,
            title: "24/7 Availability",
            description:
                "Even when your clinic is closed, we're booking patients for you. No calls go unanswered, ever.",
            color: "green",
            image: "/feature-247.jpg", // Placeholder - would be replaced with actual image
            detailItems: [
                "Capture after-hours appointment requests",
                "Handle holiday and weekend calls",
                "Immediate response to urgent patient inquiries",
                "Eliminate voicemail and callbacks completely",
            ],
        },
        {
            icon: <Calendar className="h-8 w-8" />,
            title: "Smart Scheduling",
            description:
                "Integrates with your system to avoid conflicts and manage last-minute changes with perfect accuracy.",
            color: "indigo",
            image: "/feature-scheduling.jpg", // Placeholder - would be replaced with actual image
            detailItems: [
                "Real-time calendar integration with major dental software",
                "Automated reminders and confirmations",
                "Intelligent slot suggestions based on procedure type",
                "Handles cancellations and rescheduling seamlessly",
            ],
        },
        {
            icon: <MessageSquare className="h-8 w-8" />,
            title: "Follow-Up Automation",
            description:
                "Reminders, confirmations, feedback collection — all handled automatically without staff involvement.",
            color: "purple",
            image: "/feature-followup.jpg", // Placeholder - would be replaced with actual image
            detailItems: [
                "Personalized post-appointment care instructions",
                "Automated satisfaction surveys and review requests",
                "Treatment follow-up reminders",
                "Re-engagement sequences for inactive patients",
            ],
        },
        {
            icon: <Layers className="h-8 w-8" />,
            title: "Seamless Software Integration",
            description:
                "Kraftodent plugs into most practice management platforms effortlessly with minimal setup time.",
            color: "amber",
            image: "/feature-integration.jpg", // Placeholder - would be replaced with actual image
            detailItems: [
                "Works with all major dental practice management software",
                "No-code setup process takes just days, not months",
                "Secure API connections protect patient data",
                "Regular updates ensure compatibility with new systems",
            ],
        },
        {
            icon: <Globe className="h-8 w-8" />,
            title: "Multi-Language Support",
            description:
                "Our AI communicates fluently in multiple Indian languages to serve your diverse patient base.",
            color: "cyan",
            image: "/feature-language.jpg", // Placeholder - would be replaced with actual image
            detailItems: [
                "Supports Hindi, English, Marathi, Tamil, and Telugu",
                "Understands regional accents and dialects",
                "Automated language detection during calls",
                "Maintains cultural context in all interactions",
            ],
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section
            id="features"
            className="py-20 md:py-28 bg-white relative overflow-hidden"
        >
            {/* Background decoration */}
            {isMounted && (
                <div className="absolute inset-0 pointer-events-none opacity-5">
                    <svg
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern
                                id="grid"
                                width="40"
                                height="40"
                                patternUnits="userSpaceOnUse"
                            >
                                <path
                                    d="M 40 0 L 0 0 0 40"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="0.5"
                                />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
            )}

            <div className="container mx-auto px-4 sm:px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4"
                    >
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                            <Bot size={14} className="mr-1" /> AI-Powered
                            Features
                        </span>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Everything You Expect from a Superstar Receptionist
                    </h2>
                    <p className="text-lg text-gray-600">
                        Our intelligent platform brings cutting-edge AI
                        technology to streamline your dental practice operations
                    </p>
                </motion.div>

                {/* Featured highlight section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                            {features[activeFeature].title}
                        </h3>
                        <p className="text-lg text-gray-600 mb-8">
                            {features[activeFeature].description}
                        </p>

                        <ul className="space-y-4 mb-8">
                            {features[activeFeature].detailItems.map(
                                (item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.1 * index,
                                            duration: 0.5,
                                        }}
                                        className="flex items-start"
                                    >
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">
                                            {item}
                                        </span>
                                    </motion.li>
                                )
                            )}
                        </ul>

                        <div>
                            <Link href="/demo">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-300 flex items-center gap-2">
                                    See It In Action
                                    <ArrowRight size={18} />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-blue-50 rounded-2xl overflow-hidden shadow-lg"
                    >
                        {/* Feature Image Placeholder */}
                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="p-4 rounded-full bg-blue-600/10">
                                    {features[activeFeature].icon}
                                </div>
                            </div>
                        </div>

                        {/* Feature selector */}
                        <div className="p-4 grid grid-cols-3 md:grid-cols-6 gap-2">
                            {features.map((feature, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveFeature(index)}
                                    className={`p-3 rounded-lg transition ${
                                        activeFeature === index
                                            ? "bg-blue-600 text-white"
                                            : "bg-white text-gray-500 hover:bg-gray-100"
                                    }`}
                                >
                                    {feature.icon}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Feature cards grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        Ready to transform your dental practice?
                    </h3>
                    <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
                        Join over 100+ dental practices across India that have
                        already revolutionized their front desk operations with
                        Kraftodent.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/#contact">
                            <Button
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50 text-lg font-medium"
                            >
                                Book a Free Demo
                            </Button>
                        </Link>
                        <Link href="/demo">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-blue-500 text-lg font-medium"
                            >
                                Try Interactive Demo
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
