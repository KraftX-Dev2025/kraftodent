import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
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
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
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

        if (!formData.cityState.trim())
            newErrors.cityState = "City and state are required";

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

        return encodeURIComponent(message);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
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

            // Optional: Reset the form after successful submission
            setFormData({
                name: "",
                businessName: "",
                email: "",
                phone: "",
                cityState: "",
                locationLink: "",
                practiceSize: "1-3 Dentists",
            });
        } else {
            // Scroll to the first error
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField) {
                document.getElementById(firstErrorField)?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    };

    return (
        <section
            id="contact"
            className="py-24 bg-gradient-to-r from-blue-50 to-indigo-100 relative overflow-hidden"
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
                    className="absolute w-full h-full"
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
                <div className="max-w-lg mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Transform Your Dental Practice Today
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Join hundreds of dental practices across India that
                            have revolutionized their operations with
                            Kraftodent's AI assistant
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100"
                    >
                        {submitted ? (
                            <div className="text-center py-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 text-green-500 mx-auto mb-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    Thank You!
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Your demo request has been sent. We'll
                                    contact you shortly via WhatsApp.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-blue-600 underline hover:text-blue-800"
                                >
                                    Submit another request
                                </button>
                            </div>
                        ) : (
                            <form
                                className="space-y-6"
                                onSubmit={handleSubmit}
                                aria-label="Demo request form"
                                role="form"
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Dr. John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        aria-required="true"
                                        aria-invalid={
                                            errors.name ? "true" : "false"
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

                                <div>
                                    <label
                                        htmlFor="businessName"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Business Name
                                    </label>
                                    <input
                                        type="text"
                                        id="businessName"
                                        placeholder="John's Dental Clinic"
                                        value={formData.businessName}
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

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="john-doe@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        aria-required="true"
                                        aria-invalid={
                                            errors.email ? "true" : "false"
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

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700"
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
                                            errors.phone ? "true" : "false"
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

                                <div>
                                    <label
                                        htmlFor="cityState"
                                        className="block text-sm font-medium text-gray-700"
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
                                            errors.cityState ? "true" : "false"
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

                                <div>
                                    <label
                                        htmlFor="locationLink"
                                        className="block text-sm font-medium text-gray-700"
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
                                        value={formData.locationLink}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="practiceSize"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Practice Size
                                    </label>
                                    <select
                                        id="practiceSize"
                                        value={formData.practiceSize}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                                    >
                                        <option>1-3 Dentists</option>
                                        <option>4-9 Dentists</option>
                                        <option>10+ Dentists</option>
                                    </select>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center justify-center"
                                >
                                    <Button
                                        type="submit"
                                        className="w-full space-x-2 md:w-[14rem] bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-bold transition duration-300"
                                        aria-label="Book a demo via WhatsApp"
                                    >
                                        <MessageSquare size={24} />
                                        <span>Book a Demo</span>
                                    </Button>
                                </motion.div>
                            </form>
                        )}
                    </motion.div>

                    {/* Additional contact information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mt-8 text-center"
                    >
                        <p className="text-gray-600 mb-2">
                            Or reach us directly:
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                            <a
                                href="mailto:contact@kraftxworks.com"
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                contact@kraftxworks.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
