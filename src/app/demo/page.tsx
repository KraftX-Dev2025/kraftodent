"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
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
            <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <Navbar />

                <section className="pt-20 pb-12">
                    <div className="container mx-auto px-4 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <Link href="/">
                                <Button
                                    variant="ghost"
                                    className="flex items-center text-blue-600"
                                >
                                    <ArrowLeft size={16} className="mr-2" />
                                    Back to Home
                                </Button>
                            </Link>

                            <motion.h1
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-2xl md:text-3xl font-bold text-gray-800"
                            >
                                Kraftodent{" "}
                                <span className="text-blue-600">AI</span> Demo
                            </motion.h1>
                        </div>

                        {/* Tab Navigation */}
                        <Tabs
                            defaultValue="chat"
                            className="w-full max-w-7xl mx-auto mb-8"
                            onValueChange={(value) => setActiveTab(value)}
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="chat" className="text-base">
                                    AI Receptionist
                                </TabsTrigger>
                                <TabsTrigger
                                    value="dashboard"
                                    className="text-base"
                                >
                                    Practice Dashboard
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="chat" className="mt-6">
                                <div className="flex justify-center">
                                    {/* Chat Interface - Centered, Simple Layout */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full max-w-7xl"
                                    >
                                        <ChatInterface />

                                        <div className="mt-4 text-center">
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-gray-600 text-sm"
                                            >
                                                This demo showcases our AI
                                                receptionist capabilities. For a
                                                personalized demo with your
                                                practice's workflows,
                                                <Link
                                                    href="/#contact"
                                                    className="text-blue-600 font-medium ml-1"
                                                >
                                                    contact us
                                                </Link>
                                                .
                                            </motion.p>
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
                                            <h3 className="text-lg font-medium text-gray-800 mb-3">
                                                Practice Dashboard
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4">
                                                This demo shows how Kraftodent's
                                                AI integrates with your practice
                                                management system, providing
                                                real-time analytics and
                                                insights.
                                            </p>
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <p className="text-sm text-blue-800">
                                                    Your actual dashboard will
                                                    be customized to your
                                                    specific practice needs and
                                                    data.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Book a Call */}
                                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white">
                                            <h3 className="text-lg font-medium mb-4">
                                                See Your Own Data
                                            </h3>
                                            <p className="text-sm text-blue-100 mb-4">
                                                Get a personalized demonstration
                                                with your practice's actual data
                                                and workflows.
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
                    </div>
                </section>

                <Footer />
            </main>
        </ThemeProvider>
    );
}
