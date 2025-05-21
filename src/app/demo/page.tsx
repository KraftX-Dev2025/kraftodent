"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Bot,
    MessageSquare,
    Shield,
    Calendar,
    Users,
    ChartBar,
    Layers,
    ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import ChatInterface from "@/components/chat/ChatInterface";
import DashboardInterface from "@/components/demo/DashboardInterface";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function DemoPage() {
    const [activeTab, setActiveTab] = useState("chat");

    return (
        <ThemeProvider defaultTheme="light">
            <main className="min-h-screen bg-gray-50">
                <Navbar />

                <section className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
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
                                Interactive Demo Experience
                            </motion.h1>
                        </div>

                        {/* Tab Navigation */}
                        <Tabs
                            defaultValue="chat"
                            className="mb-8"
                            onValueChange={(
                                value: React.SetStateAction<string>
                            ) => setActiveTab(value)}
                        >
                            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                                <TabsTrigger
                                    value="chat"
                                    className="flex items-center gap-2"
                                >
                                    <MessageSquare size={16} />
                                    AI Receptionist
                                </TabsTrigger>
                                <TabsTrigger
                                    value="dashboard"
                                    className="flex items-center gap-2"
                                >
                                    <Layers size={16} />
                                    Practice Dashboard
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="chat" className="mt-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Chat Interface */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.2,
                                        }}
                                        className="lg:col-span-2"
                                    >
                                        <ChatInterface />
                                    </motion.div>

                                    {/* Sidebar with information */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.3,
                                        }}
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
                                                Kraftodent's AI dental
                                                receptionist. It gives you a
                                                taste of how our AI handles
                                                patient inquiries and
                                                scheduling.
                                            </p>

                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <p className="text-sm text-blue-800">
                                                    <strong>Note:</strong> This
                                                    demo has limited
                                                    functionality. For a full
                                                    demonstration with your
                                                    practice's specific
                                                    workflows, please book a
                                                    call with our team.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Key Features */}
                                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                                            <div className="flex items-center space-x-3 mb-4">
                                                <div className="p-2 rounded-full bg-blue-100">
                                                    <MessageSquare
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
                                                        24/7 availability for
                                                        patients
                                                    </span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="min-w-[20px] mr-2 text-blue-600">
                                                        •
                                                    </div>
                                                    <span className="text-sm text-gray-600">
                                                        Seamless appointment
                                                        scheduling
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
                                                Experience how our AI can
                                                transform your dental practice
                                                with a personalized demo
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
                            </TabsContent>

                            <TabsContent value="dashboard" className="mt-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Dashboard Interface */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.2,
                                        }}
                                        className="lg:col-span-2"
                                    >
                                        <DashboardInterface />
                                    </motion.div>

                                    {/* Sidebar with information */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.3,
                                        }}
                                        className="space-y-6"
                                    >
                                        {/* About the Dashboard */}
                                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                                            <div className="flex items-center space-x-3 mb-4">
                                                <div className="p-2 rounded-full bg-blue-100">
                                                    <Layers
                                                        size={20}
                                                        className="text-blue-600"
                                                    />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-800">
                                                    Practice Dashboard
                                                </h3>
                                            </div>

                                            <p className="text-gray-600 text-sm mb-4">
                                                This demo shows how Kraftodent's
                                                AI integrates with your practice
                                                management system, providing
                                                real-time analytics and
                                                insights.
                                            </p>

                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <p className="text-sm text-blue-800">
                                                    <strong>Note:</strong> This
                                                    is a static representation.
                                                    Your actual dashboard will
                                                    be customized to your
                                                    practice's specific needs
                                                    and data.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Dashboard Features */}
                                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                                            <div className="flex items-center space-x-3 mb-4">
                                                <div className="p-2 rounded-full bg-blue-100">
                                                    <ChartBar
                                                        size={20}
                                                        className="text-blue-600"
                                                    />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-800">
                                                    Dashboard Features
                                                </h3>
                                            </div>

                                            <ul className="space-y-3">
                                                <li className="flex items-start">
                                                    <div className="min-w-[20px] mr-2 text-blue-600">
                                                        •
                                                    </div>
                                                    <span className="text-sm text-gray-600">
                                                        Real-time appointment
                                                        overview
                                                    </span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="min-w-[20px] mr-2 text-blue-600">
                                                        •
                                                    </div>
                                                    <span className="text-sm text-gray-600">
                                                        Patient engagement
                                                        metrics
                                                    </span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="min-w-[20px] mr-2 text-blue-600">
                                                        •
                                                    </div>
                                                    <span className="text-sm text-gray-600">
                                                        Revenue tracking and
                                                        forecasting
                                                    </span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="min-w-[20px] mr-2 text-blue-600">
                                                        •
                                                    </div>
                                                    <span className="text-sm text-gray-600">
                                                        Staff performance
                                                        analytics
                                                    </span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="min-w-[20px] mr-2 text-blue-600">
                                                        •
                                                    </div>
                                                    <span className="text-sm text-gray-600">
                                                        Treatment conversion
                                                        rates
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Book a Call */}
                                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white">
                                            <div className="flex items-center space-x-3 mb-4">
                                                <div className="p-2 rounded-full bg-white/20">
                                                    <Calendar
                                                        size={20}
                                                        className="text-white"
                                                    />
                                                </div>
                                                <h3 className="text-lg font-medium">
                                                    See Your Own Data
                                                </h3>
                                            </div>

                                            <p className="text-sm text-blue-100 mb-4">
                                                Get a personalized demonstration
                                                with your practice's actual data
                                                and workflows to see the full
                                                potential of Kraftodent.
                                            </p>

                                            <Link href="/#contact">
                                                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                                                    Schedule a Personalized Demo
                                                </Button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Trust Indicators - Show on both tabs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
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
                                    <Calendar size={24} />
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
                                    <Users size={24} />
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
