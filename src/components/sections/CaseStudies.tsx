import React from "react";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

export default function CaseStudies() {
    const caseStudies = [
        {
            icon: <Building2 className="h-8 w-8" />,
            practice: "Sukhadanta",
            location: "Pune, Maharashtra",
            stats: [
                "65% decrease in receptionist workload",
                "Staff redirected to patient care",
                "₹3,20,000 monthly operational savings",
            ],
            quote: "Kraftodent transformed our practice. The AI receptionist handles all scheduling and routine inquiries, allowing our team to focus entirely on providing exceptional dental care.",
            author: "Dr. Rajmod Kudalkar",
        },
        {
            icon: <Building2 className="h-8 w-8" />,
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

    return (
        <section
            id="case-studies"
            className="py-24 bg-blue-50 relative overflow-hidden"
        >
            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute w-full h-full opacity-10"
                >
                    {[...Array(10)].map((_, i) => (
                        <motion.path
                            key={i}
                            d={`M ${Math.random() * 100} 0 Q ${
                                50 + Math.random() * 20 - 10
                            } ${50 + Math.random() * 20 - 10}, ${
                                Math.random() * 100
                            } 100`}
                            stroke="rgba(37, 99, 235, 0.5)"
                            strokeWidth="0.5"
                            fill="none"
                            animate={{
                                d: `M ${Math.random() * 100} 0 Q ${
                                    50 + Math.random() * 40 - 20
                                } ${50 + Math.random() * 40 - 20}, ${
                                    Math.random() * 100
                                } 100`,
                            }}
                            transition={{
                                duration: 10 + Math.random() * 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Success Stories
                    </h2>
                    <p className="text-gray-600 text-lg">
                        See how dental practices in Pune have transformed their
                        operations with Kraftodent
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

                {/* Testimonial Carousel/Highlights */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"></div>

                        <motion.div
                            animate={{
                                scale: [1, 1.02, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        >
                            <p className="text-2xl italic text-gray-700 mb-6">
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
