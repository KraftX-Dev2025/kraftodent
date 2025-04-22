"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    toggleOpen: () => void;
    index: number;
}

// Individual FAQ Item component
function FAQItem({
    question,
    answer,
    isOpen,
    toggleOpen,
    index,
}: FAQItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="border-b border-gray-200 last:border-b-0"
        >
            <button
                onClick={toggleOpen}
                className="flex justify-between items-center w-full py-4 text-left font-medium focus:outline-none"
            >
                <span className="text-base md:text-lg text-gray-800">
                    {question}
                </span>
                <span className="ml-4 flex-shrink-0 text-blue-600">
                    {isOpen ? (
                        <ChevronUp size={20} />
                    ) : (
                        <ChevronDown size={20} />
                    )}
                </span>
            </button>
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="pb-4 text-gray-600 text-sm md:text-base">
                    {answer}
                </div>
            </motion.div>
        </motion.div>
    );
}

// Main FAQ component
export default function FAQ() {
    // FAQ data
    const faqs = [
        {
            question: "Does Kraftodent integrate with my dental software?",
            answer: "Yes, we support most major practice management software platforms used in India, including Dentrix, Carestack, and more. Our team will ensure a smooth integration with your existing systems during the setup process, and we're constantly adding support for additional platforms.",
        },
        {
            question: "Will my patients talk to a robot?",
            answer: "No — our voice AI is designed to sound human, empathetic, and responsive. Patients often can't tell they're speaking with an AI system. We've specifically trained our voice models to handle Indian accents and multiple regional languages with natural conversational patterns.",
        },
        {
            question: "Can I customize responses?",
            answer: "Absolutely. We tailor call flows and language to match your clinic's tone, terminology preferences, and specific procedures. You can customize greeting messages, appointment confirmation details, and follow-up protocols to maintain your practice's unique identity.",
        },
        {
            question: "How long does it take to set up?",
            answer: "Most dental practices are up and running with Kraftodent within 2-3 days. Our onboarding team handles the integration with your existing software, trains your staff, and makes sure everything is working perfectly before going live.",
        },
        {
            question: "What languages does Kraftodent support?",
            answer: "Kraftodent currently supports English, Hindi, Marathi, Gujarati, Tamil, and Telugu. We're adding more Indian languages regularly based on customer demand.",
        },
        {
            question: "How secure is patient data?",
            answer: "We take data security extremely seriously. Kraftodent is fully HIPAA-compliant and uses advanced encryption for all patient conversations and data. Your patient information remains private, secure, and is never shared with third parties.",
        },
    ];

    // State to track which FAQ is open
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Toggle function for opening/closing FAQs
    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base md:text-lg text-gray-600">
                        Everything you need to know about Kraftodent for your
                        dental practice
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="divide-y divide-gray-200">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                toggleOpen={() => toggleFAQ(index)}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-600 mb-4">Still have questions?</p>
                    <a
                        href="#contact"
                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                        Contact our team for more information
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
