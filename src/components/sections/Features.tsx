import React from "react";
import { motion } from "framer-motion";
import {
    Bot,
    Brain,
    LayoutDashboard,
    MessageCircle,
    Calendar,
    Activity,
} from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";

export default function Features() {
    const features = [
        {
            icon: <Bot className="h-10 w-10" />,
            title: "AI Receptionist",
            description:
                "24/7 intelligent receptionist handling calls, messages, and scheduling with natural language understanding.",
        },
        {
            icon: <Brain className="h-10 w-10" />,
            title: "Smart Patient Insights",
            description:
                "AI analytics to predict appointment needs, follow-ups, and personalized care recommendations.",
        },
        {
            icon: <LayoutDashboard className="h-10 w-10" />,
            title: "Automated CRM",
            description:
                "Complete patient relationship management with automated follow-ups and personalized communication.",
        },
        {
            icon: <MessageCircle className="h-10 w-10" />,
            title: "Automated Messaging",
            description:
                "Send appointment reminders, follow-ups, and special offers automatically to reduce no-shows and boost revenue.",
        },
        {
            icon: <Calendar className="h-10 w-10" />,
            title: "Smart Scheduling",
            description:
                "AI optimizes your calendar for maximum efficiency and revenue, eliminating scheduling conflicts.",
        },
        {
            icon: <Activity className="h-10 w-10" />,
            title: "Performance Analytics",
            description:
                "Gain insights into practice performance with detailed reports and actionable recommendations.",
        },
    ];

    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        AI-Powered Features for Your Practice
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Our intelligent platform brings cutting-edge AI
                        technology to streamline your dental practice operations
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
