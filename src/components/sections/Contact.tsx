import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    MessageSquare,
    Calendar,
    PhoneCall,
    Mail,
    MapPin,
    ArrowRight,
    Check,
    Clock,
    CheckCircle,
    User,
    Building,
    Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Script from "next/script";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        cityState: "",
        locationLink: "",
        practiceSize: "1-3 Dentists",
        message: "",
        preferredTime: "",
    });

    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));

        // Clear error for this field when user types
        if (errors[id]) {
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            });
        }
    };

    const validateStep = (currentStep: number) => {
        const newErrors: Record<string, string> = {};

        if (currentStep === 1) {
            if (!formData.name.trim()) newErrors.name = "Full name is required";
            if (!formData.businessName.trim())
                newErrors.businessName = "Business name is required";

            // Email validation
            if (!formData.email.trim()) {
                newErrors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Please enter a valid email address";
            }

            // Phone validation
            if (!formData.phone.trim()) {
                newErrors.phone = "Phone number is required";
            } else if (
                !/^(\+\d{1,3}[-\s]?)?\d{10}$/.test(
                    formData.phone.replace(/[\s()-]/g, "")
                )
            ) {
                newErrors.phone = "Please enter a valid phone number";
            }
        }

        if (currentStep === 2) {
            if (!formData.cityState.trim())
                newErrors.cityState = "City and state are required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const generateWhatsAppMessage = () => {
        let message = `*New Demo Request*\n\n`;
        message += `*Contact Details:*\n`;
        message += `Name: ${formData.name}\n`;
        message += `Business Name: ${formData.businessName}\n`;
        message += `Email: ${formData.email}\n`;
        message += `Phone: ${formData.phone}\n`;
        message += `Location: ${formData.cityState}\n`;
        message += `Google Maps: ${formData.locationLink || "Not provided"}\n`;
        message += `Practice Size: ${formData.practiceSize}\n`;
        message += `Preferred Time: ${
            formData.preferredTime || "Not specified"
        }\n`;
        message += `Message: ${formData.message || "No additional message"}\n`;

        return encodeURIComponent(message);
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateStep(step)) {
            setIsLoading(true);

            // Simulate form submission delay
            setTimeout(() => {
                // Track form submission for analytics
                if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag("event", "form_submit", {
                        event_category: "engagement",
                        event_label: "demo_request",
                    });
                }

                // Generate WhatsApp URL with the message
                const whatsappUrl = `https://wa.me/9822296812?text=${generateWhatsAppMessage()}`;

                // Open WhatsApp in a new tab
                window.open(whatsappUrl, "_blank", "noopener,noreferrer");

                // Mark as submitted for UI feedback
                setSubmitted(true);
                setIsLoading(false);

                // Optional: Reset the form after successful submission
                setTimeout(() => {
                    setFormData({
                        name: "",
                        businessName: "",
                        email: "",
                        phone: "",
                        cityState: "",
                        locationLink: "",
                        practiceSize: "1-3 Dentists",
                        message: "",
                        preferredTime: "",
                    });
                    setStep(1);
                }, 5000);
            }, 1500);
        }
    };

    const testimonials = [
        {
            quote: "Kraftodent has literally transformed my practice. I've reduced front desk staff costs by 40% while improving patient satisfaction.",
            author: "Dr. Rajesh Kumar",
            practice: "Smile Dental Clinic, Pune",
            image: "/avatar1.jpg", // Placeholder
        },
        {
            quote: "The AI receptionist never misses a call. Our appointment bookings have increased by 35% since implementing Kraftodent.",
            author: "Dr. Priya Sharma",
            practice: "Perfect Smile Dentistry, Mumbai",
            image: "/avatar2.jpg", // Placeholder
        },
    ];

    return (
        <section
            id="contact"
            className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden"
        >
            {/* JSON-LD Structured Data for Local Business - Contact Information */}
            <Script
                id="structured-data-contact"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Kraftodent AI Receptionist Demo",
                        serviceType: "Software Demo",
                        description:
                            "Book a personalized demo of Kraftodent AI receptionist for your dental practice",
                        provider: {
                            "@type": "Organization",
                            name: "Kraftodent",
                            email: "contact@kraftxworks.com",
                        },
                        areaServed: {
                            "@type": "Country",
                            name: "India",
                        },
                        audience: {
                            "@type": "Audience",
                            audienceType: "Dental Practices",
                        },
                    }),
                }}
            />

            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <svg
                    className="absolute w-full h-full opacity-30"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.path
                            key={i}
                            d={`M0,${20 + i * 15} C${30 + i * 10},${
                                60 + i * 5
                            } ${70 - i * 10},${40 - i * 5} 100,${80 - i * 15}`}
                            stroke="rgba(37, 99, 235, 0.1)"
                            strokeWidth="2"
                            fill="none"
                            animate={{
                                d: `M0,${25 + i * 15} C${40 + i * 10},${
                                    70 + i * 5
                                } ${60 - i * 10},${30 - i * 5} 100,${
                                    75 - i * 15
                                }`,
                            }}
                            transition={{
                                duration: 8 + i * 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="mb-8"
                            >
                                <div className="inline-block mb-2">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                                        <Calendar size={14} className="mr-1" />{" "}
                                        Book a Demo
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                                    Transform Your Dental Practice Today
                                </h2>
                                <p className="text-gray-600">
                                    Join hundreds of dental practices across
                                    India that have revolutionized their
                                    operations with Kraftodent's AI assistant
                                </p>
                            </motion.div>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-10"
                                >
                                    <div className="bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="h-10 w-10 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                        Thank You!
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Your demo request has been sent. We'll
                                        contact you shortly via WhatsApp.
                                    </p>
                                    <p className="text-gray-600 mb-6">
                                        Meanwhile, check your email for more
                                        information about Kraftodent's services.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-blue-600 underline hover:text-blue-800"
                                    >
                                        Submit another request
                                    </button>
                                </motion.div>
                            ) : (
                                <form
                                    className="space-y-6"
                                    onSubmit={handleSubmit}
                                    aria-label="Demo request form"
                                    role="form"
                                >
                                    {/* Step 1 - Basic Information */}
                                    {step === 1 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="mb-6">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                                    <User
                                                        size={18}
                                                        className="mr-2 text-blue-600"
                                                    />
                                                    Your Information
                                                </h3>
                                                <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                                                    <div
                                                        className="h-full bg-blue-600 rounded-full"
                                                        style={{ width: "33%" }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium text-gray-700 mb-1"
                                                >
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    placeholder="Dr. John Doe"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    aria-required="true"
                                                    aria-invalid={
                                                        errors.name
                                                            ? "true"
                                                            : "false"
                                                    }
                                                    aria-describedby={
                                                        errors.name
                                                            ? "name-error"
                                                            : undefined
                                                    }
                                                    className={`mt-1 block w-full rounded-md border ${
                                                        errors.name
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    } px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600`}
                                                />
                                                {errors.name && (
                                                    <p
                                                        id="name-error"
                                                        className="text-red-500 text-xs mt-1"
                                                    >
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mt-4">
                                                <label
                                                    htmlFor="businessName"
                                                    className="block text-sm font-medium text-gray-700 mb-1"
                                                >
                                                    Practice Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="businessName"
                                                    placeholder="Smile Dental Clinic"
                                                    value={
                                                        formData.businessName
                                                    }
                                                    onChange={handleChange}
                                                    aria-required="true"
                                                    aria-invalid={
                                                        errors.businessName
                                                            ? "true"
                                                            : "false"
                                                    }
                                                    aria-describedby={
                                                        errors.businessName
                                                            ? "businessName-error"
                                                            : undefined
                                                    }
                                                    className={`mt-1 block w-full rounded-md border ${
                                                        errors.businessName
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    } px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600`}
                                                />
                                                {errors.businessName && (
                                                    <p
                                                        id="businessName-error"
                                                        className="text-red-500 text-xs mt-1"
                                                    >
                                                        {errors.businessName}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mt-4">
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm font-medium text-gray-700 mb-1"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    placeholder="doctor@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    aria-required="true"
                                                    aria-invalid={
                                                        errors.email
                                                            ? "true"
                                                            : "false"
                                                    }
                                                    aria-describedby={
                                                        errors.email
                                                            ? "email-error"
                                                            : undefined
                                                    }
                                                    className={`mt-1 block w-full rounded-md border ${
                                                        errors.email
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    } px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600`}
                                                />
                                                {errors.email && (
                                                    <p
                                                        id="email-error"
                                                        className="text-red-500 text-xs mt-1"
                                                    >
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mt-4">
                                                <label
                                                    htmlFor="phone"
                                                    className="block text-sm font-medium text-gray-700 mb-1"
                                                >
                                                    Mobile Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    placeholder="+91-1234567890"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    aria-required="true"
                                                    aria-invalid={
                                                        errors.phone
                                                            ? "true"
                                                            : "false"
                                                    }
                                                    aria-describedby={
                                                        errors.phone
                                                            ? "phone-error"
                                                            : undefined
                                                    }
                                                    className={`mt-1 block w-full rounded-md border ${
                                                        errors.phone
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    } px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600`}
                                                />
                                                {errors.phone && (
                                                    <p
                                                        id="phone-error"
                                                        className="text-red-500 text-xs mt-1"
                                                    >
                                                        {errors.phone}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mt-6">
                                                <Button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-300 flex items-center justify-center"
                                                >
                                                    Next Step
                                                    <ArrowRight
                                                        size={18}
                                                        className="ml-2"
                                                    />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 2 - Practice Details */}
                                    {step === 2 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="mb-6">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                                    <Building
                                                        size={18}
                                                        className="mr-2 text-blue-600"
                                                    />
                                                    Practice Details
                                                </h3>
                                                <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                                                    <div
                                                        className="h-full bg-blue-600 rounded-full"
                                                        style={{ width: "66%" }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="cityState"
                                                    className="block text-sm font-medium text-gray-700 mb-1"
                                                >
                                                    City and State
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cityState"
                                                    placeholder="Bengaluru, Karnataka"
                                                    value={formData.cityState}
                                                    onChange={handleChange}
                                                    aria-required="true"
                                                    aria-invalid={
                                                        errors.cityState
                                                            ? "true"
                                                            : "false"
                                                    }
                                                    aria-describedby={
                                                        errors.cityState
                                                            ? "cityState-error"
                                                            : undefined
                                                    }
                                                    className={`mt-1 block w-full rounded-md border ${
                                                        errors.cityState
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    } px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600`}
                                                />
                                                {errors.cityState && (
                                                    <p
                                                        id="cityState-error"
                                                        className="text-red-500 text-xs mt-1"
                                                    >
                                                        {errors.cityState}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mt-4">
                                                <label
                                                    htmlFor="locationLink"
                                                    className="block text-sm font-medium text-gray-700 mb-1"
                                                >
                                                    Google Maps Link{" "}
                                                    <span className="text-gray-500 text-xs">
                                                        (optional)
                                                    </span>
                                                </label>
                                                <input
                                                    type="url"
                                                    id="locationLink"
                                                    placeholder="Your Google Maps Link"
                                                    value={
                                                        formData.locationLink
                                                    }
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                                                />
                                            </div>

                                            <div className="mt-4">
                                                <label
                                                    htmlFor="practiceSize"
                                                    className="block text-sm font-medium text-gray-700 mb-1"
                                                >
                                                    Practice Size
                                                </label>
                                                <select
                                                    id="practiceSize"
                                                    value={
                                                        formData.practiceSize
                                                    }
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                                                >
                                                    <option>
                                                        1-3 Dentists
                                                    </option>
                                                    <option>
                                                        4-9 Dentists
                                                    </option>
                                                    <option>
                                                        10+ Dentists
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="mt-6 flex space-x-4">
                                                <Button
                                                    type="button"
                                                    onClick={prevStep}
                                                    variant="outline"
                                                    className="w-1/2 border-blue-600 text-blue-600"
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white"
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3 - Final Details */}
                                    {step === 3 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="mb-6">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                                    <Calendar
                                                        size={18}
                                                        className="mr-2 text-blue-600"
                                                    />
                                                    Scheduling Preferences
                                                </h3>
                                                <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                                                    <div
                                                        className="h-full bg-blue-600 rounded-full"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="preferredTime"
                                                    className="block text-sm font-medium text-gray-700 mb-1"
                                                >
                                                    Preferred Demo Time{" "}
                                                    <span className="text-gray-500 text-xs">
                                                        (optional)
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="preferredTime"
                                                    placeholder="e.g., Weekdays after 6 PM"
                                                    value={
                                                        formData.preferredTime
                                                    }
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                                                />
                                            </div>

                                            <div className="mt-4">
                                                <label
                                                    htmlFor="message"
                                                    className="block text-sm font-medium text-gray-700 mb-1"
                                                >
                                                    Additional Information{" "}
                                                    <span className="text-gray-500 text-xs">
                                                        (optional)
                                                    </span>
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows={3}
                                                    placeholder="Tell us about your specific needs or questions"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                                                />
                                            </div>

                                            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                                                <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                                                    <Check
                                                        size={16}
                                                        className="mr-2"
                                                    />
                                                    What happens next?
                                                </h4>
                                                <p className="text-sm text-blue-700">
                                                    Our team will contact you
                                                    within 24 hours to schedule
                                                    your personalized demo.
                                                    We'll show you exactly how
                                                    Kraftodent can transform
                                                    your dental practice.
                                                </p>
                                            </div>

                                            <div className="mt-6 flex space-x-4">
                                                <Button
                                                    type="button"
                                                    onClick={prevStep}
                                                    variant="outline"
                                                    className="w-1/2 border-blue-600 text-blue-600"
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white space-x-2 flex items-center justify-center"
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <svg
                                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                ></circle>
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                ></path>
                                                            </svg>
                                                            <span>
                                                                Processing...
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <MessageSquare
                                                                size={18}
                                                            />
                                                            <span>
                                                                Book a Demo
                                                            </span>
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </form>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Column - Contact Info, Testimonials */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Contact Box */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                Get in Touch
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-4">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-800">
                                            Email
                                        </h4>
                                        <a
                                            href="mailto:contact@kraftxworks.com"
                                            className="text-blue-600 hover:underline"
                                        >
                                            contact@kraftxworks.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-4">
                                        <PhoneCall size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-800">
                                            Phone
                                        </h4>
                                        <a
                                            href="tel:+919822296812"
                                            className="text-blue-600 hover:underline"
                                        >
                                            +91 98222 96812
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-4">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-800">
                                            Location
                                        </h4>
                                        <p className="text-gray-600">
                                            Pune, Maharashtra, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-4">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-800">
                                            Hours
                                        </h4>
                                        <p className="text-gray-600">
                                            Monday - Friday: 9 AM - 6 PM IST
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benefits/Features box */}
                        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-bold mb-4">
                                Why Book a Demo?
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "See how AI receptionist handles real patient calls",
                                    "Get personalized ROI analysis for your practice",
                                    "Learn about seamless integration with your systems",
                                    "Experience our multilingual capabilities",
                                    "Discover how to reduce staff workload by 40%",
                                ].map((benefit, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start"
                                    >
                                        <CheckCircle className="h-5 w-5 text-blue-300 mr-2 mt-0.5 flex-shrink-0" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Testimonials */}
                        <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                What Dentists Are Saying
                            </h3>

                            <div className="space-y-6">
                                {testimonials.map((testimonial, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: index * 0.2,
                                            duration: 0.5,
                                        }}
                                        viewport={{ once: true }}
                                        className="bg-white p-4 rounded-lg shadow-sm"
                                    >
                                        <p className="text-gray-600 text-sm italic mb-3">
                                            "{testimonial.quote}"
                                        </p>
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">
                                                    {testimonial.author}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {testimonial.practice}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
