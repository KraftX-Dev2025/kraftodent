import React from "react";
import { motion } from "framer-motion";
import { Bot, Mic, Clock, Calendar, MessageSquare, Layers } from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";

export default function Features() {
    const features = [
        {
            icon: <Mic className="h-8 w-8" />,
            title: "Voice AI That Sounds Human",
            description:
                "Our AI speaks in natural, empathetic tones — no robotic scripts. Patients won't know they're talking to an AI.",
        },
        {
            icon: <Clock className="h-8 w-8" />,
            title: "24/7 Availability",
            description:
                "Even when your clinic is closed, we're booking patients for you. No calls go unanswered, ever.",
        },
        {
            icon: <Calendar className="h-8 w-8" />,
            title: "Smart Scheduling",
            description:
                "Integrates with your system to avoid conflicts and manage last-minute changes with perfect accuracy.",
        },
        {
            icon: <MessageSquare className="h-8 w-8" />,
            title: "Follow-Up Automation",
            description:
                "Reminders, confirmations, feedback collection — all handled automatically without staff involvement.",
        },
        {
            icon: <Layers className="h-8 w-8" />,
            title: "Seamless Software Integration",
            description:
                "Kraftodent plugs into most practice management platforms effortlessly with minimal setup time.",
        },
        {
            icon: <Bot className="h-8 w-8" />,
            title: "Multi-Language Support",
            description:
                "Our AI communicates fluently in multiple Indian languages to serve your diverse patient base.",
        },
    ];

    return (
        <section id="features" className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
                        Everything You Expect from a Superstar Front Desk
                    </h2>
                    <p className="text-base md:text-lg text-gray-600">
                        Our intelligent platform brings cutting-edge AI
                        technology to streamline your dental practice operations
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
