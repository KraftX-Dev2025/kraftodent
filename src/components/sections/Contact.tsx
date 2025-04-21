import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        cityState: "",
        locationLink: "",
        practiceSize: "1-3 Dentists"
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Full name is required";
        if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.cityState.trim()) newErrors.cityState = "City and state are required";
        
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
            // Generate WhatsApp URL with the message
            const whatsappUrl = `https://wa.me/919822296812?text=${generateWhatsAppMessage()}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            
            // Optional: Reset the form after successful submission
            setFormData({
                name: "",
                businessName: "",
                email: "",
                phone: "",
                cityState: "",
                locationLink: "",
                practiceSize: "1-3 Dentists"
            });
        } else {
            // Scroll to the first error
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField) {
                document.getElementById(firstErrorField)?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    };

    return (
        <section
            id="contact"
            className="py-24 bg-gradient-to-r from-blue-50 to-indigo-100 relative overflow-hidden"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <svg
                    className="absolute w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
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
                            Transform Your Practice Today
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Join hundreds of dental practices across India that
                            have revolutionized their operations with Kraftodent
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100"
                    >
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.name ? "border-red-500" : "border-gray-300"
                                    } px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
                                    placeholder="Your Company / Business Name"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.businessName ? "border-red-500" : "border-gray-300"
                                    } px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600`}
                                />
                                {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
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
                                    placeholder="Your Company / Personal Mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.email ? "border-red-500" : "border-gray-300"
                                    } px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                                    placeholder="Phone Number / Mobile Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.phone ? "border-red-500" : "border-gray-300"
                                    } px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
                                    placeholder="Your Location"
                                    value={formData.cityState}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border ${
                                        errors.cityState ? "border-red-500" : "border-gray-300"
                                    } px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600`}
                                />
                                {errors.cityState && <p className="text-red-500 text-xs mt-1">{errors.cityState}</p>}
                            </div>

                            <div>
                                <label
                                    htmlFor="locationLink"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Google Maps Link
                                </label>
                                <input
                                    type="url"
                                    id="locationLink"
                                    placeholder="Google Maps Link"
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
                            >
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 flex items-center justify-center space-x-2"
                                >
                                    <MessageSquare size={18} />
                                    <span>Book a Demo</span>
                                </Button>
                            </motion.div>
                        </form>
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
                        <p className="text-blue-600 font-semibold">
                            contact@kraftxworks.com | +91 9822296812
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}