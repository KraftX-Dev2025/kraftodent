"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    ChevronUp,
    HelpCircle,
    Search,
    X,
    Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { allFaqs } from "@/lib/constants";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    toggleOpen: () => void;
    index: number;
    category: string;
}


// Individual FAQ Item component
function FAQItem({
    question,
    answer,
    isOpen,
    toggleOpen,
    index,
    category,
}: FAQItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="border-b border-gray-200 last:border-b-0 px-8"
        >
            <button
                onClick={toggleOpen}
                className="flex justify-between items-center w-full py-5 text-left font-medium focus:outline-none group"
                aria-expanded={isOpen}
            >
                <span className="text-base md:text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                    {question}
                </span>
                <span
                    className={`ml-4 flex-shrink-0 ${
                        isOpen ? "text-blue-600" : "text-gray-400"
                    } transition-colors`}
                >
                    {isOpen ? (
                        <ChevronUp size={20} />
                    ) : (
                        <ChevronDown size={20} />
                    )}
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-5 text-gray-600">
                            <p className="mb-4">{answer}</p>
                            <div className="flex items-center text-sm">
                                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-medium mr-2">
                                    {category}
                                </span>
                                <Link
                                    href="#contact"
                                    className="text-blue-600 hover:text-blue-700 transition-colors font-medium flex items-center"
                                >
                                    Need more help?{" "}
                                    <ChevronDown size={16} className="ml-1" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Main FAQ component
export default function FAQ() {
    // Available categories extracted from FAQs
    const categories = [...new Set(allFaqs.map((faq) => faq.category))];
    // State to track which FAQ is open
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeCategory, setActiveCategory] = useState<string>("All");
    // Toggle function for opening/closing FAQs
    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    // Filter FAQs based on search query and category
    const filteredFaqs = allFaqs.filter((faq) => {
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            activeCategory === "All" || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section id="faq" className="py-20 bg-gray-50 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                {/* Background dots pattern */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                    }}
                ></div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
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
                            <HelpCircle size={14} className="mr-1" /> Common
                            Questions
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Everything you need to know about Kraftodent for your
                        dental practice
                    </p>
                </motion.div>
                {/* Search and category filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mb-8"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            <Button
                                size="sm"
                                variant={
                                    activeCategory === "All"
                                        ? "default"
                                        : "outline"
                                }
                                className={`whitespace-nowrap ${
                                    activeCategory === "All"
                                        ? "bg-blue-600"
                                        : "border-gray-300"
                                }`}
                                onClick={() => setActiveCategory("All")}
                            >
                                All
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    size="sm"
                                    variant={
                                        activeCategory === category
                                            ? "default"
                                            : "outline"
                                    }
                                    className={`whitespace-nowrap mb-2 ${
                                        activeCategory === category
                                            ? "bg-blue-600"
                                            : "border-gray-300"
                                    }`}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </motion.div>
                <div className="max-w-3xl mx-auto">
                    {/* Search results summary */}
                    {searchQuery && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-4 text-sm text-gray-500 flex items-center"
                        >
                            <Check size={16} className="mr-2 text-green-500" />
                            Found {filteredFaqs.length} results for "
                            {searchQuery}"
                        </motion.div>
                    )}
                    {/* FAQ accordion */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-200"
                    >
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    category={faq.category}
                                    isOpen={openIndex === index}
                                    toggleOpen={() => toggleFAQ(index)}
                                    index={index}
                                />
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <HelpCircle
                                    size={40}
                                    className="mx-auto text-gray-300 mb-4"
                                />
                                <h3 className="text-xl font-medium text-gray-800 mb-2">
                                    No matching questions found
                                </h3>
                                <p className="text-gray-600">
                                    Please try another search term or browse all
                                    categories
                                </p>
                                <Button
                                    className="mt-4"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setActiveCategory("All");
                                    }}
                                >
                                    View all questions
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-600 mb-4">Still have questions?</p>
                    <Link href="#contact">
                        <Button
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Contact our team
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
