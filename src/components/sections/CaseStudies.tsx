"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

export default function CaseStudies() {
    // Add client-side only state
    const [isMounted, setIsMounted] = useState(false);

    // Set mounted state after hydration is complete
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const caseStudies = [
        {
            icon: <Building2 className="h-6 w-6 md:h-8 md:w-8" />,
            practice: "Sukhadanta",
            location: "Pune, Maharashtra",
            stats: [
                "65% decrease in receptionist workload",
                "Staff redirected to patient care",
                "₹ 2,50,000 saved annually",
            ],
            quote: "Kraftodent transformed our practice. The AI receptionist handles all scheduling and routine inquiries, allowing our team to focus entirely on providing exceptional dental care.",
            author: "Dr. Rajmod Kudalkar",
        },
        {
            icon: <Building2 className="h-6 w-6 md:h-8 md:w-8" />,
            practice: "Ora Care Dental Clinic",
            location: "Pune, Maharashtra",
            stats: [
                "99.8% appointment scheduling accuracy",
                "42% increase in patient satisfaction",
                "30% growth in new patients",
            ],
            quote: "The AI never misses a detail. Our patients love the instant responses at any hour, and we've seen a significant increase in positive reviews since implementing Kraftodent.",
            author: "Dr. Shailesh Swami",
        },
    ];

    // Define fixed paths for better performance
    const pathAnimations = [
        { start: "M 50 0 Q 45 50, 80 100", end: "M 55 0 Q 40 55, 75 100" },
        { start: "M 15 0 Q 45 50, 50 100", end: "M 20 0 Q 50 55, 45 100" },
        { start: "M 85 0 Q 55 50, 30 100", end: "M 80 0 Q 50 45, 35 100" },
        { start: "M 20 0 Q 40 45, 0 100", end: "M 25 0 Q 45 50, 5 100" },
        { start: "M 75 0 Q 50 55, 15 100", end: "M 70 0 Q 45 50, 20 100" },
    ];

    return (
        <section
            id="case-studies"
            className="py-16 md:py-20 bg-blue-50 relative overflow-hidden"
        >
            {/* Background Animation - Simplified for performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute w-full h-full opacity-10"
                >
                    {isMounted &&
                        pathAnimations.map((path, i) => (
                            <motion.path
                                key={i}
                                d={path.start}
                                stroke="rgba(37, 99, 235, 0.5)"
                                strokeWidth="0.5"
                                fill="none"
                                animate={{
                                    d: [path.start, path.end],
                                }}
                                transition={{
                                    duration: 10 + i,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
                        Success Stories
                    </h2>
                    <p className="text-base md:text-lg text-gray-600">
                        See how dental practices in Pune have transformed their
                        operations with Kraftodent
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {caseStudies.map((study, index) => (
                        <CaseStudyCard
                            key={index}
                            icon={study.icon}
                            practice={study.practice}
                            location={study.location}
                            stats={study.stats}
                            quote={study.quote}
                            author={study.author}
                        />
                    ))}
                </div>

                {/* Testimonial Highlight - Simplified for performance */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 md:mt-16 text-center"
                >
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md max-w-3xl mx-auto relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"></div>

                        <motion.div
                            animate={{
                                scale: [1, 1.01, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        >
                            <p className="text-xl md:text-2xl italic text-gray-700 mb-4 md:mb-6">
                                "Kraftodent has completely revolutionized how
                                our practice operates. We've reduced overhead
                                and improved patient satisfaction
                                simultaneously."
                            </p>
                            <p className="font-semibold text-blue-600">
                                — Dr. Priya Sharma, Dental Care Excellence,
                                Mumbai
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
