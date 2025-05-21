"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Bot,
    MessageSquare,
    Shield,
    Clock,
    Star,
    ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import ChatInterface from "@/components/chat/ChatInterface";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DemoPage() {
    return (
        <ThemeProvider defaultTheme="light">
            <main className="min-h-screen bg-gray-50">
                <Navbar />

                <section className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                            <Link href="/">
                                <Button
                                    variant="ghost"
                                    className="flex items-center text-blue-600 mb-6 md:mb-0"
                                >
                                    <ArrowLeft size={16} className="mr-2" />
                                    Back to Home
                                </Button>
                            </Link>

                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-3xl md:text-4xl font-bold text-center md:text-right text-gray-800"
                            >
                                Experience Our AI Receptionist
                            </motion.h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                            {/* Chat Interface */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="lg:col-span-2"
                            >
                                <ChatInterface />
                            </motion.div>

                            {/* Sidebar with information */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="space-y-6"
                            >
                                {/* About the AI */}
                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 rounded-full bg-blue-100">
                                            <Bot
                                                size={20}
                                                className="text-blue-600"
                                            />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800">
                                            About This Demo
                                        </h3>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4">
                                        This is an interactive demo of
                                        Kraftodent's AI dental receptionist. It
                                        gives you a taste of how our AI handles
                                        patient inquiries and scheduling.
                                    </p>

                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-sm text-blue-800">
                                            <strong>Note:</strong> This demo has
                                            limited functionality. For a full
                                            demonstration with your practice's
                                            specific workflows, please book a
                                            call with our team.
                                        </p>
                                    </div>
                                </div>

                                {/* Key Features */}
                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 rounded-full bg-blue-100">
                                            <Star
                                                size={20}
                                                className="text-blue-600"
                                            />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800">
                                            Key Features
                                        </h3>
                                    </div>

                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <div className="min-w-[20px] mr-2 text-blue-600">
                                                •
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                Natural, human-like
                                                conversations
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="min-w-[20px] mr-2 text-blue-600">
                                                •
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                24/7 availability for patients
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="min-w-[20px] mr-2 text-blue-600">
                                                •
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                Seamless appointment scheduling
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="min-w-[20px] mr-2 text-blue-600">
                                                •
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                Multi-language support
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="min-w-[20px] mr-2 text-blue-600">
                                                •
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                Automatic follow-ups and
                                                reminders
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Book a Call */}
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 rounded-full bg-white/20">
                                            <MessageSquare
                                                size={20}
                                                className="text-white"
                                            />
                                        </div>
                                        <h3 className="text-lg font-medium">
                                            Ready for the Real Thing?
                                        </h3>
                                    </div>

                                    <p className="text-sm text-blue-100 mb-4">
                                        Experience how our AI can transform your
                                        dental practice with a personalized demo
                                        tailored to your specific needs.
                                    </p>

                                    <Link href="/#contact">
                                        <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                                            Book a Free Consultation
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800 mb-1">
                                        HIPAA Compliant
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Your patients' data is always secure and
                                        protected.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800 mb-1">
                                        Quick Setup
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Most practices are up and running within
                                        2-3 days.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
                                    <Star size={24} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800 mb-1">
                                        98% Patient Satisfaction
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Patients love the immediate response and
                                        convenience.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </main>
        </ThemeProvider>
    );
}
