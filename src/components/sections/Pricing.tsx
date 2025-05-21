import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Check,
    X,
    HelpCircle,
    ArrowRight,
    CheckCircle,
    Users,
    Building,
    BadgeCheck,
    Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Pricing() {
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
        "yearly"
    );
    const [showTooltip, setShowTooltip] = useState<string | null>(null);

    const toggleBillingPeriod = () => {
        setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly");
    };

    const plans = [
        {
            name: "Basic",
            icon: <Users className="h-6 w-6" />,
            description:
                "Perfect for smaller dental practices with up to 3 dentists",
            monthlyPrice: "₹20,000",
            yearlyPrice: "₹16,000",
            yearlyTotal: "₹192,000",
            features: [
                {
                    included: true,
                    text: "AI Receptionist with 24/7 availability",
                },
                {
                    included: true,
                    text: "Appointment scheduling & reminders",
                },
                {
                    included: true,
                    text: "WhatsApp integration",
                },
                {
                    included: true,
                    text: "2 language support",
                    tooltip:
                        "English and Hindi included. Additional languages available as add-ons.",
                },
                {
                    included: false,
                    text: "Multi-location support",
                },
                {
                    included: false,
                    text: "Advanced Analytics Dashboard",
                },
                {
                    included: false,
                    text: "Custom Integration",
                },
            ],
            popular: false,
            callToAction: "Get Started",
            callToActionLink: "#contact",
        },
        {
            name: "Professional",
            icon: <Building className="h-6 w-6" />,
            description:
                "Ideal for growing practices with 4-10 dentists and multiple staff members",
            monthlyPrice: "₹35,000",
            yearlyPrice: "₹28,000",
            yearlyTotal: "₹336,000",
            features: [
                {
                    included: true,
                    text: "AI Receptionist with 24/7 availability",
                },
                {
                    included: true,
                    text: "Appointment scheduling & reminders",
                },
                {
                    included: true,
                    text: "WhatsApp & SMS integration",
                },
                {
                    included: true,
                    text: "5 language support",
                    tooltip:
                        "English, Hindi, Marathi, Tamil, and Telugu included",
                },
                {
                    included: true,
                    text: "Multi-location support",
                    tooltip: "Up to 3 locations",
                },
                {
                    included: true,
                    text: "Advanced Analytics Dashboard",
                },
                {
                    included: false,
                    text: "Custom Integration",
                },
            ],
            popular: true,
            callToAction: "Get Started",
            callToActionLink: "#contact",
        },
        {
            name: "Enterprise",
            icon: <BadgeCheck className="h-6 w-6" />,
            description:
                "For large dental chains with 10+ dentists and complex requirements",
            monthlyPrice: "Contact Us",
            yearlyPrice: "Contact Us",
            yearlyTotal: "",
            features: [
                {
                    included: true,
                    text: "AI Receptionist with 24/7 availability",
                },
                {
                    included: true,
                    text: "Appointment scheduling & reminders",
                },
                {
                    included: true,
                    text: "All communication channels",
                },
                {
                    included: true,
                    text: "All available languages",
                },
                {
                    included: true,
                    text: "Unlimited locations",
                },
                {
                    included: true,
                    text: "Advanced Analytics Dashboard",
                },
                {
                    included: true,
                    text: "Custom Integration",
                    tooltip:
                        "We'll integrate with your existing practice management software",
                },
            ],
            popular: false,
            callToAction: "Contact Sales",
            callToActionLink: "#contact",
        },
    ];

    return (
        <section
            id="pricing"
            className="py-20 bg-gray-50 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-200 opacity-30"
                >
                    <pattern
                        id="pricing-grid"
                        width="60"
                        height="60"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 60 0 L 0 0 0 60"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                        />
                    </pattern>
                    <rect
                        width="100%"
                        height="100%"
                        fill="url(#pricing-grid)"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4"
                    >
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                            <Calendar size={14} className="mr-1" /> Simple
                            Pricing
                        </span>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Choose the Perfect Plan for Your Practice
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Transparent pricing with no hidden fees. All plans
                        include setup assistance and dedicated support.
                    </p>

                    {/* Billing period toggle */}
                    <div className="flex items-center justify-center mb-4">
                        <span
                            className={`text-sm ${
                                billingPeriod === "monthly"
                                    ? "text-gray-800 font-medium"
                                    : "text-gray-500"
                            }`}
                        >
                            Monthly Billing
                        </span>
                        <button
                            onClick={toggleBillingPeriod}
                            className="relative mx-4 h-6 w-12 rounded-full bg-blue-600 p-1"
                            aria-label={`Switch to ${
                                billingPeriod === "monthly"
                                    ? "yearly"
                                    : "monthly"
                            } billing`}
                        >
                            <motion.div
                                className="h-4 w-4 rounded-full bg-white"
                                animate={{
                                    x: billingPeriod === "monthly" ? 0 : 24,
                                }}
                            />
                        </button>
                        <span
                            className={`text-sm ${
                                billingPeriod === "yearly"
                                    ? "text-gray-800 font-medium"
                                    : "text-gray-500"
                            }`}
                        >
                            Yearly Billing
                        </span>
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Save 20%
                        </span>
                    </div>
                </motion.div>

                {/* Pricing cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`bg-white rounded-xl shadow-lg overflow-hidden border relative ${
                                plan.popular
                                    ? "border-blue-500"
                                    : "border-gray-200"
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12">
                                    Most Popular
                                </div>
                            )}

                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center mb-4">
                                    <div
                                        className={`p-2 rounded-lg ${
                                            plan.popular
                                                ? "bg-blue-100 text-blue-600"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {plan.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 ml-3">
                                        {plan.name}
                                    </h3>
                                </div>

                                <p className="text-gray-600 text-sm mb-6">
                                    {plan.description}
                                </p>

                                <div className="mb-4">
                                    {plan.yearlyTotal ? (
                                        <div>
                                            <div className="text-4xl font-bold text-gray-800">
                                                {billingPeriod === "monthly"
                                                    ? plan.monthlyPrice
                                                    : plan.yearlyPrice}
                                                <span className="text-sm font-normal text-gray-500">
                                                    /month
                                                </span>
                                            </div>
                                            {billingPeriod === "yearly" && (
                                                <div className="text-sm text-gray-500 mt-1">
                                                    Billed annually (
                                                    {plan.yearlyTotal})
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-3xl font-bold text-gray-800">
                                            {plan.monthlyPrice}
                                        </div>
                                    )}
                                </div>

                                <Link href={plan.callToActionLink}>
                                    <Button
                                        className={`w-full ${
                                            plan.popular
                                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                : "bg-white border hover:bg-gray-50 text-gray-800"
                                        }`}
                                    >
                                        {plan.callToAction}
                                        <ArrowRight
                                            size={16}
                                            className="ml-2"
                                        />
                                    </Button>
                                </Link>
                            </div>

                            <div className="p-6">
                                <h4 className="font-medium text-gray-800 mb-4">
                                    Features included:
                                </h4>
                                <ul className="space-y-3">
                                    {plan.features.map(
                                        (feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="flex items-start"
                                            >
                                                <div className="flex-shrink-0 h-5 w-5 mt-0.5">
                                                    {feature.included ? (
                                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-gray-400" />
                                                    )}
                                                </div>
                                                <span
                                                    className={`ml-3 text-sm ${
                                                        feature.included
                                                            ? "text-gray-700"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    {feature.text}
                                                    {feature.tooltip && (
                                                        <span
                                                            className="relative inline-block ml-1"
                                                            onMouseEnter={() =>
                                                                setShowTooltip(
                                                                    plan.name +
                                                                        featureIndex
                                                                )
                                                            }
                                                            onMouseLeave={() =>
                                                                setShowTooltip(
                                                                    null
                                                                )
                                                            }
                                                        >
                                                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 inline cursor-help" />

                                                            {showTooltip ===
                                                                plan.name +
                                                                    featureIndex && (
                                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                                                                    {
                                                                        feature.tooltip
                                                                    }
                                                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-solid border-transparent border-t-gray-800"></div>
                                                                </div>
                                                            )}
                                                        </span>
                                                    )}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Money Back Guarantee */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-blue-50 border border-blue-100 rounded-xl p-6 text-center max-w-3xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                        <div className="bg-white p-3 rounded-full">
                            <BadgeCheck className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-gray-800 mb-1">
                                30-Day Money Back Guarantee
                            </h4>
                            <p className="text-gray-600 text-sm">
                                Not satisfied? Let us know within 30 days and
                                we'll refund your payment. No questions asked.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* FAQ Teaser */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600">
                        Have questions about our pricing plans?
                    </p>
                    <Link
                        href="/#faq"
                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                    >
                        Check our FAQ section
                        <ArrowRight size={16} className="ml-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
